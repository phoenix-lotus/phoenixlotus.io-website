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
  'Running paid ads (Google or Meta) is an add-on to Local Visibility or Social rather than a fourth plan, because running ads well needs the other two already in place: 15% of ad spend, $149/mo minimum, covering setup, budget judgment, and creative approval. Percent-of-spend rather than a flat fee keeps my incentive pointed at the results instead of a fixed retainer regardless of budget.'

export const terms =
  'Every monthly plan is month-to-month. Cancel anytime with 30 days notice, and your domain and files stay yours either way.'
