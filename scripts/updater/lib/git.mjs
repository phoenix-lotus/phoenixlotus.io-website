// Shared git + repo-path helpers.

import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

/** Absolute path to the portfolio repo root (two levels up from scripts/updater). */
export const REPO_ROOT = fileURLToPath(new URL('../../../', import.meta.url)).replace(/\/$/, '')

export function git(args, opts = {}) {
  return execFileSync('git', ['-C', REPO_ROOT, ...args], { encoding: 'utf8', ...opts }).trim()
}

export function currentBranch() {
  return git(['rev-parse', '--abbrev-ref', 'HEAD'])
}

export function isClean() {
  return git(['status', '--porcelain']).length === 0
}

/** Discard working-tree changes to specific paths. */
export function restore(paths) {
  if (!paths.length) return
  try {
    git(['checkout', '--', ...paths])
  } catch {
    git(['restore', '--', ...paths]) // newer git
  }
}
