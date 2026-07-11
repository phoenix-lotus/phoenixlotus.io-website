// Opens the draft PR (default flow) or a GitHub issue (notify-only fallback).
// This module is the ONLY thing that writes to the remote, and it never
// commits to master, never builds, and never deploys.

import { git, currentBranch } from './git.mjs'
import { createDraftPr, createIssue } from './ghapi.mjs'
import { PORTFOLIO_REPO } from '../manifest.mjs'
import { log } from './log.mjs'

const BASE_BRANCH = 'master'
const STAGE_PATHS = ['src/data/projects.ts', 'public/media/projects']

function stamp() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`
}

/**
 * Carry the already-applied working-tree edits onto a fresh branch, commit,
 * push, and open a DRAFT PR. Restores the caller's original branch afterward.
 * @returns {{ url: string, branch: string }}
 */
export function openDraftPr({ title, body }) {
  const startBranch = currentBranch()
  const branch = `updater/portfolio-${stamp()}`

  git(['switch', '-c', branch]) // carries the working-tree edits onto the new branch
  try {
    git(['add', ...STAGE_PATHS])
    const message =
      `chore(portfolio): auto-drafted updates from source repos\n\n` +
      `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`
    git(['commit', '-m', message])
    git(['push', '-u', 'origin', branch])
    const url = createDraftPr({ base: BASE_BRANCH, head: branch, title, body })
    return { url, branch }
  } finally {
    // Return the user to where they started; the edits live only on `branch`.
    try {
      git(['switch', startBranch])
    } catch (err) {
      log.warn(`could not switch back to ${startBranch}: ${err.message}`)
    }
  }
}

/** Notify-only: open an issue on the portfolio repo. No branch, no edits. */
export function openIssue({ title, body }) {
  const url = createIssue({ repo: PORTFOLIO_REPO, title, body })
  return { url }
}
