# Kibum Moon Homepage

This repository is intentionally structured for legibility first: the live app lives under `src/`, the editable site data lives in one place, and the repository-level docs explain how to change it without hunting through old experiments.

## Repo Map

- `src/app/`: application shell and entry wiring
- `src/pages/`: rendered page-level React components
- `src/content/`: editable profile, publication, and CV data
- `src/types/`: shared content/data contracts
- `public/`: static assets served directly, including publication cover images
- `docs/`: repository system of record for architecture, content editing, and operations
- `scripts/`: lightweight guardrails and maintenance utilities

## Commands

```bash
npm install
npm run cv:sync
npm run cv:publish
npm run cv:watch-publish
npm run dev
npm run build
npm run check
```

## Editing Content

Most homepage edits happen in [src/content/siteContent.ts](/Users/kibummoon/Library/CloudStorage/GoogleDrive-km1735@georgetown.edu/My%20Drive/homepage/src/content/siteContent.ts). Publication cover images belong in `public/covers/`.

CV workflow:

- Update `kibum_moon_cv.pdf` in the repo root.
- Run `npm run cv:sync`, or just run `npm run build`/`npm run deploy` and let the prebuild hook sync it.
- The homepage serves the generated PDF from `public/kibum_moon_cv.pdf`.
- Run `npm run cv:publish` to sync, commit only the CV PDF files, and push `main`.
- Run `npm run cv:watch-publish` to keep watching the root CV PDF and publish changes automatically.
- For login-time macOS automation, use the checked-in launch agent at `launchd/io.github.kibum-moon.homepage-cv-publish.plist`, which watches this repo but publishes from a separate clean clone.

## Deployment

The site deploys to GitHub Pages with `npm run deploy`.
