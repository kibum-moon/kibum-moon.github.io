import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const sourcePdfPath = path.join(repoRoot, 'kibum_moon_cv.pdf');
const publicPrimaryPdfPath = path.join(repoRoot, 'public', 'kibum_moon_cv.pdf');
const legacyPublicAliasPath = path.join(repoRoot, 'public', 'cv.pdf');

const ensureParentDirectory = (filePath) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
};

const copyPdfToPublicTargets = (sourcePdfPath) => {
  ensureParentDirectory(publicPrimaryPdfPath);
  fs.copyFileSync(sourcePdfPath, publicPrimaryPdfPath);
  if (fs.existsSync(legacyPublicAliasPath)) {
    fs.rmSync(legacyPublicAliasPath);
  }
};

if (!fs.existsSync(sourcePdfPath)) {
  console.log('No root-level CV PDF found. Expected kibum_moon_cv.pdf.');
  process.exit(0);
}

copyPdfToPublicTargets(sourcePdfPath);
console.log('Synced kibum_moon_cv.pdf to public/kibum_moon_cv.pdf.');
