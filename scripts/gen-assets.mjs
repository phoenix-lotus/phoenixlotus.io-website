import sharp from 'sharp'
import { readFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// Regenerates favicons + the Open Graph card from public/favicon.svg.
const PUB = fileURLToPath(new URL('../public', import.meta.url))
mkdirSync(`${PUB}/og`, { recursive: true })

const faviconSvg = readFileSync(`${PUB}/favicon.svg`)

// --- App icons from the favicon mark ---
await sharp(faviconSvg).resize(180, 180).png().toFile(`${PUB}/apple-touch-icon.png`)
await sharp(faviconSvg).resize(32, 32).png().toFile(`${PUB}/favicon-32.png`)
await sharp(faviconSvg).resize(16, 16).png().toFile(`${PUB}/favicon-16.png`)
// A 48px PNG doubles as a pragmatic favicon.ico (browsers accept PNG data here).
await sharp(faviconSvg).resize(48, 48).png().toFile(`${PUB}/favicon.ico`)

// --- Open Graph card (1200x630) ---
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="aurora" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#ffbc00"/><stop offset="0.28" stop-color="#ff5e3a"/>
      <stop offset="0.5" stop-color="#ff2e7e"/><stop offset="0.74" stop-color="#a855f7"/>
      <stop offset="1" stop-color="#22d3ee"/>
    </linearGradient>
    <radialGradient id="glowA" cx="0.85" cy="0.05" r="0.7">
      <stop offset="0" stop-color="#ff5e3a" stop-opacity="0.55"/><stop offset="1" stop-color="#ff5e3a" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="0.05" cy="0.95" r="0.7">
      <stop offset="0" stop-color="#7c3aed" stop-opacity="0.55"/><stop offset="1" stop-color="#7c3aed" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="flameV" x1="24" y1="40" x2="24" y2="5" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#ffbc00"/><stop offset="0.18" stop-color="#ff8a1e"/>
      <stop offset="0.36" stop-color="#ff5e3a"/><stop offset="0.5" stop-color="#ff2e7e"/>
      <stop offset="0.68" stop-color="#a855f7"/><stop offset="0.84" stop-color="#7c3aed"/>
      <stop offset="1" stop-color="#22d3ee"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#0e0a14"/>
  <rect width="1200" height="630" fill="url(#glowA)"/>
  <rect width="1200" height="630" fill="url(#glowB)"/>
  <g transform="translate(90,86)">
    <g transform="scale(1.5)">
      <path d="M24 38 C 16 37 9 34 6.8 27.5 C 5.8 24.5 6 22 6.5 20.5 C 9.5 24 15 28.5 19.5 31.5 C 22 33.5 23.2 35.5 24 38 Z" fill="url(#flameV)" opacity="0.85"/>
      <path d="M24 38 C 32 37 39 34 41.2 27.5 C 42.2 24.5 42 22 41.5 20.5 C 38.5 24 33 28.5 28.5 31.5 C 26 33.5 24.8 35.5 24 38 Z" fill="url(#flameV)" opacity="0.85"/>
      <path d="M23 37 C 17 33 13 27 12.5 19 C 12.3 15 13 12.5 14.5 11 C 16 14 18.5 18 20.5 23 C 22 28 22.7 32.5 23 37 Z" fill="url(#flameV)"/>
      <path d="M25 37 C 31 33 35 27 35.5 19 C 35.7 15 35 12.5 33.5 11 C 32 14 29.5 18 27.5 23 C 26 28 25.3 32.5 25 37 Z" fill="url(#flameV)"/>
      <path d="M24 37 C 18.5 31 18 22 20.5 14 C 22 9.5 23.5 7 25 5 C 27 9 29.5 16 29 24 C 28.7 30 27 34 24 37 Z" fill="url(#flameV)"/>
      <path d="M24 32 C 22 29 22 24 24 21 C 26 24 26 29 24 32 Z" fill="#fff1cf" opacity="0.9"/>
      <path d="M13 40 L 35 40" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.9"/>
    </g>
    <text x="86" y="52" font-family="Verdana, sans-serif" font-size="30" font-weight="700" fill="#f6f2fb">PhoenixLotus Web Studio</text>
  </g>
  <text x="90" y="330" font-family="Verdana, sans-serif" font-size="90" font-weight="800" fill="#f6f2fb">Robert Goldberg</text>
  <text x="92" y="410" font-family="Verdana, sans-serif" font-size="40" font-weight="700" fill="url(#aurora)">I build human-first, AI-native software.</text>
  <text x="92" y="486" font-family="Verdana, sans-serif" font-size="28" fill="#c6bcd6">Founder · Web Developer · Designer — Mendocino County, CA</text>
  <rect x="92" y="524" width="1016" height="3" rx="1.5" fill="url(#aurora)"/>
  <text x="92" y="576" font-family="Verdana, sans-serif" font-size="24" fill="#8a7fa0">SmileCart · PlanRoute · DrafTech · Fancy's Studio · Inkloom</text>
</svg>`
await sharp(Buffer.from(og)).png().toFile(`${PUB}/og/og-default.png`)

console.log('Generated: apple-touch-icon.png, favicon-{16,32}.png, favicon.ico, og/og-default.png')
