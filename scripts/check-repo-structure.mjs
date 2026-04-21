import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();

const requiredPaths = [
  'AGENTS.md',
  'docs/README.md',
  'docs/ARCHITECTURE.md',
  'docs/CONTENT.md',
  'docs/OPERATIONS.md',
  'docs/PLANS.md',
  'src/app/App.tsx',
  'src/main.tsx',
  'src/pages/HomePage.tsx',
  'src/content/siteContent.ts',
  'src/content/assets.ts',
  'src/types/content.ts',
];

const forbiddenPaths = [
  'App.tsx',
  'index.tsx',
  'constants.tsx',
  'types.ts',
  'components/HomeEditorial.tsx',
];

const missing = requiredPaths.filter((relativePath) => !fs.existsSync(path.join(repoRoot, relativePath)));
const unexpectedLegacyRoots = forbiddenPaths.filter((relativePath) => fs.existsSync(path.join(repoRoot, relativePath)));

if (missing.length > 0 || unexpectedLegacyRoots.length > 0) {
  if (missing.length > 0) {
    console.error('Missing required paths:');
    for (const relativePath of missing) {
      console.error(`- ${relativePath}`);
    }
  }

  if (unexpectedLegacyRoots.length > 0) {
    console.error('Found legacy root-level source paths that should have been moved:');
    for (const relativePath of unexpectedLegacyRoots) {
      console.error(`- ${relativePath}`);
    }
  }

  process.exit(1);
}

console.log('Repository structure check passed.');
