#!/usr/bin/env node
// Portfolio updater bot — entry point.
//
//   npm run updater            detect → draft → screenshots → open a DRAFT PR
//   npm run updater:check      dry run: print what changed, touch nothing
//   node run.mjs --rescan      re-diff every project against current source
//   node run.mjs --notify-only detect → open a GitHub ISSUE (no edits)
//
// Nothing here ever commits to master or deploys. See scripts/updater/README.

import { readFileSync, writeFileSync } from 'node:fs'
import {
  loadSnapshot,
  saveSnapshot,
  acquireLock,
  releaseLock,
} from './lib/snapshot.mjs'
import { detectAll } from './lib/detect.mjs'
import { ghAvailable, repoMeta, repoReadme, fileContent } from './lib/ghapi.mjs'
import { claudeAvailable, draftEdit, draftNewEntry } from './lib/draft.mjs'
import {
  applyPatch,
  appendEntry,
  readEntry,
  flipMediaToScreenshot,
} from './lib/edit-projects.mjs'
import { typecheck } from './lib/verify.mjs'
import { capture, nameFromMediaSrc } from './lib/screenshot.mjs'
import { openDraftPr, openIssue } from './lib/pr.mjs'
import { REPO_ROOT, isClean, restore } from './lib/git.mjs'
import { PROJECTS, CAPTURABLE } from './manifest.mjs'
import { printCheck, buildPrBody, buildIssueBody } from './lib/report.mjs'
import { log, out } from './lib/log.mjs'

const PROJECTS_TS = `${REPO_ROOT}/src/data/projects.ts`
const MAX_NEW_ENTRIES = 3

const flags = new Set(process.argv.slice(2))
const CHECK = flags.has('--check')
const RESCAN = flags.has('--rescan')
const NOTIFY_ONLY = flags.has('--notify-only')

function nextSnapshot(snapshot, detection) {
  return {
    ...snapshot,
    repos: { ...snapshot.repos, ...detection.currentStates },
    knownRepos: detection.knownReposNow,
  }
}

