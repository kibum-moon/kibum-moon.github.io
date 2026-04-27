# Content Guide

## Primary Editing Surface

Edit [src/content/siteContent.ts](/Users/kibummoon/Library/CloudStorage/GoogleDrive-km1735@georgetown.edu/My%20Drive/homepage/src/content/siteContent.ts) for:

- profile metadata
- social links
- research interests
- publications
- teaching entries
- experience and awards

## Assets

- Publication cover images live in `public/covers/`.
- Use `imageKind: "figure"` on a publication only when the image is a figure or chart that should render in a wider frame. Leave it unset for normal paper covers.
- The editable CV source lives at `kibum_moon_cv.pdf` in the repo root.
- The generated homepage CV PDF lives at `public/kibum_moon_cv.pdf`.
- The profile photo URL is defined in `src/content/assets.ts`.

## Editing Principle

Prefer changing structured content in one canonical file rather than scattering small constants across page components.
