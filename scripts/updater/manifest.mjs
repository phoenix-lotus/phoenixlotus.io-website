// Portfolio updater bot — the single source of truth for what gets watched.
//
// Each key is a project `slug` in src/data/projects.ts. The bot only ever
// touches projects listed here, so adding a case study to the site does NOT
// automatically enroll it in the watcher — you opt it in here on purpose.
// That is the curation gate, encoded as config.

/** GitHub account that owns the project repos. */
export const OWNER = 'phoenix-lotus'

/** The portfolio repo itself (where PRs/issues are opened). */
export const PORTFOLIO_REPO = `${OWNER}/phoenixlotus.io-website`

/**
 * Repos under OWNER that are never treated as "new project" candidates.
 * - myappsample / projects: superseded / throwaway
 * - planroute-wireframe: a discovery artifact for planroute, not its own study
 * - phoenixlotus.io-website: the site being updated
 */
export const IGNORE_REPOS = new Set([
  'myappsample',
  'projects',
  'planroute-wireframe',
  'phoenixlotus.io-website',
])

/**
 * Source-of-truth files to watch inside each repo. `roadmap` is a
 * case-insensitive substring match (planroute's file is PRODUCT-ROADMAP.md);
 * the rest are exact basename matches.
 */
export const WATCH = {
  exact: ['README.md', 'CLAUDE.md', 'package.json'],
  roadmapSubstring: 'roadmap', // matches *ROADMAP*.md, case-insensitive
}

/**
 * Projects with a real, public, screenshot-able URL. Only these get an
 * automated headless-Chrome capture; everything else is private/local and
 * keeps its current media (noted in the PR).
 */
export const CAPTURABLE = new Set(['planroute', 'happy-hoppers'])

/** Chrome binary for headless screenshots (override with CHROME_BIN). */
export const CHROME_BIN =
  process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

/**
 * The slug → source map. `source: 'github'` repos are read via `gh api`;
 * `source: 'local'` repos are watched on disk (Fancy has no remote).
 * `liveUrl` is only set when there's a genuine public URL to screenshot.
 */
export const PROJECTS = {
  smilecart: { source: 'github', repo: 'smilecart', liveUrl: null },
  planroute: { source: 'github', repo: 'planroute', liveUrl: 'https://planroute.app' },
  draftech: { source: 'github', repo: 'draftech-redesign', liveUrl: null },
  'fancys-studio': {
    source: 'local',
    path: '/Users/robertgoldberg/Code/Fancy',
    liveUrl: null,
  },
  inkloom: { source: 'github', repo: 'printshop-ai', liveUrl: null }, // repo name is stale ("printshop-ai" → product is Inkloom)
  typewriter: { source: 'github', repo: 'typewriter', liveUrl: null },
  'happy-hoppers': {
    source: 'github',
    repo: 'happyhoppersrentals',
    liveUrl: 'https://happyhoppersrentals.com',
  },
}

/** Set of repo names that are already mapped to a case study. */
export const MAPPED_REPOS = new Set(
  Object.values(PROJECTS)
    .filter((p) => p.source === 'github')
    .map((p) => p.repo),
)

/** Reverse lookup: repo name → slug (github-sourced projects only). */
export const REPO_TO_SLUG = Object.fromEntries(
  Object.entries(PROJECTS)
    .filter(([, p]) => p.source === 'github')
    .map(([slug, p]) => [p.repo, slug]),
)
