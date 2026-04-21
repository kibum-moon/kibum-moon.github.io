import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import crypto from 'node:crypto';

const repoRoot = process.cwd();
const sourceRepoRoot = path.resolve(process.env.SOURCE_REPO_ROOT ?? repoRoot);
const publishRepoRoot = path.resolve(process.env.PUBLISH_REPO_ROOT ?? repoRoot);
const args = new Set(process.argv.slice(2));
const watchMode = args.has('--watch');
const dryRun = args.has('--dry-run');
const pollIntervalMs = 2000;

const sourcePdfRelativePath = 'kibum_moon_cv.pdf';
const publishRootPdf = 'kibum_moon_cv.pdf';
const legacyCleanupTargets = ['cv.pdf', 'public/cv.pdf'];
const contentCandidates = ['src/content/siteContent.ts', 'constants.tsx'];
const homepageCandidates = ['src/pages/HomePage.tsx', 'components/HomeEditorial.tsx'];
const publishTargets = [
  publishRootPdf,
  'public/kibum_moon_cv.pdf',
  ...contentCandidates,
  ...homepageCandidates,
  ...legacyCleanupTargets,
];
const sparsePublishTargets = publishTargets.map((relativePath) => `/${relativePath}`);

const run = (command, commandArgs, options = {}) => {
  const cwd = options.cwd ?? publishRepoRoot;

  const result = spawnSync(command, commandArgs, {
    cwd,
    encoding: 'utf8',
    stdio: options.stdio ?? 'pipe',
  });

  if (result.status !== 0) {
    const stderr = result.stderr?.trim();
    const stdout = result.stdout?.trim();
    const details = stderr || stdout || `Command failed: ${command} ${commandArgs.join(' ')}`;
    throw new Error(details);
  }

  return result.stdout?.trim() ?? '';
};

const listPaths = (command, commandArgs) => {
  const output = run(command, commandArgs);
  if (!output) {
    return [];
  }

  return output
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
};

const getCurrentBranch = () => run('git', ['rev-parse', '--abbrev-ref', 'HEAD']);

const getSourceFingerprint = () => {
  const absolutePath = path.join(sourceRepoRoot, sourcePdfRelativePath);
  if (!fs.existsSync(absolutePath)) {
    return 'missing';
  }

  const stats = fs.statSync(absolutePath);
  return `${sourcePdfRelativePath}:${stats.mtimeMs}:${stats.size}`;
};

const ensurePublishRepoExists = () => {
  if (!fs.existsSync(path.join(publishRepoRoot, '.git'))) {
    throw new Error(`Publish repo not found at ${publishRepoRoot}`);
  }
};

const resolveExistingPublishPath = (candidatePaths) =>
  candidatePaths.find((relativePath) => fs.existsSync(path.join(publishRepoRoot, relativePath))) ?? null;

const pathExistsOrIsTracked = (relativePath) => {
  if (fs.existsSync(path.join(publishRepoRoot, relativePath))) {
    return true;
  }

  const result = spawnSync('git', ['ls-files', '--error-unmatch', '--', relativePath], {
    cwd: publishRepoRoot,
    stdio: 'ignore',
  });

  return result.status === 0;
};

const formatCvUpdatedDate = (sourceAbsolutePath) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'America/New_York',
  }).format(fs.statSync(sourceAbsolutePath).mtime);

const resetPublishRepoWorkingTree = () => {
  run('git', ['reset', '--hard', 'HEAD'], { stdio: 'inherit' });
  run('git', ['clean', '-fd'], { stdio: 'inherit' });
};

const hashFile = (absolutePath) =>
  crypto.createHash('sha256').update(fs.readFileSync(absolutePath)).digest('hex');

const fileMatchesSource = (sourceAbsolutePath, publishRelativePath) => {
  const publishAbsolutePath = path.join(publishRepoRoot, publishRelativePath);
  if (!fs.existsSync(publishAbsolutePath)) {
    return false;
  }

  return hashFile(sourceAbsolutePath) === hashFile(publishAbsolutePath);
};

const ensureParentDirectory = (filePath) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
};

const syncSourceIntoPublishClone = (sourceAbsolutePath) => {
  for (const publishRelativePath of [publishRootPdf, 'public/kibum_moon_cv.pdf']) {
    const publishAbsolutePath = path.join(publishRepoRoot, publishRelativePath);
    ensureParentDirectory(publishAbsolutePath);
    fs.copyFileSync(sourceAbsolutePath, publishAbsolutePath);
  }

  for (const legacyRelativePath of legacyCleanupTargets) {
    const legacyAbsolutePath = path.join(publishRepoRoot, legacyRelativePath);
    if (fs.existsSync(legacyAbsolutePath)) {
      fs.rmSync(legacyAbsolutePath);
    }
  }
};

const updateContentFile = (sourceAbsolutePath) => {
  const contentRelativePath = resolveExistingPublishPath(contentCandidates);
  if (!contentRelativePath) {
    throw new Error(`Could not find a live content file in ${publishRepoRoot}.`);
  }

  const contentAbsolutePath = path.join(publishRepoRoot, contentRelativePath);
  const currentContent = fs.readFileSync(contentAbsolutePath, 'utf8');
  const nextDate = formatCvUpdatedDate(sourceAbsolutePath);

  let nextContent = currentContent.replace(/lastUpdated:\s*"[^"]*"/, `lastUpdated: "${nextDate}"`);

  nextContent = nextContent.replace(/cvUrl:\s*"[^"]*"/, 'cvUrl: "/kibum_moon_cv.pdf"');

  if (nextContent !== currentContent) {
    fs.writeFileSync(contentAbsolutePath, nextContent);
  }

  return contentRelativePath;
};

