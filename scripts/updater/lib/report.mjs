// Builds human-facing output: the dry-run report, the draft-PR body, and the
// notify-only issue body.

import { out } from './log.mjs'

const previewDiff = (f, lines = 24) => {
  const body = f.diff || f.content || ''
  const clipped = body.split('\n').slice(0, lines).join('\n')
  return body.split('\n').length > lines ? clipped + '\n…' : clipped
}

const fieldPreview = (v) => {
  if (Array.isArray(v)) return `[${v.length} item${v.length === 1 ? '' : 's'}]`
  const s = String(v)
  return s.length > 80 ? s.slice(0, 77) + '…' : s
}

// --- Dry run (--check) ---

export function printCheck({ changes, newRepos, unmappedInfo, firstRun }) {
  out('# Updater dry run\n')
  if (firstRun) out('_(first run — this would establish the baseline)_\n')

  if (!changes.length) out('No content changes detected in watched projects.\n')
  else {
    out(`## Content changes (${changes.length})\n`)
    for (const c of changes) {
      out(`### ${c.slug}${c.repo ? ` — ${c.repo}` : ' (local)'}`)
      for (const f of c.changedFiles) {
        out(`- \`${f.path}\`${f.diff ? '' : ' (new/full content)'}`)
      }
      out('')
    }
  }

  if (newRepos.length) {
    out(`## New repos not on the site (${newRepos.length})\n`)
    for (const r of newRepos) out(`- **${r.name}** — ${r.description || 'no description'} ${r.isPrivate ? '(private)' : '(public)'}`)
    out('')
  }
  if (firstRun && unmappedInfo?.length) {
    out('## Existing repos not featured (informational)\n')
    for (const r of unmappedInfo) out(`- ${r.name}`)
    out('')
  }
  out('_Run `npm run updater` to draft edits and open a PR._')
}

// --- Draft PR body ---

export function buildPrBody({ applied, appended, screenshots, skippedCapturable }) {
  const L = []
  L.push('## 🤖 Portfolio auto-update')
  L.push('')
  L.push(
    `Drafted by the on-demand updater bot. **Review every change for accuracy and voice before merging.** ` +
      `Nothing here is live — merge, then run \`npm run updater:deploy\`.`,
  )
  L.push('')

  if (applied.length) {
    L.push(`### Copy updates (${applied.length})`)
    L.push('')
    L.push('| Project | Fields | Confidence | Why |')
    L.push('| --- | --- | --- | --- |')
    for (const a of applied) {
      const fields = Object.keys(a.edits).join(', ') || '—'
      const why = (a.rationale || a.summary || '').replace(/\|/g, '\\|')
      L.push(`| \`${a.slug}\` | ${fields} | ${a.confidence} | ${why} |`)
    }
    L.push('')
    for (const a of applied) {
      L.push(`<details><summary><code>${a.slug}</code> — new field values</summary>`)
      L.push('')
      for (const [k, v] of Object.entries(a.edits)) {
        L.push(`- **${k}:** ${fieldPreview(v)}`)
      }
      L.push('')
      L.push('</details>')
    }
    L.push('')
  }

  if (appended.length) {
    L.push(`### New project drafts (${appended.length}) — need your review + a screenshot`)
    L.push('')
    for (const n of appended) {
      L.push(`- **${n.slug}** (from \`${n.repo}\`) — \`featured: false\`, fallback card, order appended last. Verify the copy and decide placement/featuring.`)
    }
    L.push('')
  }

  if (screenshots.length) {
    L.push(`### Screenshots refreshed (${screenshots.length})`)
    L.push('')
    for (const s of screenshots) L.push(`- \`${s.slug}\` → \`${s.publicSrc}\` (1280×800 WebP)`)
    L.push('')
  }
  if (skippedCapturable?.length) {
    L.push('_Not screenshotted (private/local — capture manually if needed): ' + skippedCapturable.join(', ') + '._')
    L.push('')
  }

  L.push('### Guarantees')
  L.push('')
  L.push('- ✅ `npm run typecheck` passed')
  L.push('- ✅ Protected fields unchanged: `slug`, `order`, `featured`, `colorTheme`, `title`, `category`, `media` (except intentional screenshot flips)')
  L.push('- ✅ No `links.github` added (private repos stay private)')
  L.push('')
  L.push('### Review checklist')
  L.push('')
  L.push('- [ ] Copy is accurate vs the source repo (no invented claims)')
  L.push('- [ ] Any `status` change is real')
  L.push('- [ ] Refreshed screenshots look right')
  L.push('- [ ] New-project drafts placed/featured intentionally')
  L.push('- [ ] Un-draft → merge → `npm run updater:deploy`')
  return L.join('\n')
}

// --- Notify-only issue body ---

export function buildIssueBody({ changes, newRepos }) {
  const L = []
  L.push('## 🔔 Portfolio update detected (notify-only)')
  L.push('')
  L.push(
    'The updater ran without the `claude` CLI available, so it did not draft edits. ' +
      'Here is what changed in your project sources — update `src/data/projects.ts` yourself, ' +
      'or install the Claude CLI and re-run `npm run updater` to get an auto-drafted PR.',
  )
  L.push('')

  if (changes.length) {
    L.push(`### Content changes (${changes.length})`)
    L.push('')
    for (const c of changes) {
      L.push(`#### \`${c.slug}\`${c.repo ? ` — ${c.repo}` : ' (local)'}`)
      for (const f of c.changedFiles) {
        L.push('')
        L.push(`**${f.path}**`)
        L.push('```diff')
        L.push(previewDiff(f))
        L.push('```')
      }
      L.push('')
    }
  }

  if (newRepos.length) {
    L.push(`### New repos not on the site (${newRepos.length})`)
    L.push('')
    for (const r of newRepos) {
      L.push(`- **${r.name}** — ${r.description || 'no description'} (${r.isPrivate ? 'private' : 'public'}, pushed ${r.pushedAt?.slice(0, 10) || '?'})`)
    }
    L.push('')
  }

  L.push('### Suggested next step')
  L.push('')
  L.push('Install the Claude CLI (`npm i -g @anthropic-ai/claude-code`), then run `npm run updater` for an auto-drafted, reviewable PR.')
  return L.join('\n')
}
