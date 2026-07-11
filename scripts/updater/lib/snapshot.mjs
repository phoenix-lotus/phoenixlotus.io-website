// Persistent "last-seen" state so the bot only surfaces genuinely new changes.
// Lives under scripts/updater/.state/ which is gitignored — it's local to the
// machine running the bot, never committed.

import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const STATE_DIR = fileURLToPath(new URL('../.state/', import.meta.url))
const SNAPSHOT_PATH = `${STATE_DIR}snapshot.json`
const LOCK_PATH = `${STATE_DIR}lock`

const EMPTY = { version: 1, lastRunAt: null, repos: {}, knownRepos: [] }

export function loadSnapshot() {
  if (!existsSync(SNAPSHOT_PATH)) return structuredClone(EMPTY)
  try {
    const parsed = JSON.parse(readFileSync(SNAPSHOT_PATH, 'utf8'))
    return { ...structuredClone(EMPTY), ...parsed }
  } catch {
    // Corrupt snapshot → treat as first run rather than crashing.
    return structuredClone(EMPTY)
  }
}

export function saveSnapshot(snap) {
  mkdirSync(STATE_DIR, { recursive: true })
  snap.lastRunAt = new Date().toISOString()
  writeFileSync(SNAPSHOT_PATH, JSON.stringify(snap, null, 2) + '\n')
}

/** True if this is the very first run (no baseline recorded yet). */
export function isFirstRun(snap) {
  return !snap.knownRepos?.length && !Object.keys(snap.repos || {}).length
}

// --- Concurrency lock (best-effort, single-user on-demand use) ---

export function acquireLock() {
  mkdirSync(STATE_DIR, { recursive: true })
  if (existsSync(LOCK_PATH)) {
    const pid = Number(readFileSync(LOCK_PATH, 'utf8').trim())
    if (pid && isAlive(pid)) {
      throw new Error(`Another updater run is active (pid ${pid}). Remove ${LOCK_PATH} if stale.`)
    }
  }
  writeFileSync(LOCK_PATH, String(process.pid))
}

export function releaseLock() {
  try {
    rmSync(LOCK_PATH, { force: true })
  } catch {
    /* ignore */
  }
}

function isAlive(pid) {
  try {
    process.kill(pid, 0)
    return true
  } catch {
    return false
  }
}
