export type ColorTheme = 'phoenix' | 'lotus' | 'pool' | 'ember' | 'aurora' | 'magenta'

export type Status =
  | 'live'
  | 'in-development'
  | 'mvp'
  | 'client'
  | 'concept'
  | 'pre-launch'
  | 'prototype'
  | 'archived'

export type Category = 'app' | 'client' | 'ai' | 'concept' | 'early'

export interface ProjectMedia {
  type: 'screenshot' | 'fallback'
  src?: string
  alt: string
  frame: 'phone' | 'browser' | 'none'
  aspect?: '9/19.5' | '16/10' | '16/9' | '4/3'
  url?: string // faux URL shown in a browser frame
}

export interface ProjectLink {
  live?: string
  github?: string
}

export interface Project {
  slug: string
  title: string
  featured: boolean
  order: number
  tagline: string
  description: string
  longDescription: string[]
  role: string
  year: string
  location?: string
  tech: string[]
  highlights: string[]
  status: Status
  category: Category[]
  links: ProjectLink
  colorTheme: ColorTheme
  media: ProjectMedia[]
}

export const STATUS_LABEL: Record<Status, string> = {
  live: 'Live',
  'in-development': 'In development',
  mvp: 'MVP',
  client: 'Client work',
  concept: 'Concept',
  'pre-launch': 'Pre-launch',
  prototype: 'Prototype',
  archived: 'Early work',
}

export const CATEGORY_LABEL: Record<Category, string> = {
  app: 'Apps',
  // Not "Client" — this tag covers builds made for family and friends
  // alongside earlier paid work, and a bare "Client" chip on a studio site
  // reads as a current roster. There isn't one. (The paid work dates to
  // ~2020 under the earlier PhoenixLotus Media name; see the
  // zero-signed-clients memory before writing any track-record line.)
  client: 'For others',
  ai: 'AI',
  concept: 'Concept',
  early: 'Early',
}

