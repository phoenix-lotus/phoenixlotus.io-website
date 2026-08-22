export const site = {
  name: 'Robert Goldberg',
  shortName: 'PhoenixLotus',
  studioName: 'PhoenixLotus Web Studio',
  role: 'Web design & marketing',
  location: 'Mendocino County, CA',
  email: 'hello@phoenixlotus.io',
  url: 'https://phoenixlotus.io',
  // No longer the hero H1 (that's built in Hero.tsx around the typewriter
  // slot) — still rendered verbatim in the footer.
  tagline: 'Web design for your business, done right.',
  // "here" leans on the hero's eyebrow badge naming `location` directly
  // above the H1 — if that badge ever drops the county, this sentence
  // loses its antecedent and needs rewording.
  heroSub:
    'Websites, Google profile clean-ups, and the marketing that keeps them working — for small businesses here and beyond.',
  /** Home <title>. Duplicated verbatim by index.html's [data-default] tag — change both together. */
  homeTitle: 'PhoenixLotus Web Studio — Web design & marketing for Mendocino County small businesses',
  /** SEO meta description. Kept under 160 chars so search results don't truncate it. */
  description:
    'A family studio in Mendocino County, CA — web design, Google Business Profile clean-ups, and the marketing that keeps small-business websites working.',
  // Naming Katie by full married surname + the co-founded framing is an
  // explicit owner decision (Bobby, 2026-08-20) — it supersedes the earlier
  // first-name-plus-role-only rule and the "founded by Robert" framing in
  // phoenixlotus-pitch-kit's docs/why-phoenixlotus.md (updated same day).
  blurb:
    'PhoenixLotus Web Studio is a family studio in Mendocino County \u2014 founded by Robert and Katie Goldberg. Robert architects the technical side; Katie writes and edits the content. We make websites for small local businesses \u2014 the design, the content, and the behind-the-scenes details that tell Google, and now AI assistants, what you actually do \u2014 built to work for everyone, even on slow rural internet. And we stick around: hosting and updates, keeping your Google listing complete, and making it simple for your customers to leave a review. Everything is month-to-month, and your web address and your files are always yours.',
  // Two claims have been removed from this field and must not come back.
  // (1) A founding year — "started PhoenixLotus in 2017, after our house
  // burned down" — removed 2026-08-14 per Bobby. No founding date is
  // grounded anywhere in either repo, and phoenixlotus-pitch-kit's
  // docs/why-phoenixlotus.md rejects "anything implying tenure, founding
  // year, or 'years of.'" (2) A product roster ("a grocery marketplace, a
  // construction-document intelligence platform") that read as a client
  // list to a prospect arriving here from a pitch. The wording below is
  // the studio's canonical answer to "who else have you done this for?",
  // kept in step with WHY_PHOENIXLOTUS_PARAGRAPHS[3] in the pitch kit's
  // src/content/studio.ts — EXCEPT that paragraph's family-company
  // sentence, which this surface deliberately does NOT repeat: About.tsx
  // renders `blurb` (which already introduces the family and Katie)
  // directly above this, and saying "Katie is the writer and editor"
  // twice in adjacent paragraphs reads as copy-paste.
  blurb2:
    'The honest version of the track record: Robert has built and shipped sites for paying clients going back to 2020 — a Santa Rosa party-rental company, and an artist’s storefront with a real cart and checkout — and his own software products since. Both of those client sites have long since come down, the way most small-business sites eventually do, so they’re here as case studies rather than live links. The spec rebuilds we’ve done for local businesses stay private unless the owner says otherwise. What we can always show you is exactly how the work gets done.',
  socials: {
    github: 'https://github.com/phoenix-lotus',
    linkedin: 'https://www.linkedin.com/in/robert-g-838955193',
    email: 'mailto:hello@phoenixlotus.io',
  },
} as const

export const nav = [
  { label: 'Services', href: '/services' },
  { label: 'Process', href: '/process' },
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
] as const
