// Thin wrappers over the GitHub CLI (`gh`). We shell out rather than use an
// SDK so the bot reuses the user's already-authenticated keyring credentials
// with zero secrets in the environment.

import { execFileSync, spawnSync } from 'node:child_process'
import { OWNER } from '../manifest.mjs'

const MAX_BUFFER = 32 * 1024 * 1024

/** True if the `gh` CLI is installed and reachable. */
export function ghAvailable() {
  const r = spawnSync('gh', ['--version'], { encoding: 'utf8' })
  return r.status === 0
}

/** Run `gh <args>` and return stdout as a string. Throws on non-zero exit. */
export function gh(args, { input } = {}) {
  try {
    return execFileSync('gh', args, {
      encoding: 'utf8',
      maxBuffer: MAX_BUFFER,
      input,
    })
  } catch (err) {
    const stderr = (err.stderr || '').toString().trim()
    const e = new Error(`gh ${args.join(' ')} failed: ${stderr || err.message}`)
    e.stderr = stderr
    e.code = err.status
    throw e
  }
}

/**
 * Run `gh api <path> [--jq expr]` and JSON-parse the result. Use only when the
 * response (or jq result) is a JSON object/array — NOT for scalar `--jq`
 * extractions like `.sha`, which jq prints unquoted (use ghApiText for those).
 */
export function ghApiJson(apiPath, { jq } = {}) {
  const args = ['api', apiPath]
  if (jq) args.push('--jq', jq)
  const out = gh(args)
  return out.trim() ? JSON.parse(out) : null
}

/** Run `gh api <path> --jq <scalarExpr>` and return the raw trimmed string. */
export function ghApiText(apiPath, { jq } = {}) {
  const args = ['api', apiPath]
  if (jq) args.push('--jq', jq)
  return gh(args).trim()
}

/** Run `gh api <path>` returning the RAW file bytes (for file contents). */
export function ghApiRaw(apiPath) {
  return gh(['api', apiPath, '-H', 'Accept: application/vnd.github.raw'])
}

/** repos/OWNER/<repo> → { defaultBranch, headSha } for the default branch. */
export function repoMeta(repo) {
  const defaultBranch = ghApiText(`repos/${OWNER}/${repo}`, { jq: '.default_branch' })
  const headSha = ghApiText(`repos/${OWNER}/${repo}/commits/${defaultBranch}`, { jq: '.sha' })
  return { defaultBranch, headSha }
}

/**
 * The git tree at a commit → array of { path, sha } for every blob.
 * `truncated` is surfaced so callers can warn if a huge repo was clipped.
 */
export function repoTree(repo, sha) {
  const tree = ghApiJson(`repos/${OWNER}/${repo}/git/trees/${sha}?recursive=1`)
  const blobs = (tree?.tree || [])
    .filter((n) => n.type === 'blob')
    .map((n) => ({ path: n.path, sha: n.sha }))
  return { blobs, truncated: !!tree?.truncated }
}

/** Raw contents of a file at a ref. Returns null on 404. */
export function fileContent(repo, path, ref) {
  try {
    return ghApiRaw(`repos/${OWNER}/${repo}/contents/${encodeURIComponent(path)}?ref=${ref}`)
  } catch (err) {
    if (String(err.stderr || err.message).includes('404')) return null
    throw err
  }
}

/**
 * Unified diff of a single file between two commits. Returns the `.patch`
 * string, or null if the compare endpoint can't relate the two SHAs
 * (force-push / unrelated history) — caller should fall back to full content.
 */
export function fileDiff(repo, oldSha, newSha, path) {
  try {
    const files = ghApiJson(`repos/${OWNER}/${repo}/compare/${oldSha}...${newSha}`, {
      jq: '.files',
    })
    const hit = (files || []).find((f) => f.filename === path)
    return hit?.patch || null
  } catch {
    return null
  }
}

/** Raw README of a repo (handles any casing via the /readme endpoint). Null if none. */
export function repoReadme(repo) {
  try {
    return ghApiRaw(`repos/${OWNER}/${repo}/readme`)
  } catch {
    return null
  }
}

/** `gh repo list OWNER` → [{ name, isPrivate, pushedAt, description, url }]. */
export function listRepos() {
  const out = gh([
    'repo',
    'list',
    OWNER,
    '--no-archived',
    '--limit',
    '200',
    '--json',
    'name,isPrivate,pushedAt,description,url',
  ])
  return JSON.parse(out)
}

/** Create a draft PR and return its URL. Body passed via stdin to avoid ARG limits. */
export function createDraftPr({ base, head, title, body }) {
  const out = gh(
    ['pr', 'create', '--draft', '--base', base, '--head', head, '--title', title, '--body-file', '-'],
    { input: body },
  )
  return out.trim()
}

/** Create an issue (notify-only mode) and return its URL. */
export function createIssue({ repo, title, body }) {
  const out = gh(['issue', 'create', '--repo', repo, '--title', title, '--body-file', '-'], {
    input: body,
  })
  return out.trim()
}
