# Architecture

This is a small solo-maintained repository, so the goal is not process overhead. The goal is predictable structure.

## Layers

- `src/types/`: shared data contracts. No app wiring or page imports.
- `src/content/`: repository-local source of truth for homepage content and asset references. May import from `src/types/`.
- `src/pages/`: page composition and presentational logic. May import from `src/content/` and `src/types/`.
- `src/app/`: application shell and startup wiring. May import from `src/pages/`.

## Root-Level Rules

- The repo root should contain config, docs, scripts, and top-level assets only.
- New product code should go under `src/`.
- Avoid parallel "current" and "experimental" implementations in the live path. Delete or archive dead variants explicitly.

## Why This Shape

This layout keeps the editable knowledge local to the repo and makes the live path obvious:

`content -> pages -> app`

That is enough structure to keep future changes legible without turning a personal homepage into a framework project.
