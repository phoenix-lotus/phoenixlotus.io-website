export interface SkillGroup {
  title: string
  theme: 'phoenix' | 'lotus' | 'pool' | 'ember' | 'magenta'
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    theme: 'phoenix',
    skills: [
      'React 18 / 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Framer Motion',
      'Zustand',
      'React Router',
      'PWA',
    ],
  },
  {
    title: 'Backend & Data',
    theme: 'pool',
    skills: [
      'Node.js',
      'Netlify Functions',
      'Supabase',
      'PostgreSQL / PL·pgSQL',
      'Stripe',
      'REST APIs',
      'Auth & RLS',
    ],
  },
  {
    title: 'AI Engineering',
    theme: 'magenta',
    skills: [
      'Anthropic Claude',
      'Vision extraction',
      'Tiered model routing',
      'Eval harnesses',
      'Prompt design',
      'AI product design',
    ],
  },
  {
    title: 'Mobile & Native',
    theme: 'ember',
    skills: ['Capacitor (iOS + Android)', 'MLKit', 'OneSignal push', 'Offline-first', 'App Store builds'],
  },
  {
    title: 'Craft',
    theme: 'lotus',
    skills: ['Accessibility (WCAG)', 'SEO & JSON-LD', 'Playwright', 'Leaflet maps', 'Performance', 'Design systems'],
  },
]

export const facts = [
  // Four checkable numbers, and nothing else. "shipped" once stood where
  // "built" does now: it overstated every entry's actual status (see
  // projects.ts — mvp/prototype/in-development/pre-launch/archived, not
  // one launched and currently live) and had already been corrected once for
  // exactly this class of error (commit 62b562f, re: DrafTech — since
  // removed from the shelf; the lesson predates and outlives the tile).
  // "Built" is true of all 8 regardless of stage, so it doesn't need
  // re-verifying as each project moves.
  //
  // 2020 is the first PAID client work — Evan Fowler and Sarai, under the
  // earlier PhoenixLotus Media name, git-dated 2020-11 in
  // ~/Code/DevOps/PhoenixLotusMedia/clients/. It is NOT a founding year and
  // must never be rendered as one; there is no founding year on record.
  // Labels attribute these to Robert BY NAME since 2026-08-20: the About
  // section now speaks as the studio, and under studio voice unattributed
  // tiles read as studio milestones — implying a founding date, which is
  // exactly what the note above forbids.
  { value: '2019', label: "Robert's first site built" },
  { value: '2020', label: "Robert's first paying clients" },
  { value: '8', label: 'projects Robert built' },
  { value: 'Family', label: 'owned & operated' },
]
