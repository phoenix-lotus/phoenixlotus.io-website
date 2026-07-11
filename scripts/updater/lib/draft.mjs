// LLM drafting via the headless `claude` CLI (backed by the user's Claude
// subscription — no API key). If `claude` isn't installed, the whole run
// degrades to notify-only and this module is never called.

import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { EDITABLE } from './edit-projects.mjs'
import { log } from './log.mjs'

const RULES = readFileSync(fileURLToPath(new URL('../curation-rules.md', import.meta.url)), 'utf8')
const MAX_FILE_CHARS = 8000

/** Is the `claude` CLI installed and runnable? */
export function claudeAvailable() {
  try {
    const r = spawnSync('claude', ['--version'], { encoding: 'utf8' })
    return r.status === 0
  } catch {
    return false
  }
}

const truncate = (s, n = MAX_FILE_CHARS) =>
  s && s.length > n ? s.slice(0, n) + `\n…[truncated ${s.length - n} chars]…` : s || ''

/** Invoke `claude -p` once and return the assistant's text, or null on failure. */
function callClaude(prompt) {
  const args = [
    '-p',
    '--output-format',
    'json',
    '--allowedTools',
    '',
    '--max-turns',
    '1',
    '--append-system-prompt',
    RULES,
    prompt,
  ]
  const r = spawnSync('claude', args, { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 })
  if (r.status !== 0) {
    log.warn(`claude exited ${r.status}: ${(r.stderr || '').trim().slice(0, 200)}`)
    return null
  }
  // --output-format json wraps the reply in an envelope; be tolerant of shape.
  let text = r.stdout
  try {
    const env = JSON.parse(r.stdout)
    if (typeof env === 'string') text = env
    else if (typeof env.result === 'string') text = env.result
    else if (Array.isArray(env)) {
      const last = env.filter((m) => m.role === 'assistant').pop()
      text = typeof last?.content === 'string' ? last.content : JSON.stringify(env)
    }
    if (env.is_error) {
      log.warn('claude reported is_error=true')
      return null
    }
  } catch {
    // stdout wasn't JSON — treat it as raw text
  }
  return text
}

/** Extract the first JSON object from a fenced ```json block or raw braces. */
export function extractJson(text) {
  if (!text) return null
  const fence = /```(?:json)?\s*([\s\S]*?)```/.exec(text)
  const candidate = fence ? fence[1] : text
  // find the first balanced {...}
  const start = candidate.indexOf('{')
  if (start === -1) return null
  let depth = 0
  let inStr = false
  let q = ''
  for (let i = start; i < candidate.length; i++) {
    const c = candidate[i]
    if (inStr) {
      if (c === '\\') i++
      else if (c === q) inStr = false
    } else if (c === '"' || c === "'") {
      inStr = true
      q = c
    } else if (c === '{') depth++
    else if (c === '}') {
      depth--
      if (depth === 0) {
        try {
          return JSON.parse(candidate.slice(start, i + 1))
        } catch {
          return null
        }
      }
    }
  }
  return null
}

function changedFilesBlock(changedFiles) {
  return changedFiles
    .map((f) => {
      const body = f.diff
        ? `Unified diff:\n${truncate(f.diff)}`
        : `New content:\n${truncate(f.content)}`
      return `### ${f.path}\n${body}`
    })
    .join('\n\n')
}

/**
 * Draft an edit for an existing project. Returns a validated
 * { slug, summary, confidence, edits, rationale } or null (no change / failure).
 */
export function draftEdit({ slug, currentEntryText, changedFiles }) {
  const prompt = [
    `Update the portfolio entry for slug "${slug}".`,
    ``,
    `## Current entry (src/data/projects.ts)`,
    '```ts',
    currentEntryText,
    '```',
    ``,
    `## What changed in the source repo`,
    changedFilesBlock(changedFiles),
    ``,
    `Follow the curation rules exactly. Return ONLY the JSON block described there.`,
  ].join('\n')

  for (let attempt = 0; attempt < 2; attempt++) {
    const text = callClaude(
      attempt === 0
        ? prompt
        : prompt + '\n\nREMINDER: respond with exactly one ```json block and nothing else.',
    )
    const parsed = extractJson(text)
    if (!parsed || typeof parsed !== 'object') continue
    const edits = parsed.edits && typeof parsed.edits === 'object' ? parsed.edits : {}
    // Drop any non-whitelisted keys defensively.
    const badKeys = Object.keys(edits).filter((k) => !EDITABLE.has(k))
    if (badKeys.length) {
      log.warn(`${slug}: draft included non-editable keys ${badKeys.join(', ')} — dropping them`)
      for (const k of badKeys) delete edits[k]
    }
    return {
      slug,
      summary: parsed.summary || '',
      confidence: parsed.confidence || 'unknown',
      rationale: parsed.rationale || '',
      edits,
    }
  }
  log.warn(`${slug}: could not parse a valid draft from claude`)
  return null
}

/**
 * Draft descriptive fields for a brand-new project from its README/package.json.
 * Returns { title, tagline, description, longDescription, role, year, tech, highlights, status, category } or null.
 */
export function draftNewEntry({ repo, readme, pkg }) {
  const prompt = [
    `Draft a NEW portfolio case-study entry for the repo "${repo}".`,
    `This is a first draft for human review — be accurate and conservative; never invent facts.`,
    ``,
    `## README.md`,
    truncate(readme || '(none)'),
    ``,
    `## package.json`,
    truncate(pkg || '(none)', 3000),
    ``,
    `Return ONLY a single \`\`\`json block with these keys (omit any you can't support from the source):`,
    `{ "title", "tagline", "description", "longDescription": [..], "role", "year", "location"?, "tech": [..], "highlights": [..], "status", "category": [..] }`,
    `status must be one of: live, in-development, mvp, client, concept, pre-launch, prototype, archived.`,
    `category items from: app, client, ai, concept, early.`,
  ].join('\n')

  const text = callClaude(prompt)
  const parsed = extractJson(text)
  if (!parsed || typeof parsed !== 'object') {
    log.warn(`${repo}: could not parse a new-entry draft`)
    return null
  }
  return parsed
}