async function main() {
  if (!ghAvailable()) {
    log.error('GitHub CLI (`gh`) not found or not authenticated. Install + `gh auth login` first.')
    process.exit(1)
  }

  const snapshot = loadSnapshot()
  log.step(`Detecting changes${RESCAN ? ' (rescan)' : ''}…`)
  const detection = detectAll(snapshot, { rescan: RESCAN })
  const { firstRun, changes, newRepos, unmappedInfo } = detection

  // First run: establish a baseline quietly (no drafts, no PR).
  if (firstRun && !RESCAN) {
    if (!CHECK) {
      saveSnapshot(nextSnapshot(snapshot, detection))
      log.ok('Baseline established — the bot now knows the current state of every project.')
    }
    out(`\nTracking ${Object.keys(PROJECTS).length} projects.`)
    if (unmappedInfo?.length) {
      out(`\nRepos not yet featured on the site (informational):`)
      for (const r of unmappedInfo) out(`  • ${r.name}`)
    }
    out(`\nRun \`npm run updater\` again later to detect changes since now.`)
    return
  }

  // Nothing to do.
  if (!changes.length && !newRepos.length) {
    log.ok('No changes detected — portfolio is up to date.')
    if (!CHECK) saveSnapshot(nextSnapshot(snapshot, detection))
    return
  }

  // Dry run: report detection only, never advance the snapshot.
  if (CHECK) {
    printCheck({ changes, newRepos, unmappedInfo, firstRun })
    return
  }

  const useLlm = !NOTIFY_ONLY && claudeAvailable()

  // Notify-only path (LLM unavailable or forced): open an issue, no edits.
  if (!useLlm) {
    if (NOTIFY_ONLY) log.info('Notify-only mode requested.')
    else log.warn('`claude` CLI not available — falling back to notify-only.')
    const body = buildIssueBody({ changes, newRepos })
    const { url } = openIssue({ title: `Portfolio update detected — ${today()}`, body })
    log.ok(`Opened issue: ${url}`)
    saveSnapshot(nextSnapshot(snapshot, detection))
    return
  }

  // --- Draft path ---
  if (!isClean()) {
    log.error('Working tree has uncommitted changes. Commit or stash them, then re-run.')
    process.exit(1)
  }

  let src = readFileSync(PROJECTS_TS, 'utf8')
  const applied = []
  const appended = []

  // 1) Draft edits for changed projects.
  for (const change of changes) {
    const { text } = readEntry(src, change.slug)
    const draft = draftEdit({
      slug: change.slug,
      currentEntryText: text,
      changedFiles: change.changedFiles,
    })
    if (!draft || !Object.keys(draft.edits).length) {
      log.info(`${change.slug}: no portfolio-worthy change.`)
      continue
    }
    try {
      src = applyPatch(src, change.slug, draft.edits)
      applied.push(draft)
      log.ok(`${change.slug}: drafted ${Object.keys(draft.edits).join(', ')}`)
    } catch (err) {
      log.warn(`${change.slug}: dropping draft — ${err.message}`)
    }
  }

  // 2) Draft brand-new entries (capped).
  const toAdd = newRepos.slice(0, MAX_NEW_ENTRIES)
  if (newRepos.length > MAX_NEW_ENTRIES) {
    log.warn(`${newRepos.length} new repos found; drafting first ${MAX_NEW_ENTRIES}, deferring the rest.`)
  }
  for (const repo of toAdd) {
    try {
      const meta = repoMeta(repo.name)
      const readme = repoReadme(repo.name)
      const pkg = fileContent(repo.name, 'package.json', meta.headSha)
      const draft = draftNewEntry({ repo: repo.name, readme, pkg })
      if (!draft) continue
      const slug = slugify(repo.name)
      src = appendEntry(src, { slug, text: draft })
      appended.push({ slug, repo: repo.name, draft })
      log.ok(`${repo.name}: drafted new entry '${slug}'`)
    } catch (err) {
      log.warn(`${repo.name}: could not draft new entry — ${err.message}`)
    }
  }

  // 3) Refresh screenshots for capturable projects that changed.
  const screenshots = []
  const skippedCapturable = []
  const changedSlugs = new Set(changes.map((c) => c.slug))
  for (const slug of CAPTURABLE) {
    if (!RESCAN && !changedSlugs.has(slug)) continue
    const cfg = PROJECTS[slug]
    if (!cfg?.liveUrl) continue
    const { obj } = readEntry(src, slug)
    const name = nameFromMediaSrc(obj.media?.[0]?.src)
    log.step(`Capturing ${slug} (${cfg.liveUrl})…`)
    const shot = await capture({ slug, url: cfg.liveUrl, name })
    if (shot.ok) {
      src = flipMediaToScreenshot(src, slug, { srcPath: shot.publicSrc, url: hostOf(cfg.liveUrl) })
      screenshots.push({ slug, publicSrc: shot.publicSrc })
      log.ok(`${slug}: screenshot refreshed`)
    } else {
      skippedCapturable.push(`${slug} (${shot.error})`)
      log.warn(`${slug}: screenshot skipped — ${shot.error}`)
    }
  }
  for (const slug of Object.keys(PROJECTS)) {
    if (!CAPTURABLE.has(slug)) skippedCapturable.push(slug)
  }

  // Nothing survived drafting → no PR, but we've "seen" these changes.
  if (!applied.length && !appended.length && !screenshots.length) {
    log.ok('No changes worth a PR after drafting.')
    saveSnapshot(nextSnapshot(snapshot, detection))
    return
  }

  // 4) Write once, then gate on typecheck.
  writeFileSync(PROJECTS_TS, src)
  log.step('Typechecking…')
  const tc = typecheck()
  if (!tc.ok) {
    log.error('Typecheck FAILED — reverting edits and falling back to notify-only.')
    log.error(tc.output.split('\n').slice(0, 20).join('\n'))
    restore(['src/data/projects.ts'])
    const body =
      buildIssueBody({ changes, newRepos }) +
      '\n\n---\n**Note:** auto-drafting was attempted but produced a type error, so it was reverted. The diffs above are the raw source changes.'
    const { url } = openIssue({ title: `Portfolio update needs manual edit — ${today()}`, body })
    log.ok(`Opened issue: ${url}`)
    // Do NOT advance snapshot — we want the next run to retry.
    return
  }
  log.ok('Typecheck passed.')

  // 5) Open the draft PR (the only remote write).
  const title = `Portfolio auto-update — ${today()}`
  const body = buildPrBody({ applied, appended, screenshots, skippedCapturable })
  const { url, branch } = openDraftPr({ title, body })
  log.ok(`Opened draft PR: ${url} (branch ${branch})`)

  // Advance snapshot only after the PR is safely open.
  saveSnapshot(nextSnapshot(snapshot, detection))
}

const today = () => new Date().toISOString().slice(0, 10)
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const hostOf = (url) => {
  try {
    return new URL(url).host.replace(/^www\./, '')
  } catch {
    return undefined
  }
}

// --- run ---
try {
  acquireLock()
} catch (err) {
  log.error(err.message)
  process.exit(1)
}
try {
  await main()
} catch (err) {
  log.error(err.stack || err.message)
  process.exitCode = 1
} finally {
  releaseLock()
}
