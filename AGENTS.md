# Repository Guide

This file is the table of contents for the repository, not the full manual.

## Start Here

- Read [README.md](./README.md) for the repo map.
- Read [docs/README.md](./docs/README.md) for the source-of-truth docs.

## Live Code Layout

- `src/app/`: app shell and entry wiring only.
- `src/pages/`: page-level UI composition.
- `src/content/`: editable data and asset references.
- `src/types/`: shared data contracts.
- `public/`: static assets served as-is.

## Working Rules

- Keep editable content in `src/content/siteContent.ts`.
- Keep page composition in `src/pages/`; do not put content constants there.
- Keep the repo root boring: config, docs, scripts, and top-level assets only.
- When structure changes, update the matching docs in `docs/`.
- Prefer deleting dead experiments to leaving alternate implementations mixed into the live path.

## Commands

- `npm run dev`
- `npm run build`
- `npm run check`
- `npm run deploy`
