export const site = {
  name: 'Robert Goldberg',
  shortName: 'PhoenixLotus',
  studioName: 'PhoenixLotus Web Studio',
  role: 'Web design & development',
  location: 'Mendocino County, CA',
  email: 'hello@phoenixlotus.io',
  url: 'https://phoenixlotus.io',
  tagline: 'Small-business websites, built and maintained in Mendocino County',
  /** The span of `tagline` the hero fills with the aurora gradient — must appear verbatim in `tagline`. */
  taglineAccent: 'Mendocino County',
  /** Home <title>. Duplicated verbatim by index.html's [data-default] tag — change both together. */
  homeTitle: 'PhoenixLotus Web Studio — Websites for Mendocino County small businesses',
  /** SEO meta description. Kept under 160 chars so search results don't truncate it. */
  description:
    'PhoenixLotus Web Studio — a one-person web studio in Mendocino County, CA, building and maintaining websites for small local businesses.',
  blurb:
    'PhoenixLotus Web Studio is my one-person shop in Mendocino County. I build websites for small local businesses — design, copy, accessibility, and the structured data that tells Google, and now AI assistants, what you actually do — then stay on to host and maintain them, keep your Google Business Profile complete, and run review requests by the rules. Sites are built light enough to hold up on rural connections, plans are month-to-month, and your domain and files stay yours.',
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
  // src/content/studio.ts.
  blurb2:
    'The honest version of the track record: I’ve built and shipped sites for paying clients going back to 2020 — small-business sites and a retail storefront with real checkout — and my own software products since. Those early client sites have long since come down. So I’m not going to hand you a portfolio of other people’s work and ask you to draw conclusions from it. What I can show you is exactly how the work gets done.',
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
