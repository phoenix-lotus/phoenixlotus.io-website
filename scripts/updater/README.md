# Portfolio updater bot

Keeps the curated case studies in `src/data/projects.ts` in sync with the real
project repos — **on demand**, and always **behind a draft PR you approve**.
It never commits to `master` and never deploys.

## Commands

```bash
npm run updater          # detect → draft edits → refresh screenshots → open a DRAFT PR
npm run updater:check    # dry run: print what changed, touch nothing (no LLM, no PR)
node scripts/updater/run.mjs --rescan       # re-draft every project from current source
node scripts/updater/run.mjs --notify-only  # detect → open a GitHub issue instead of drafting
npm run updater:deploy   # AFTER you merge a PR: build + netlify deploy --prod (manual)
```

## How it works

1. **Detect** — for each project in `manifest.mjs`, compares the current README /
   CLAUDE.md / *ROADMAP*.md / package.json against a local snapshot
   (`.state/snapshot.json`, gitignored). Also flags brand-new repos under the
   account that aren't on the site yet. The **first run just records a baseline**
   (no PR); later runs surface real changes.
2. **Draft** — sends only the changed diffs + the current entry to the headless
   `claude` CLI, which returns a field-level patch. A deterministic applier
   splices in only whitelisted fields.
3. **Verify** — runs `npm run typecheck`. A red typecheck never produces a PR.
4. **Screenshots** — re-captures the live public sites (planroute.app,
   happyhoppersrentals.com) with headless Chrome → WebP. Private/local apps are
   skipped and noted.
5. **PR** — commits the edits to a fresh `updater/portfolio-*` branch and opens a
   **draft** PR. You review, un-draft, merge, then `npm run updater:deploy`.

## What it will and won't touch

- **May edit:** `tagline`, `description`, `longDescription`, `role`, `year`,
  `location`, `tech`, `highlights`, and (with scrutiny) `status`, `links.live`.
- **Never touches:** `slug`, `order`, `featured`, `colorTheme`, `title`,
  `category`, `media` (except an intentional screenshot flip), and it never adds
  `links.github` (private repos stay private).

## Setup

- **GitHub CLI** (`gh`) authenticated — already are (`phoenix-lotus`, `repo` scope).
- **Netlify CLI** linked — already is (only needed for `updater:deploy`).
- **Claude CLI** for auto-drafting: `npm i -g @anthropic-ai/claude-code`, then run
  it once to authenticate (uses your subscription — no API key). Without it, the
  bot still runs in notify-only mode and opens an issue with the diffs.
- **Chrome** for screenshots at the default macOS path, or set `CHROME_BIN`.

## Notes / caveats

- `fancys-studio` has **no git remote**, so it's watched via local file hashes at
  `/Users/robertgoldberg/Code/Fancy`. Give it a remote to make it robust and
  screenshot-able.
- The snapshot advances only after a PR/issue is opened (or a clean no-op run),
  so a failed run re-detects next time. Use `--rescan` to force a full re-draft.
- New-project drafts are capped at 3 per run (the rest are deferred and logged).
