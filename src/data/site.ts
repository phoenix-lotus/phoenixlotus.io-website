export const site = {
  name: 'Robert Goldberg',
  shortName: 'PhoenixLotus',
  role: 'Founder, PhoenixLotus Web Studio',
  location: 'Mendocino County, CA',
  email: 'robert.goldberg.dev@gmail.com',
  url: 'https://phoenixlotus.netlify.app',
  tagline: 'I build human-first, AI-native software.',
  blurb:
    'PhoenixLotus Web Studio is my solo shop in Mendocino County — I design and build websites and web apps end to end, for clients and small businesses as well as my own products. Front end, database, serverless backend, payments, native shells; real schemas, real money paths, real Claude pipelines, no vaporware. I’m also a licensed pilot and a dad.',
  blurb2:
    'It all runs under PhoenixLotus Web Studio — the name is a personal theme of rising and growing — spanning a grocery marketplace, a construction-document intelligence platform, and tools built for the specific people in my life. The throughline: use AI as the engine, and keep the product warm, transparent, and genuinely useful.',
  roles: ['web developer', 'designer', 'founder', 'problem-solver'],
  socials: {
    github: 'https://github.com/phoenix-lotus',
    linkedin: 'https://www.linkedin.com/in/robert-g-838955193',
    email: 'mailto:robert.goldberg.dev@gmail.com',
  },
} as const

export const nav = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Contact', href: '/#contact' },
] as const
