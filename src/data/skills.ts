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
  { value: '8', label: 'products shipped' },
  { value: '5', label: 'AI-native builds' },
  { value: 'Solo', label: 'design + engineering' },
  { value: '2019', label: 'building since' },
]