export const projects: Project[] = [
  {
    slug: 'smilecart',
    title: 'SmileCart',
    featured: true,
    order: 1,
    tagline: 'A human-first grocery marketplace.',
    description:
      'A two-sided grocery marketplace where independent shoppers act as merchants and customers choose the specific person who shops for them — the honest antidote to black-box delivery, shipped as native iOS + Android apps on 200+ SQL migrations of real marketplace logic.',
    longDescription: [
      'SmileCart is an “anti-Instacart” grocery marketplace for Ukiah, California, built on three ideas: favorite-shopper relationships (you choose who shops for you), honest availability (a belief model that says “in stock / usually available / may be out” instead of faking certainty), and pre-authorized substitutions that handle misses gracefully.',
      'Making a real marketplace safe and defensible was the hard part. Shoppers are independent merchants on Stripe Connect, with a flat software fee rather than a percentage cut — deliberately, to stay a marketplace and not a middleman. The build layers in Claude Vision receipt OCR that gates the order lifecycle, a Bronze/Silver/Gold trust engine, UPC scan verification with shopper-consensus catalog seeding, in-order chat, and public shopper storefronts.',
      'It even engineers around labor law: a classification firewall keeps trust tiers derived only from real marketplace signals, never platform-directed work. It’s a feature-complete MVP running in Stripe test mode against a ~47k-product catalog — gated on external accounts and legal sign-off, not remaining engineering.',
    ],
    role: 'Solo founder & full-stack engineer',
    year: '2026–present',
    location: 'Ukiah / Mendocino County, CA',
    tech: [
      'React 18',
      'TypeScript',
      'Vite',
      'Tailwind',
      'Supabase (Postgres · Realtime)',
      'Netlify Functions',
      'Capacitor (iOS + Android)',
      'Stripe Connect',
      'Claude Vision',
      'Leaflet',
      'ML Kit',
      'OneSignal',
      'Playwright',
    ],
    highlights: [
      '200+ idempotent SQL migrations powering a full two-sided marketplace',
      'Native iOS + Android from day one, with ML Kit barcode scanning',
      'Claude Vision receipt OCR + a trust engine gating the order lifecycle',
      '“Honest availability” belief model & transparent, disclosed pricing',
    ],
    status: 'mvp',
    category: ['app', 'ai'],
    links: {},
    colorTheme: 'phoenix',
    media: [
      {
        type: 'screenshot',
        src: '/media/projects/smilecart/home.webp',
        alt: 'SmileCart human-first grocery marketplace',
        frame: 'browser',
        aspect: '16/10',
        url: 'smilecart.app',
      },
    ],
  },
  {
    slug: 'planroute',
    title: 'PlanRoute',
    featured: true,
    order: 2,
    tagline: 'Catch the change order before you bid.',
    description:
      'An AI-native construction-document intelligence platform. Drop in a plan set and about thirty seconds later get extracted schedules, cross-sheet discrepancy detection, and auto-drafted RFIs — the reconciliation engine that catches the conflicts which become change orders.',
    longDescription: [
      'Construction plans and specs are authored by different people on different timelines, and they quietly disagree — and those disagreements become the change orders that eat a bidder’s margin. PlanRoute reads a plan set the moment it lands and surfaces a structured briefing: sheets classified, schedules extracted, cross-sheet conflicts flagged, before an estimator opens the first page.',
      'The takeoff is the input; the reconciliation and the drafted RFI are the product. A multi-stage pipeline routes cheaply through Claude Haiku and escalates to Sonnet and Opus for high-stakes vision calls, with confidence and an audit trail modeled as first-class data — every extraction carries its source sheet, bounding box, and reasoning. A vision title-block fallback even rescues image-baked AutoCAD exports where naive text extraction is confidently wrong.',
      'An interactive vision of the product is live at planroute.app — a discovery demo that walks through intake, the animated extraction pipeline, and a cross-sheet conflict modal. Behind it, a custom eval harness enforces a ≥90% discrepancy-recall quality gate before the pipeline ships.',
    ],
    role: 'Solo founder & full-stack engineer',
    year: '2026–present',
    location: 'Sonoma / Mendocino / Lake counties, CA',
    tech: [
      'React 19',
      'TypeScript',
      'Vite',
      'React Router 7',
      'Zustand',
      'Supabase',
      'Netlify Functions (Node 22)',
      'Claude (Haiku · Sonnet · Opus)',
      'Stripe',
      'pdf.js',
      'Playwright',
    ],
    highlights: [
      'Multi-stage extraction pipeline routing Haiku → Sonnet → Opus by stakes',
      'Vision title-block fallback recovering image-baked & bleed-through PDFs',
      'Confidence + reasoning trace modeled as first-class, auditable data',
      'Eval harness enforcing a ≥90% discrepancy-recall quality gate',
      'Interactive vision demo live at planroute.app',
    ],
    status: 'in-development',
    category: ['app', 'ai', 'concept'],
    links: { live: 'https://planroute.app' },
    colorTheme: 'pool',
    media: [
      {
        type: 'screenshot',
        src: '/media/projects/planroute/workspace.webp',
        alt: 'PlanRoute AI extraction workspace',
        frame: 'browser',
        aspect: '16/10',
        url: 'planroute.app',
      },
    ],
  },
  {
    slug: 'fancys-studio',
    title: "Fancy's Studio",
    featured: false,
    order: 5,
    tagline: 'Snap a photo, Claude lists it, approve.',
    description:
      'An AI-assisted storefront PWA built for a non-technical family seller: photograph an item, Claude drafts the full listing and price, tap Approve, and it publishes — with one Supabase inventory as the single source of truth so a one-of-a-kind piece can never be sold twice.',
    longDescription: [
      'Fancy’s Studio was built for a family member who sells jewelry, vintage goods, and furniture from a co-op booth. The whole product is one gesture: photograph → review a Claude-drafted listing and price → Approve → publish. Inventory lives once in Supabase, so listing the same one-of-a-kind item across channels can’t double-sell it.',
      'The interesting decisions are about honesty and safety. Claude drafts in category-aware modes, and buyer Q&A triage answers only safe factual questions — availability, shipping, dimensions — enforced server-side, routing everything else to an inbox. A compliance guardrail (a name sanitizer plus channel routing) keeps unbranded novelty items off the marketplaces that suspend accounts for them.',
      'It’s marketplace-first: Etsy and eBay syndication over real OAuth, plus paste-ready Facebook posts where no individual API exists. All four planned phases are built, typecheck-clean, and passing a Vitest suite — going live needs only credential provisioning.',
    ],
    role: 'Solo full-stack engineer (built for family)',
    year: '2026',
    tech: [
      'React 18',
      'TypeScript',
      'Vite',
      'Tailwind',
      'PWA',
      'Supabase',
      'Netlify Functions',
      '@anthropic-ai/sdk',
      'Stripe',
      'Etsy & eBay APIs',
      'Vitest',
    ],
    highlights: [
      'Photo → full listing + price via Claude, gated behind one-tap Approve',
      'Etsy + eBay syndication over real OAuth, plus paste-ready Facebook posts',
      'Server-enforced compliance guardrail & safe-category buyer Q&A triage',
      'Single-source Supabase inventory that prevents double-selling',
    ],
    status: 'pre-launch',
    category: ['app', 'ai', 'client'],
    links: {},
    colorTheme: 'magenta',
    media: [
      { type: 'fallback', alt: "Fancy's Studio storefront PWA", frame: 'phone', aspect: '9/19.5' },
    ],
  },
  {
    slug: 'hopfiesta',
    title: 'HopFiesta',
    featured: true,
    order: 4,
    tagline: 'Party-rental bookings, in two languages, as a platform.',
    description:
      'A multi-tenant booking platform for bilingual party-rental operators — public signup, a five-step catalog wizard with English/Spanish content side by side, Stripe Connect onboarding, and a webhook-driven provisioning pipeline that stands up each operator\u2019s own gated storefront site.',
    longDescription: [
      'HopFiesta is the control plane for a party-rental SaaS: an operator signs up with a magic link and builds their business in a five-step wizard — inventory units, a deeply-specified item catalog (footprint, clearances, capacity, wet/dry, power, surfaces — with English and Spanish copy edited side by side), service area, Stripe Connect, go live. Under the catalog sits a requirements layer mapping each rentable item to the physical units it consumes, so the platform knows what actually double-books.',
      'Provisioning is event-driven. Completing Stripe onboarding fires a webhook that verifies the signature, claims the event id for idempotency, then creates the operator\u2019s site on Netlify, generates its access secrets, writes its environment, and links its build — and a scheduled watcher promotes the tenant to live once the build lands, tracking SSL separately when a custom domain is connected. The trust boundaries are deliberate: charges-enabled is only ever set by the verified webhook, never by the browser returning from Stripe, and the Netlify deploy token lives exclusively on the control plane, so a bug in one tenant’s site can’t reach the account that provisions them.',
      'It runs against Stripe in test mode today, on a local Supabase stack. The provisioning pipeline is written defensively — idempotent webhooks, double-read verification, explicit failure states instead of retry loops — and its first run against a real hosting account is still ahead of it.',
    ],
    role: 'Solo founder & platform engineer',
    year: '2026',
    tech: [
      'React 18',
      'Vite',
      'vite-react-ssg',
      'Tailwind',
      'Supabase',
      'Netlify Functions',
      'Stripe Connect',
      'zod',
    ],
    highlights: [
      'Five-step bilingual catalog wizard — 15 field kinds, ES/EN side by side',
      'Webhook-driven tenant provisioning: site, secrets, env, and build, automatically',
      'Charges-enabled flips only on verified, idempotent webhook events',
      'Blast-radius security: the deploy token never leaves the control plane',
    ],
    status: 'in-development',
    category: ['app'],
    links: {},
    colorTheme: 'pool',
    media: [{ type: 'fallback', alt: 'HopFiesta operator onboarding wizard', frame: 'browser', aspect: '16/10' }],
  },
  {
    slug: 'celestial-opalescence',
    title: 'Celestial Opalescence',
    featured: false,
    order: 8,
    tagline: 'Paid client work, 2020. A real storefront, with real checkout.',
    description:
      'An online storefront built for an artist selling original work — an OpenCart build with a custom theme and a working cart and checkout. The "retail storefront with real checkout" the studio\u2019s track record refers to.',
    longDescription: [
      'A 2020 build for an artist selling original pieces: a full OpenCart 3.0.3.2 storefront with a custom-themed front end, product catalog, cart, and a real checkout path — not a brochure site with a contact form bolted on.',
      'It is the concrete answer to "have you actually shipped commerce?" The storefront is long since offline and the domain has lapsed, so there is no live link to give; the source and the custom theme are archived. The commerce patterns here show up again, far more sophisticated, in SmileCart and Fancy\u2019s Studio.',
    ],
    role: 'Solo builder (client work)',
    year: '2020',
    tech: ['OpenCart 3.0.3.2', 'PHP', 'MySQL', 'Custom CSS theme'],
    highlights: [
      'A working cart and checkout, not a contact form',
      'Custom-themed OpenCart front end over the stock template',
      'Product catalog built around the client\u2019s own photography',
    ],
    status: 'archived',
    category: ['early', 'client'],
    links: {},
    colorTheme: 'lotus',
    // No screenshot: rendering the storefront needs PHP + MySQL, and the only
    // images in the archive are the client's own watermarked artwork -- hers,
    // not the studio's work to display. A fallback frame is the honest option.
    media: [
      {
        type: 'fallback',
        alt: 'Celestial Opalescence — artist storefront with checkout (2020)',
        frame: 'browser',
        aspect: '16/10',
      },
    ],
  },
  {
    slug: 'happy-hoppers',
    title: 'Happy Hoppers',
    featured: false,
    order: 7,
    tagline: 'Paid client work, 2019. Where it all started.',
    description:
      'A website for a Santa Rosa bounce-house and party-rental company, first stood up in 2019 — client work, and the entrepreneurial spark behind everything else on this page.',
    longDescription: [
      'The earliest project in this portfolio, and real paid client work: a website for a Santa Rosa bounce-house and party-rental company, first stood up in 2019. Static HTML, hand-written CSS, and a mobile stylesheet — modest by current standards, and shipped for a business that depended on it.',
      'The through-line from here to the current work is entrepreneurial, not architectural. The instinct visible in Happy Hoppers — take a concrete local business, put it online, make it easy for a customer to say yes — is the same one that shows up, far more sophisticated, in SmileCart, Inkloom, and Fancy’s Studio. The starting point of the rise-and-grow arc.',
    ],
    role: 'Solo builder (early work)',
    year: '2019',
    tech: ['HTML', 'CSS', 'JavaScript'],
    highlights: [
      'Robert’s first end-to-end build for a live, real-world business',
      'An early version of the commerce patterns in his later products',
      'The entrepreneurial origin point of the PhoenixLotus body of work',
    ],
    status: 'archived',
    category: ['early', 'client'],
    links: {},
    colorTheme: 'aurora',
    media: [
      {
        type: 'screenshot',
        // Captured from the preserved 2019 source, with the photographs
        // neutralized: the real hero is a crowd shot of identifiable
        // children and the images are stock/template placeholders, so
        // republishing them here would mean redistributing photos we hold
        // no license or release for. The layout and type ARE the work.
        src: '/media/projects/happy-hoppers/home.webp',
        alt: 'Happy Hoppers — 2019 site layout, photography neutralized',
        frame: 'browser',
        aspect: '16/10',
      },
    ],
  },
]

/** Small, honest "Labs" strip — early-stage experiments, presented as such. */
export const labs = [
  { name: 'BidPulse', blurb: 'Zero-login plan-upload → AI bid emails for a local print shop.' },
  { name: 'HaulCall', blurb: 'On-demand hauling marketplace — “Uber, but for hauling.”' },
  { name: 'Wax', blurb: 'A curated sticker-drop platform concept for festival culture.' },
]

export const allProjects = [...projects].sort((a, b) => a.order - b.order)

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
