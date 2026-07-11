// Change detection: compares each watched project's current source-of-truth
// files against the snapshot, and finds brand-new repos. Pure detection — it
// never edits files or opens PRs; it returns a structured report.

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { PROJECTS, WATCH, MAPPED_REPOS, IGNORE_REPOS } from '../manifest.mjs'
import { repoMeta, repoTree, fileContent, fileDiff, listRepos } from './ghapi.mjs'
import { log } from './log.mjs'

const isWatched = (basename) => {
  const lower = basename.toLowerCase()
  if (WATCH.exact.includes(basename)) return true
  return lower.endsWith('.md') && lower.includes(WATCH.roadmapSubstring)
}

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex')

/**
 * Detect changes across all manifest projects + new-repo candidates.
 * @returns {{ firstRun, changes, currentStates, newRepos, unmappedInfo, knownReposNow }}
 */
export function detectAll(snapshot, { rescan = false } = {}) {
  const firstRun = !snapshot.knownRepos?.length && !Object.keys(snapshot.repos || {}).length
  const changes = []
  const currentStates = {} // slug -> snapshot entry reflecting current reality

  for (const [slug, cfg] of Object.entries(PROJECTS)) {
    try {
      const result =
        cfg.source === 'github'
          ? detectGithub(slug, cfg, snapshot.repos[slug], { rescan, firstRun })
          : detectLocal(slug, cfg, snapshot.repos[slug], { rescan, firstRun })
      currentStates[slug] = result.state
      if (result.changedFiles.length) {
        changes.push({
          slug,
          source: cfg.source,
          repo: cfg.repo || null,
          liveUrl: cfg.liveUrl || null,
          headSha: result.state.headSha,
          changedFiles: result.changedFiles,
        })
      }
    } catch (err) {
      log.warn(`detect ${slug}: ${err.message}`)
      // Preserve prior state so a transient failure doesn't lose the baseline.
      if (snapshot.repos[slug]) currentStates[slug] = snapshot.repos[slug]
    }
  }

  const { newRepos, unmappedInfo, knownReposNow } = detectNewRepos(snapshot, { rescan, firstRun })

  return { firstRun, changes, currentStates, newRepos, unmappedInfo, knownReposNow }
}

function detectGithub(slug, cfg, prev, { rescan, firstRun }) {
  const { defaultBranch, headSha } = repoMeta(cfg.repo)

  // Cheap gate: unchanged head + not rescanning → nothing to do.
  if (!rescan && prev && prev.headSha === headSha) {
    return { state: prev, changedFiles: [] }
  }

  const { blobs, truncated } = repoTree(cfg.repo, headSha)
  if (truncated) log.warn(`${slug}: repo tree truncated; watch-file detection may be partial`)
  const watched = blobs.filter((b) => !b.path.includes('/') && isWatched(b.path))
  const watchFiles = Object.fromEntries(watched.map((b) => [b.path, b.sha]))
  const state = { source: 'github', repo: cfg.repo, defaultBranch, headSha, watchFiles }

  // First run establishes a baseline silently (unless rescan forces a full pass).
  if (firstRun && !rescan) return { state, changedFiles: [] }

  const prevFiles = prev?.watchFiles || {}
  const changedFiles = []
  for (const [path, newBlob] of Object.entries(watchFiles)) {
    const oldBlob = prevFiles[path]
    if (!rescan && oldBlob === newBlob) continue // unchanged
    const diff =
      oldBlob && prev?.headSha ? fileDiff(cfg.repo, prev.headSha, headSha, path) : null
    const content = diff ? null : fileContent(cfg.repo, path, headSha)
    changedFiles.push({ path, oldSha: oldBlob || null, newSha: newBlob, diff, content })
  }
  return { state, changedFiles }
}

function detectLocal(slug, cfg, prev, { rescan, firstRun }) {
  if (!existsSync(cfg.path)) {
    throw new Error(`local path not found: ${cfg.path}`)
  }
  let headSha = null
  try {
    headSha = execFileSync('git', ['-C', cfg.path, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()
  } catch {
    headSha = null // not a git repo → rely on file hashes only
  }

  const watchFiles = {}
  const contents = {}
  for (const name of readdirSync(cfg.path)) {
    if (!isWatched(name)) continue
    const full = `${cfg.path}/${name}`
    if (!statSync(full).isFile()) continue
    const buf = readFileSync(full)
    watchFiles[name] = sha256(buf)
    contents[name] = buf.toString('utf8')
  }
  const state = { source: 'local', path: cfg.path, headSha, watchFiles }

  if (firstRun && !rescan) return { state, changedFiles: [] }

  const prevFiles = prev?.watchFiles || {}
  const changedFiles = []
  for (const [path, hash] of Object.entries(watchFiles)) {
    if (!rescan && prevFiles[path] === hash) continue
    changedFiles.push({ path, oldSha: prevFiles[path] || null, newSha: hash, diff: null, content: contents[path] })
  }
  return { state, changedFiles }
}

function detectNewRepos(snapshot, { rescan, firstRun }) {
  let repos
  try {
    repos = listRepos()
  } catch (err) {
    log.warn(`repo list failed (skipping new-repo detection): ${err.message}`)
    return { newRepos: [], unmappedInfo: [], knownReposNow: snapshot.knownRepos || [] }
  }
  const knownReposNow = repos.map((r) => r.name)
  const known = new Set(snapshot.knownRepos || [])
  const unmapped = repos.filter((r) => !MAPPED_REPOS.has(r.name) && !IGNORE_REPOS.has(r.name))

  let newRepos
  if (rescan) {
    newRepos = unmapped // re-surface everything unmapped for drafting
  } else if (firstRun) {
    newRepos = [] // baseline: absorb existing repos, don't flood with drafts
  } else {
    newRepos = unmapped.filter((r) => !known.has(r.name)) // genuinely new since last run
  }

  return { newRepos, unmappedInfo: unmapped, knownReposNow }
}
