# PhoenixLotus — Portfolio

Personal portfolio of **Robert (Bobby) Goldberg** — live at
[phoenixlotus.netlify.app](https://phoenixlotus.netlify.app).

A bold, colorful, mobile-first single-page site with deep-linkable case studies,
built on the same stack used across the featured projects.

## Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** (custom phoenix→lotus gradient design system, dark-mode ready)
- **Framer Motion** for entrance/scroll/hover motion (respects `prefers-reduced-motion`)
- **React Router** (`/` narrative + `/work/:slug` case studies)
- **react-helmet-async** for per-route SEO/OG
- Deployed on **Netlify** (Netlify Forms contact form)

## Develop

```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck + production build → dist/
npm run preview    # preview the production build
npm run gen:assets # regenerate favicons + OG card from public/favicon.svg
```

## Structure

```
src/
  data/        projects, skills, site config (case-study content lives here)
  lib/         motion variants, hooks (useReveal, useTheme), helpers
  components/  design-system primitives + project cards / device mockups
  layout/      Nav, MobileMenu, Footer
  sections/    Hero, FeaturedWork, ProjectsGrid, About, Skills, Contact
  pages/       Home, CaseStudy, NotFound
public/media/projects/<slug>/   optimized WebP screenshots
```

Project content is fully data-driven — edit `src/data/projects.ts` to add or
update a project; every card, featured row, and case-study page renders from it.
