#!/usr/bin/env node
// Every $-figure in src/ + index.html must trace to a constant in
// phoenixlotus-pitch-kit's src/content/rateCard.ts — the pricing source of
// truth. Exists because the 2026-08-15 re-anchor left two stale "$149/mo"
// care prices in prose (fixed in 88210ec), and a plain grep can't catch
// that: $149 is also the current, correct ads-add-on floor.
//
// ALLOWED is a deliberate hand copy (same convention as src/data/services.ts):
// the pitch-kit repo is private and this one is public, so CI can't read
// rateCard.ts. Any local run cross-verifies ALLOWED against the real file at
// ../phoenixlotus-pitch-kit and fails on drift; CI validates against the copy.

import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const RATE_CARD = join(ROOT, '..', 'phoenixlotus-pitch-kit', 'src', 'content', 'rateCard.ts')

// context: required nearby text — only for an amount that collides with a
// retired price, so the figure alone can't prove which price it is.
const ALLOWED = [
  { amount: 149, source: 'RATE_CARD.care' },
  { amount: 249, source: 'RATE_CARD.visibility' },
  { amount: 449, source: 'RATE_CARD.social' },
  { amount: 450, source: 'GBP_SETUP_PRICE' },
  { amount: 300, source: 'REVIEW_SYSTEM_PRICE' },
  { amount: 450, source: 'EMAIL_SETUP_PRICE' },
  { amount: 75, source: 'EMAIL_MONTHLY_PRICE' },
  { amount: 199, source: 'ADS_ADDON_FLOOR_PRICE' },
  { amount: 30, source: 'HOSTED_PLATFORM_SURCHARGE_PRICE' },
  { amount: 90, source: 'MANAGED_WORDPRESS_SURCHARGE_PRICE' },
  { amount: 279, source: 'RENTAL_STANDARD_PRICE' },
  { amount: 419, source: 'RENTAL_LARGER_PRICE' },
  { amount: 379, source: 'RENTAL_STANDARD_VISIBILITY_PRICE' },
  { amount: 579, source: 'RENTAL_STANDARD_SOCIAL_PRICE' },
]

const RETIRED = {
  // 149 removed 2026-08-26: no longer retired. It's RATE_CARD.care's
  // current price again (full circle — this was the pre-2026-08-15
  // figure, retired that day, now live again by a separate later
  // decision).
  // 199 removed 2026-08-26 (second time around): no longer retired.
  // It was retired once already (the ads-floor minimum before the
  // 2026-08-15 re-anchor), came back briefly as RATE_CARD.care's old
  // pre-2026-08-26 price, and is now live a third way, as the NEW
  // ads-floor (ADS_ADDON_FLOOR_PRICE) — moved there same-day the care
  // tiers rose, since $149 (the old floor) collided with the new care
  // price. See rateCard.ts's dated note for the reasoning.
  // 449 removed 2026-08-26: no longer retired. It's RATE_CARD.social's
  // current price (raised from $249), now live in ALLOWED above. The
  // number the 2026-08-15 re-anchor retired was for a DIFFERENT tier
  // (the old Local Visibility price) — a coincidence of the two ladders
  // reusing a digit, not the same claim coming back.
  849: 'the Social price before the 2026-08-15 re-anchor',
  // 179 deliberately NOT added here. RATE_CARD.visibility moved off 179
  // to 249 on 2026-08-26, so a stray $179 on the site should fail loudly
  // — leaving it untracked (absent from both ALLOWED and RETIRED) gets
  // the generic "traces to no rateCard.ts constant" message, which is
  // accurate and doesn't need a named entry to be useful.
  //
  // 229/309/329 (the pre-2026-08-26 rental figures) deliberately NOT
  // added here either, same reasoning: a stray occurrence of any of them
  // should fail loudly with the generic message rather than a named
  // history lesson.
  //
  // 379 also deliberately NOT retired, even though it used to name
  // RENTAL_STANDARD_SOCIAL_PRICE before the 2026-08-26 social-tier
  // raise — it's now genuinely live again, twice over, as both
  // RENTAL_LARGER_PRICE and the recomputed RENTAL_STANDARD_VISIBILITY_PRICE.
  // Both ALLOWED entries above are correct; see rateCard.ts's dated note
  // for the (unresolved, flagged) coincidence.
}

const SCAN_EXTS = /\.(ts|tsx|css|svg|html|md|json)$/

function* textFiles(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) yield* textFiles(path)
    else if (SCAN_EXTS.test(name)) yield path
  }
}

