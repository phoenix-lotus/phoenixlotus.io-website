# CLAUDE.md — AI Assistant Guide for phoenixlotus.io-website

## Project Overview

Static portfolio website for Bobby Goldberg (phoenixlotus.io). Multi-page site built with vanilla HTML5, SCSS, and JavaScript. Deployed on Netlify.

**Pages:** Home (`index.html`), About (`about.html`), Work (`work.html`), Contact (`contact.html`)

## Repository Structure

```
phoenixlotus.io-website/
├── dist/                    # Production-ready website (serves as the web root)
│   ├── index.html           # Home page with typewriter hero
│   ├── about.html           # Bio, skills, testimonials
│   ├── work.html            # Portfolio gallery grid
│   ├── contact.html         # Contact form (Netlify forms + reCAPTCHA)
│   ├── css/
│   │   └── main.css         # Compiled CSS (output from SCSS)
│   ├── js/
│   │   └── typewriter.js    # Typewriter text animation (ES6 class)
│   └── img/                 # All images and assets
│       ├── about-logos/     # Technology/partner logos
│       ├── items/           # Portfolio project screenshots
│       ├── testimonials/    # Client headshot photos
│       ├── logo.png         # Site logo
│       └── showcase.jpg     # Hero background image
├── scss/                    # SCSS source files
│   ├── main.scss            # Entry point — imports all partials, contains main styles
│   ├── _config.scss         # Variables and SASS functions
│   ├── _utilities.scss      # Reusable utility classes (buttons, spacing, etc.)
│   ├── _item_grid.scss      # Portfolio gallery grid with hover overlay effects
│   ├── _media.scss          # Responsive breakpoint media queries
│   ├── main.css             # Compiled CSS (duplicate of dist/css/main.css)
│   └── main.css.map         # Source map
└── project-resources/       # Archived original assets (not used in production)
```

## Build System

### SCSS Compilation

The only build step is SCSS-to-CSS compilation. The original `package.json` (since deleted from repo) used:

```json
{
  "scripts": {
    "sass": "node-sass -w scss/ -o dist/css/ --recursive"
  },
  "devDependencies": {
    "node-sass": "^4.13.0"
  }
}
```

**To restore the build workflow:**

1. Create a `package.json` with the above config (or use `dart-sass`/`sass` as a modern replacement for the deprecated `node-sass`)
2. Run `npm install`
3. Run `npm run sass` to watch and compile SCSS to `dist/css/main.css`

**Note:** `package.json`, `package-lock.json`, and `.gitignore` were deleted in past commits. There is currently no build tooling configured. SCSS must be compiled manually or the build setup must be restored.

### No Testing, Linting, or CI/CD

- No test framework configured
- No ESLint, Prettier, or stylelint
- No CI/CD pipeline (GitHub Actions, etc.)
- Deployment is handled through Netlify's git integration

## SCSS Architecture

SCSS partials follow the underscore-prefix convention and are imported in `main.scss`:

| File | Purpose |
|---|---|
| `_config.scss` | Variables (`$main-color`, `$dark-color`, etc.) and the `set-text-color()` function |
| `_utilities.scss` | Utility classes: `.container`, `.btn-*`, `.bg-*`, `.py-*`, `.my-*`, `.lead`, `.text-center` |
| `_item_grid.scss` | Portfolio gallery `.items` grid with `.item` hover overlay animations |
| `_media.scss` | Responsive breakpoints (800px tablets, 500px smartphones, 330px/580px landscape) |

### Design Tokens (from `_config.scss`)

```scss
$website-width: 1280px;
$main-color: #ffbc00;     // Golden yellow — primary brand color
$light-color: #f4f4f4;    // Light gray
$dark-color: #333;        // Near-black
$medium-color: #ccc;      // Medium gray
$bg-image: url("../img/showcase.jpg");
```

### Responsive Breakpoints

- **800px** — Tablets: reduced header height
- **500px** — Smartphones: stacked nav, single-column grids, hidden hero content
- **580px height** — Landscape: reduced hero padding
- **330px height** — Small landscape: smaller hero heading

## HTML Conventions

- Semantic HTML5 structure: `<header>`, `<section>`, `<footer>`
- Section IDs use the pattern `#{page}-{letter}` (e.g., `#home-a`, `#about-b`, `#contact-c`)
- Inner pages use `#header-inner`; home page uses `#header-home`
- Current nav link gets class `current`
- External dependencies loaded via CDN:
  - **Google Fonts:** Dosis
  - **FontAwesome:** via kit (`kit.fontawesome.com`)
- Contact form uses Netlify form handling (`data-netlify="true"`) with reCAPTCHA

## JavaScript

Single file: `dist/js/typewriter.js`

- ES6 `TypeWriter` class with constructor pattern
- Configured via data attributes on `.txt-type` elements: `data-wait` (ms delay), `data-words` (JSON array)
- Initialized on `DOMContentLoaded`
- Only loaded on `index.html`

## CSS Layout Patterns

- **CSS Grid** for all major layouts: specials (4-col), stats (4-col), process (4-col), about-info (named areas), testimonials (4-col), contact form (named areas), portfolio gallery (3-col)
- **Flexbox** for navigation (`#main-nav`) and footer (`.footer-content`)
- **Grid named areas** used for about bio layout and contact form field layout
- Buttons use SCSS placeholder `%btn-shared` with `@extend`

## Key Conventions for AI Assistants

1. **Edit SCSS, not CSS.** The `dist/css/main.css` file is compiled output. All style changes should be made in `scss/` partials, then compiled.
2. **`dist/` is the web root.** All HTML, images, and JS live here. This is what Netlify serves.
3. **No build tooling currently active.** The build setup (package.json) was deleted. Restore it before adding SCSS compilation workflows.
4. **BEM-like class naming.** Classes follow patterns like `.item-image`, `.item-text-wrap`, `.contact-info`.
5. **ID-based section targeting.** Sections are styled via compound IDs (e.g., `#home-a .specials`, `#about-b .progress`).
6. **Utility-first spacing.** Use existing `.py-{1-4}` and `.my-{1-4}` classes for padding/margin rather than adding inline styles.
7. **Color via variables.** Always use `$main-color`, `$dark-color`, etc. from `_config.scss`. Use `set-text-color($color)` for automatic contrast.
8. **Mobile-responsive.** Any layout changes must account for the breakpoints in `_media.scss`. Grids collapse to `1fr` at 500px.
9. **No JavaScript framework.** This is vanilla JS. Keep additions framework-free and ES6 compatible.
10. **Font:** Dosis (Google Fonts) is the sole typeface. Do not introduce additional fonts without explicit request.
