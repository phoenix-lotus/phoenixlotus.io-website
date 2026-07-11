// The gate that stands between a draft and a PR: the edited projects.ts must
// compile. A red typecheck NEVER produces a code PR.

import { spawnSync } from 'node:child_process'
import { REPO_ROOT } from './git.mjs'

/**
 * Run `npm run typecheck` (tsc -b --noEmit). Returns { ok, output }.
 * `output` is combined stdout+stderr for surfacing in logs / the PR body.
 */
export function typecheck() {
  const r = spawnSync('npm', ['run', '--silent', 'typecheck'], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
  })
  const output = `${r.stdout || ''}${r.stderr || ''}`.trim()
  return { ok: r.status === 0, output }
}
