export const site = {
  name: 'Robert Goldberg',
  shortName: 'PhoenixLotus',
  role: 'Software Developer & Founder',
  location: 'Santa Rosa, CA',
  email: 'robert.goldberg.dev@gmail.com',
  url: 'https://phoenixlotus.netlify.app',
  tagline: 'I build human-first, AI-native software.',
  blurb:
    'I’m a React / MERN developer and solo founder in Santa Rosa — also a licensed pilot, entrepreneur, and dad. I build products end to end: design, front end, database, serverless backend, payments, and native shells. I ship fast and honestly — real schemas, real money paths, real Claude pipelines, no vaporware.',
  blurb2:
    'The work runs under the PhoenixLotus banner — a personal theme of rising and growing — from a grocery marketplace to a construction-document intelligence platform to tools built for the specific people in my life. The throughline: use AI as the engine, keep the product warm, transparent, and genuinely useful.',
  roles: ['developer', 'founder', 'pilot', 'entrepreneur', 'dad'],
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
