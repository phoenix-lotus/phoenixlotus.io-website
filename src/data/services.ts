import type { ColorTheme } from '@/data/projects'

/**
 * The studio's published rate card. Every figure here is hand-copied from
 * phoenixlotus-pitch-kit's `src/content/rateCard.ts`, which is the source of
 * truth for house pricing and what `plx pitch check`'s C3 traces a client
 * proposal's dollar figures back to. The two repos share no package, so the
 * copy is deliberate rather than an import: change it there first, then here,
 * or a prospect reads one number in the proposal and a different one on the
 * website.
 */
export interface Plan {
  key: string
  eyebrow: string
  price: string
  cadence: string
  body: string
  includes: string[]
  theme: ColorTheme
}

export const plans: Plan[] = [
  {
    key: 'care',
    eyebrow: 'Care & hosting',
    price: '$99',
    cadence: '/month',
    body: 'Hosting, uptime monitoring, security and dependency updates, up to two content updates a month, and a monthly health report — plus a real person on the other end during business hours, Monday to Friday.',
    includes: [
      'Business hours M–F 9–5 — a real person, not a ticket queue',
      'Hosting + SSL, uptime monitoring',
      'Security & dependency updates',
      'Up to 2 content updates/mo',
      'Monthly health report',
    ],
    theme: 'ember',
  },
  {
    key: 'visibility',
    eyebrow: 'Care + local visibility',
    price: '$179',
    cadence: '/month',
    body: 'Everything in Care & Hosting, plus Google Business Profile management, local citations, and one to two SEO-tuned pages or posts a month.',
    includes: [
      'Everything in Care & Hosting',
      'Google Business Profile + local citations',
      '1–2 SEO-tuned pages/posts per month',
      'Quarterly keyword review',
    ],
    theme: 'phoenix',
  },
  {
    key: 'social',
    eyebrow: 'Care + visibility + social',
    price: '$249',
    cadence: '/month',
    body: 'Everything above, plus three posts a week across two platforms, a content calendar, and a monthly engagement summary.',
    includes: [
      'Everything in Care + Local Visibility',
      '3 posts/wk across 2 platforms',
      'Monthly content calendar',
      'Engagement summary',
    ],
    theme: 'lotus',
  },
]

/**
 * One-time work, not a plan. Kept separate because the two answer different
 * questions: a profile that's wrong or half-filled is a finishable job, while
 * keeping it current is a subscription — and bundling the first into the
 * second means you can't buy the thing you actually need without committing
 * to a monthly.
 */
export const gbpSetup = {
  eyebrow: 'Google Business Profile',
  price: '$450',
  cadence: 'one time',
  body: 'A complete, correct Google Business Profile: every field filled, categories and service areas set, hours and holiday hours, photos, products or services, and Q&A seeded.',
  includes: [
    'Full profile completion + category/service-area setup',
    'NAP consistency check against existing listings',
    'Photos, hours, and services populated',
    'A compliant review-request link you can hand out',
  ],
}

export const adsAddOn =
  'Running paid ads (Google or Meta) is an add-on to Local Visibility or Social rather than a fourth plan, because running ads well needs the other two already in place: 15% of ad spend, $149/mo minimum, covering setup, budget judgment, and creative approval. Percent-of-spend rather than a flat fee keeps our incentive pointed at the results instead of a fixed retainer regardless of budget.'

export const terms =
  'Every monthly plan above is month-to-month. Cancel anytime with 30 days notice, and your domain and files stay yours either way.'

/**
 * Ways to pay for the build, added 2026-08-26. Figures hand-copied from
 * the pitch kit's rateCard.ts (RENTAL_STANDARD_PRICE and friends), same
 * rule as `plans` above, with matching entries in check-prices.mjs's
 * ALLOWED. The payment plan's dollar threshold between six- and
 * twelve-month terms is deliberately NOT published here — the site
 * doesn't publish build prices, and that threshold would be the first
 * one (it lives in rateCard.ts's PAYMENT_PLAN_FOOTNOTE).
 */
export interface PaymentOption {
  key: string
  eyebrow: string
  price: string
  cadence: string
  body: string
  theme: ColorTheme
}

export const paymentOptions: PaymentOption[] = [
  {
    key: 'buy',
    eyebrow: 'Buy it',
    price: 'Half + half',
    cadence: 'quoted per project',
    body: 'Half at signing, half at launch. Everything is yours at the last payment: the site, the files, the code.',
    theme: 'phoenix',
  },
  {
    key: 'split',
    eyebrow: 'Split it',
    price: 'A third down',
    cadence: 'then monthly',
    body: 'The same fee, spread out: a third at signing, the rest in equal monthly payments on autopay. Smaller builds run up to six months; the rest can take the full twelve. Nothing is added for paying over time — the total is the same either way. The care plan stays on while payments run, and the site is yours outright at the last one.',
    theme: 'ember',
  },
  {
    key: 'rent',
    eyebrow: 'Rent it',
    price: '$229',
    cadence: '/month · from $329 for larger builds',
    body: 'Nothing down, because the site is already built before we ever show it. $99 of the monthly is the full care plan; the rest is site rent. Twelve months minimum, then month-to-month. Your domain and your content are yours the whole time — the site itself stays ours unless you buy it out.',
    theme: 'lotus',
  },
]

export const paymentTerms =
  'The buyout on a rented site is the build price we quoted for it, minus every site-rent dollar you’ve paid, and never less than three months’ rent. Leaving a rental during the first year costs three months’ rent, stated up front rather than buried in a term clause. A rented standard site can carry the upper care plans too: $309/month with Local Visibility, $379/month with Visibility + Social — those replace each other, they don’t add. If the numbers say buying beats renting for how long you’ll keep the site, we’ll tell you that before you sign anything.'

/**
 * The platform stance, published 2026-08-22 (owner decision, Bobby).
 *
 * Deliberately scoped to what the studio will assess and recommend. It
 * never claims to have built on any named platform, because there is no
 * shippable evidence for that claim: the only commerce work in
 * `projects.ts` is a 2020 OpenCart store that is long offline, and
 * `why-phoenixlotus.md`'s REJECTED list bans unverified capability claims
 * about identifiable third-party products along with anything implying
 * tenure. A recommendation is a claim about judgment, which the workup
 * actually produces (see plx-workup §5).
 *
 * The two surcharge figures are hand-copied from the pitch kit's
 * rateCard.ts, same rule as `plans` above, and both have matching entries
 * in scripts/check-prices.mjs's ALLOWED list — that script hard-fails this
 * repo's build if the two ever drift apart.
 */
export const platformNote =
  'Every price here covers a site built the way we build by default: ordinary files, hosting included. A shop with real inventory belongs on Shopify. An owner who publishes every week may be better off on WordPress. If Squarespace or Wix is already working for you, remodeling what you have can beat replacing it. We’ll tell you which fits once we’ve looked at your business, and the plan adjusts from there: $30/mo more where you pay the platform directly, $90/mo more on managed WordPress, where hosting is included. On a platform you pay for yourself, the account and everything in it is already yours.'
