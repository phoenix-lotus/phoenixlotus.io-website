// Screenshot refresh: capture a live public URL with headless Chrome and
// encode it to a 1280×800 WebP under public/media/projects/<slug>/, mirroring
// the existing sharp usage in scripts/gen-assets.mjs. Only projects with a
// genuine public URL are captured; everything else keeps its current media.

import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import sharp from 'sharp'
import { CHROME_BIN } from '../manifest.mjs'
import { REPO_ROOT } from './git.mjs'
import { log } from './log.mjs'

const WIDTH = 1280
const HEIGHT = 800

/** True if the configured Chrome binary exists. */
export function chromeAvailable() {
  return existsSync(CHROME_BIN)
}

/**
 * Capture `url` → public/media/projects/<slug>/<name>.webp.
 * @returns {{ ok: boolean, publicSrc?: string, absPath?: string, error?: string }}
 */
export async function capture({ slug, url, name = 'home' }) {
  if (!chromeAvailable()) return { ok: false, error: `Chrome not found at ${CHROME_BIN}` }

  const outDir = `${REPO_ROOT}/public/media/projects/${slug}`
  const publicSrc = `/media/projects/${slug}/${name}.webp`
  const absPath = `${outDir}/${name}.webp`
  const tmpPng = `${tmpdir()}/updater-shot-${slug}-${process.pid}.png`

  try {
    mkdirSync(outDir, { recursive: true })
    const r = spawnSync(
      CHROME_BIN,
      [
        '--headless=new',
        '--disable-gpu',
        '--hide-scrollbars',
        '--force-device-scale-factor=1',
        `--window-size=${WIDTH},${HEIGHT}`,
        '--virtual-time-budget=9000',
        '--run-all-compositor-stages-before-draw',
        `--screenshot=${tmpPng}`,
        url,
      ],
      { encoding: 'utf8', timeout: 45000 },
    )
    if (!existsSync(tmpPng) || statSync(tmpPng).size === 0) {
      return { ok: false, error: `capture produced no image (chrome status ${r.status})` }
    }
    await sharp(tmpPng)
      .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'top' })
      .webp({ quality: 82 })
      .toFile(absPath)
    return { ok: true, publicSrc, absPath }
  } catch (err) {
    return { ok: false, error: err.message }
  } finally {
    try {
      rmSync(tmpPng, { force: true })
    } catch {
      /* ignore */
    }
  }
}

/** Derive the webp basename to write from an existing media src (or 'home'). */
export function nameFromMediaSrc(mediaSrc) {
  if (!mediaSrc) return 'home'
  const base = mediaSrc.split('/').pop() || 'home.webp'
  return base.replace(/\.webp$/i, '')
}
