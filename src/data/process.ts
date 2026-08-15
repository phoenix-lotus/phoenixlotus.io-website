import type { ColorTheme } from '@/data/projects'

/**
 * The studio's actual method, step by step. This page exists because the
 * client rebuilds themselves can't be shown: they're spec builds behind a
 * passphrase gate whose owners haven't approved anything public (SOW §9 and
 * phoenixlotus-pitch-kit's docs/why-phoenixlotus.md). Every claim below is
 * checkable against the written procedure in phoenixlotus-ops/skills/ —
 * `plx-workup` for steps 1–2, `plx-rebuild` for step 3, `plx-ship` for
 * step 4. Don't add a step here that isn't in one of those files.
 */
export interface Step {
  n: string
  title: string
  body: string
  detail: string[]
  theme: ColorTheme
}

export const steps: Step[] = [
  {
    n: '01',
    title: 'A forensic audit of the site you have now',
    body: 'Before anything gets designed, your current site gets fetched and measured directly — not skimmed, and never described from memory. The findings are written down with the date they were taken, because a finding without a date stops being checkable the moment anything changes.',
    detail: [
      'Page weight, and what a visitor on a rural connection actually waits for',
      'Meta descriptions — present, empty, or the same one copied across every page',
      'Whether every tel: link actually dials when it’s tapped (percent-encoded parentheses quietly stop it)',
      'HTTPS enforcement, viewport meta, mobile rendering',
      'sitemap.xml — orphaned pages, dead entries, the wrong domain',
      'Structured data: absent, present, or describing the wrong kind of business',
    ],
    theme: 'phoenix',
  },
  {
    n: '02',
    title: 'A facts table with a confidence column',
    body: 'Your hours, your address, your service area, your license numbers, the name you actually trade under. Each one gets cross-checked against your site and whatever else applies — Google Business, Yelp, the industry directory, the Secretary of State filing — and each one carries a note on how confident I am and where it came from.',
    detail: [
      'Where two sources disagree, both get recorded — never a silent pick',
      'Anything I can’t confirm is written into the build as TO CONFIRM WITH OWNER, not guessed',
      'Each unconfirmed item also becomes a numbered blocker, so nothing gets quietly lost between research and launch',
      'Third-party links — booking engines, embeds, portals — get fetched live and confirmed to resolve, never rebuilt from a note',
    ],
    theme: 'magenta',
  },
  {
    n: '03',
    title: 'A real, working rebuild — not a mockup',
    body: 'Not a slide deck and not a Figma frame. An actual site: every page, your real content, running on real hosting. The design system is invented for your business rather than picked from a template, and a sibling project’s typefaces don’t get recycled onto yours.',
    detail: [
      'Ordinary web files any host can serve and any developer can pick up — not a platform account you have to keep renting',
      'Fonts self-hosted, so nothing waits on a third-party CDN handshake',
      'Semantic landmarks, visible focus rings, keyboard-operable menus, reduced-motion support',
      'Structured data using the most specific type your trade actually has, not a generic fallback',
    ],
    theme: 'lotus',
  },
  {
    n: '04',
    title: 'A private preview, yours before anyone else’s',
    body: 'The finished rebuild goes up behind a passphrase — not indexed, disallowed in robots.txt, and invisible to anyone without the phrase. You see your own site before the world does, and an unfinished read of your business never becomes a public claim on your name.',
    detail: [
      'The gate is verified live before a link is sent, not assumed',
      'Nothing goes public until you’ve seen it and said yes',
      'If the read on your business turns out to be wrong, that’s a cost on my end rather than an invoice you have to argue about',
    ],
    theme: 'pool',
  },
  {
    n: '05',
    title: 'Only then, the conversation about money',
    body: 'You get the audit, the corrected facts, and a working site to click through first. The quote comes after, once we both know what’s actually being built — and the ongoing plans are published, so there’s no part of this you have to get on a call to find out.',
    detail: [
      'The build itself is quoted per project — page count, languages, booking, and payments all move the number',
      'Care, visibility, and social are fixed monthly prices, listed in public',
      'Month-to-month, cancel with 30 days notice, domain and files yours either way',
    ],
    theme: 'ember',
  },
]