const injectVisibleCvUpdatedLine = (currentContent) => {
  if (currentContent.includes('CV updated {PROFILE_DATA.lastUpdated}')) {
    return currentContent;
  }

  return currentContent.replace(
    `                Download CV →\n              </a>`,
    `                Download CV →\n              </a>\n              <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[#7e776b]">\n                CV updated {PROFILE_DATA.lastUpdated}\n              </p>`,
  );
};

const ensureHomepageDisplaysCvUpdated = () => {
  const homepageRelativePath = resolveExistingPublishPath(homepageCandidates);
  if (!homepageRelativePath) {
    throw new Error(`Could not find a live homepage component in ${publishRepoRoot}.`);
  }

  const homepageAbsolutePath = path.join(publishRepoRoot, homepageRelativePath);
  const currentContent = fs.readFileSync(homepageAbsolutePath, 'utf8');
  const nextContent = injectVisibleCvUpdatedLine(currentContent);

  if (nextContent !== currentContent) {
    fs.writeFileSync(homepageAbsolutePath, nextContent);
  }

  return homepageRelativePath;
};

const refreshPublishClone = () => {
  run('git', ['sparse-checkout', 'init', '--no-cone'], { stdio: 'inherit' });
  run('git', ['sparse-checkout', 'set', '--no-cone', ...sparsePublishTargets], { stdio: 'inherit' });

  const currentBranch = getCurrentBranch();
  if (currentBranch !== 'main') {
    run('git', ['checkout', 'main'], { stdio: 'inherit' });
  }

  run('git', ['fetch', 'origin', 'main'], { stdio: 'inherit' });
  run('git', ['reset', '--hard', 'origin/main'], { stdio: 'inherit' });
};

const publishOnce = () => {
  if (!fs.existsSync(path.join(sourceRepoRoot, sourcePdfRelativePath))) {
    throw new Error(`No source CV PDF found in ${sourceRepoRoot}. Expected kibum_moon_cv.pdf.`);
  }

  const sourceAbsolutePath = path.join(sourceRepoRoot, sourcePdfRelativePath);

  ensurePublishRepoExists();
  resetPublishRepoWorkingTree();
  refreshPublishClone();

  const changedPaths = [publishRootPdf, 'public/kibum_moon_cv.pdf'].filter(
    (publishRelativePath) => !fileMatchesSource(sourceAbsolutePath, publishRelativePath),
  );

  for (const legacyRelativePath of legacyCleanupTargets) {
    if (fs.existsSync(path.join(publishRepoRoot, legacyRelativePath))) {
      changedPaths.push(legacyRelativePath);
    }
  }

  const contentRelativePath = resolveExistingPublishPath(contentCandidates);
  if (contentRelativePath) {
    const currentContent = fs.readFileSync(path.join(publishRepoRoot, contentRelativePath), 'utf8');
    const nextDate = formatCvUpdatedDate(sourceAbsolutePath);
    const nextContent = currentContent
      .replace(/lastUpdated:\s*"[^"]*"/, `lastUpdated: "${nextDate}"`)
      .replace(/cvUrl:\s*"[^"]*"/, 'cvUrl: "/kibum_moon_cv.pdf"');

    if (nextContent !== currentContent) {
      changedPaths.push(contentRelativePath);
    }
  }

  const homepageRelativePath = resolveExistingPublishPath(homepageCandidates);
  if (homepageRelativePath) {
    const currentHomepage = fs.readFileSync(path.join(publishRepoRoot, homepageRelativePath), 'utf8');
    if (injectVisibleCvUpdatedLine(currentHomepage) !== currentHomepage) {
      changedPaths.push(homepageRelativePath);
    }
  }

  const uniqueChangedPaths = [...new Set(changedPaths)];

  if (uniqueChangedPaths.length === 0) {
    console.log(`No CV changes to publish for ${sourcePdfRelativePath}.`);
    return;
  }

  if (dryRun) {
    console.log('Dry run: would publish these files:');
    for (const relativePath of uniqueChangedPaths) {
      console.log(`- ${relativePath}`);
    }
    return;
  }

  syncSourceIntoPublishClone(sourceAbsolutePath);
  const updatedContentPath = updateContentFile(sourceAbsolutePath);
  const updatedHomepagePath = ensureHomepageDisplaysCvUpdated();

  const stagePaths = [...new Set([publishRootPdf, 'public/kibum_moon_cv.pdf', updatedContentPath, updatedHomepagePath, ...legacyCleanupTargets])]
    .filter(pathExistsOrIsTracked);
  run('git', ['add', '-A', '--', ...stagePaths], { stdio: 'inherit' });

  const commitMessage = `chore(cv): sync ${path.basename(sourcePdfRelativePath)}`;
  run('git', ['commit', '-m', commitMessage], { stdio: 'inherit' });
  run('git', ['push', 'origin', 'main'], { stdio: 'inherit' });

  console.log(`Published ${sourcePdfRelativePath} from ${sourceRepoRoot} using publish clone ${publishRepoRoot}.`);
};

if (!watchMode) {
  publishOnce();
  process.exit(0);
}

console.log('Watching for CV PDF changes...');
console.log('Source file: kibum_moon_cv.pdf');
console.log('The watcher publishes only the canonical CV PDF and matching homepage content changes.');

let lastFingerprint = getSourceFingerprint();
let running = false;

setInterval(() => {
  const nextFingerprint = getSourceFingerprint();
  if (nextFingerprint === lastFingerprint || running) {
    return;
  }

  lastFingerprint = nextFingerprint;
  running = true;

  try {
    publishOnce();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
  } finally {
    running = false;
  }
}, pollIntervalMs);
