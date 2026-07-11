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
  </defs>
  <rect width="1200" height="630" fill="#0e0a14"/>
  <rect width="1200" height="630" fill="url(#glowA)"/>
  <rect width="1200" height="630" fill="url(#glowB)"/>
  <g transform="translate(90,86)">
    <g transform="scale(1.5)">
      <path d="M24 7c3.2 6.2 3.2 11.8 0 19.5C20.8 18.8 20.8 13.2 24 7Z" fill="url(#aurora)"/>
      <path d="M24 29C17 24.5 10.5 24.5 6 28c5.4 1.8 8.1 5.4 9.9 10.8C18.6 35.2 21.3 32.5 24 29Z" fill="url(#aurora)" opacity="0.85"/>
      <path d="M24 29c7-4.5 13.5-4.5 18-1-5.4 1.8-8.1 5.4-9.9 10.8C29.4 35.2 26.7 32.5 24 29Z" fill="url(#aurora)" opacity="0.85"/>
      <path d="M13 41c7 2.6 15 2.6 22 0" stroke="url(#aurora)" stroke-width="2.4" stroke-linecap="round" fill="none"/>
    </g>
    <text x="86" y="52" font-family="Verdana, sans-serif" font-size="34" font-weight="700" fill="#f6f2fb">PhoenixLotus</text>
  </g>
  <text x="90" y="330" font-family="Verdana, sans-serif" font-size="90" font-weight="800" fill="#f6f2fb">Robert Goldberg</text>
  <text x="92" y="410" font-family="Verdana, sans-serif" font-size="40" font-weight="700" fill="url(#aurora)">I build human-first, AI-native software.</text>
  <text x="92" y="486" font-family="Verdana, sans-serif" font-size="28" fill="#c6bcd6">Developer · Founder · Pilot — Mendocino County, CA</text>
  <rect x="92" y="524" width="1016" height="3" rx="1.5" fill="url(#aurora)"/>
  <text x="92" y="576" font-family="Verdana, sans-serif" font-size="24" fill="#8a7fa0">SmileCart · PlanRoute · DrafTech · Fancy's Studio · Inkloom</text>
</svg>`
await sharp(Buffer.from(og)).png().toFile(`${PUB}/og/og-default.png`)

console.log('Generated: apple-touch-icon.png, favicon-{16,32}.png, favicon.ico, og/og-default.png')
