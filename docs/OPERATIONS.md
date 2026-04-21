# Operations

## Local Development

```bash
npm install
npm run cv:sync
npm run cv:publish
npm run dev
```

If `kibum_moon_cv.pdf` exists in the repo root, `npm run build` and `npm run deploy` will refresh the public CV automatically.

To publish CV updates all the way to the live GitHub Pages site:

```bash
npm run cv:publish
```

To keep watching the local PDF and auto-publish on change:

```bash
npm run cv:watch-publish
```

The publisher is intentionally conservative. It only commits the CV PDF files, and it refuses to run if the repository has unrelated local changes.

## macOS launchd

For automatic background triggering on macOS, install:

- `launchd/io.github.kibum-moon.homepage-cv-publish.plist`

That agent watches the root CV PDF paths in the main repo and runs the one-shot publisher against a separate clean clone at:

- `~/Library/Application Support/io.github.kibum-moon.homepage-cv-publish/repo`

## Validation

```bash
npm run build
npm run check
```

`npm run check` is intentionally lightweight: it validates that the site still builds and that the repository structure matches the documented layout.

## Deployment

```bash
npm run deploy
```

GitHub Pages is the deployment target.