function reasonFor(amount, contextOnlyMatches) {
  if (contextOnlyMatches.length) {
    const entry = contextOnlyMatches[0]
    let reason = `allowed only as ${entry.source}, next to text matching ${entry.context}`
    if (RETIRED[amount]) reason += `; a bare $${amount} is ${RETIRED[amount]}`
    return reason
  }
  if (RETIRED[amount]) return `${RETIRED[amount]} — current prices live in rateCard.ts`
  return 'traces to no rateCard.ts constant — pricing on the site must come from the rate card'
}

const problems = []
let figureCount = 0
const scannedFiles = new Set()

for (const path of [join(ROOT, 'index.html'), ...textFiles(join(ROOT, 'src'))]) {
  const lines = readFileSync(path, 'utf8').split('\n')
  lines.forEach((line, i) => {
    for (const match of line.matchAll(/\$(\d[\d,]*(?:\.\d+)?)/g)) {
      figureCount += 1
      scannedFiles.add(path)
      const amount = Number(match[1].replaceAll(',', ''))
      // $0 is the absence of a price, not one ("Start at $0 down"). No tier is
      // free, so unlike a real figure it can't be a stale price that drifted
      // off the rate card. Skipped here rather than added to ALLOWED, which
      // requires every source to resolve to an actual rateCard.ts constant.
      if (amount === 0) continue
      const candidates = ALLOWED.filter((e) => e.amount === amount)
      // context must hold on the figure's own line — a wider window let a bare
      // $149 pass just for sitting near the ads footnote.
      if (candidates.some((e) => !e.context || e.context.test(line))) continue
      const at = `${relative(ROOT, path)}:${i + 1}`
      problems.push(`${at}  $${match[1]} — ${reasonFor(amount, candidates)}`)
    }
  })
}

if (existsSync(RATE_CARD)) {
  const text = readFileSync(RATE_CARD, 'utf8')
  const derived = {}
  for (const [, key, amount] of text.matchAll(/key: '([a-z-]+)', displayPrice: '\$(\d+)'/g))
    derived[`RATE_CARD.${key}`] = Number(amount)
  for (const [, name, amount] of text.matchAll(/^export const ([A-Z_]+_PRICE) = (\d+)$/gm))
    derived[name] = Number(amount)

  // RATE_CARD displayPrices and HOUSE_LADDER amounts state the same three
  // tiers twice; if they disagree, the card itself is broken, not this site.
  const tierAmounts = Object.entries(derived)
    .filter(([k]) => k.startsWith('RATE_CARD.'))
    .map(([, v]) => v)
    .sort((a, b) => a - b)
  const ladderAmounts = [...text.matchAll(/amount: (\d+)/g)]
    .map((m) => Number(m[1]))
    .sort((a, b) => a - b)
  if (String(tierAmounts) !== String(ladderAmounts))
    problems.push(
      `rateCard.ts is internally inconsistent: RATE_CARD says [${tierAmounts}], HOUSE_LADDER says [${ladderAmounts}]`,
    )

  const allowedBySource = new Map(ALLOWED.map((e) => [e.source, e.amount]))
  for (const source of new Set([...allowedBySource.keys(), ...Object.keys(derived)])) {
    const here = allowedBySource.get(source)
    const there = derived[source]
    if (here === there) continue
    if (there === undefined)
      problems.push(
        `ALLOWED entry ${source} no longer parses out of rateCard.ts — the card changed shape or dropped it; update ALLOWED here`,
      )
    else if (here === undefined)
      problems.push(
        `rateCard.ts has ${source} = $${there} with no ALLOWED entry here — add one so the site can quote it`,
      )
    else
      problems.push(
        `${source}: rateCard.ts says $${there}, ALLOWED here still says $${here} — sweep the site copy, then update ALLOWED`,
      )
  }
}

if (problems.length) {
  console.error('price check FAILED:\n')
  for (const p of problems) console.error(`  ${p}`)
  console.error(`\n${problems.length} problem(s). Source of truth: phoenixlotus-pitch-kit/src/content/rateCard.ts`)
  process.exit(1)
}

const verified = existsSync(RATE_CARD)
  ? 'ALLOWED cross-verified against rateCard.ts'
  : 'rateCard.ts not present (private repo; expected in CI) — validated against the committed ALLOWED copy'
console.log(`price check OK: ${figureCount} $-figure(s) in ${scannedFiles.size} file(s) all trace to the rate card; ${verified}`)
