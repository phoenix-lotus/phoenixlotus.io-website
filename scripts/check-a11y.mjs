#!/usr/bin/env node
// Runs axe-core (the same engine behind Chrome DevTools' and Lighthouse's
// accessibility audits) against every real route, rendered in a real headless
// Chrome — not just a static-HTML lint, since most of this site's content
// only exists after React hydrates. Routes come from public/sitemap.xml
// rather than a hand-maintained list here, so this can't silently drift out
// of sync with what's actually live (the same reasoning as check-prices.mjs's
// ALLOWED table).
//
// Builds fresh, previews it locally, points `axe` (from @axe-core/cli) at
// every route with a --load-delay so animations settle first, then tears the
// preview server down. Exits non-zero on any violation.
//
// package.json pins a `chromedriver` version to match whatever Chrome is
// installed locally, since @axe-core/cli's own chromedriver dependency just
// floats to latest and will drift ahead of an unwatched local Chrome — axe
// then fails immediately with "session not created" before testing anything.
// If that happens: `google-chrome --version` (or open Chrome > About), then
// bump the chromedriver devDependency to the matching major version.

import { readFileSync } from 'node:fs'
import { spawn, spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const PORT = 4173
const ORIGIN = `http://localhost:${PORT}`

const sitemap = readFileSync(`${ROOT}/public/sitemap.xml`, 'utf8')
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (m) => m[1].replace('https://phoenixlotus.io', ORIGIN),
)

console.log(`Building, then checking ${urls.length} route(s) against WCAG 2.2 AA...`)

const build = spawnSync('npm', ['run', 'build'], { cwd: ROOT, stdio: 'inherit' })
if (build.status !== 0) process.exit(build.status ?? 1)

const preview = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
  cwd: ROOT,
  stdio: ['ignore', 'ignore', 'inherit'],
})

async function waitForServer(timeoutMs = 15000) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    try {
      const res = await fetch(ORIGIN)
      if (res.ok) return
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 250))
  }
  throw new Error(`vite preview never came up on ${ORIGIN}`)
}

let exitCode = 1
try {
  await waitForServer()
  const axe = spawnSync(
    'npx',
    [
      'axe',
      ...urls,
      '--tags',
      'wcag2a,wcag2aa,wcag21aa,wcag22aa',
      '--load-delay',
      '500',
      '--exit',
    ],
    { cwd: ROOT, stdio: 'inherit' },
  )
  exitCode = axe.status ?? 1
} finally {
  preview.kill()
}

process.exit(exitCode)
