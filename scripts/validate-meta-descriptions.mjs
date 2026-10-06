/**
 * validate-meta-descriptions.mjs
 * --------------------------------
 * Validates that every meta description across the KAIROTRIX site
 * is between 25 and 160 characters (Bing / Google recommended range).
 *
 * Usage:
 *   node scripts/validate-meta-descriptions.mjs
 *
 * Exit codes:
 *   0 = all descriptions pass
 *   1 = one or more violations found
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const MIN = 25;
const MAX = 160;

// ANSI colours
const GREEN  = '\x1b[32m';
const RED    = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BOLD   = '\x1b[1m';
const RESET  = '\x1b[0m';

function readFile(rel) {
  return readFileSync(resolve(ROOT, rel), 'utf8');
}

function extractTsString(src, key) {
  const pattern = new RegExp(`${key}:\\s*\\r?\\n?\\s*(['"\`])((?:\\\\\\1|.)*?)\\1`, 's');
  const m = src.match(pattern);
  return m ? m[2].replace(/\\(['"\`])/g, '$1').trim() : null;
}

function extractSolutionMetaDescriptions(src) {
  const results = [];
  const metaDescPattern = /metaDescription:\s*\r?\n\s*(['"\`])([\s\S]*?)\1/g;
  let m;
  while ((m = metaDescPattern.exec(src)) !== null) {
    results.push(m[2].trim());
  }
  if (results.length === 0) {
    const execPattern = /executiveSummary:\s*\r?\n\s*(['"\`])([\s\S]*?)\1/g;
    while ((m = execPattern.exec(src)) !== null) {
      results.push(m[2].trim());
    }
  }
  return results;
}

const checks = [];

// 1. Root layout (homepage)
const layoutSrc = readFile('src/app/layout.tsx');
const rootDesc = extractTsString(layoutSrc, 'description');
checks.push({ page: '/ (root layout)', description: rootDesc });

// 2. Static page files
const staticPages = [
  { file: 'src/app/solutions/page.tsx', page: '/solutions' },
  { file: 'src/app/work/page.tsx',      page: '/work' },
  { file: 'src/app/insights/page.tsx',  page: '/insights' },
  { file: 'src/app/contact/page.tsx',   page: '/contact' },
  { file: 'src/app/about/page.tsx',     page: '/about' },
];

for (const { file, page } of staticPages) {
  const src = readFile(file);
  const desc = extractTsString(src, 'description');
  checks.push({ page, description: desc });
}

// 3. Solution detail pages (metaDescription or executiveSummary)
const solutionSlugs = [
  'ai-intelligent-systems',
  'software-product-engineering',
  'automation-digital-operations',
  'digital-transformation',
  'data-business-intelligence',
  'technology-integration',
];
const solutionsSrc = readFile('src/data/solutionsData.ts');
const summaries = extractSolutionMetaDescriptions(solutionsSrc);

summaries.forEach((desc, i) => {
  const slug = solutionSlugs[i] ?? `solution-${i + 1}`;
  checks.push({ page: `/solutions/${slug}`, description: desc });
});

// Output
const COL_PAGE  = 44;
const COL_CHARS = 6;

console.log('');
console.log(`${BOLD}KAIROTRIX — Meta Description Validator${RESET}`);
console.log(`Allowed range: ${MIN}–${MAX} characters\n`);
console.log(`${'Page'.padEnd(COL_PAGE)} ${'Chars'.padStart(COL_CHARS)}  Status`);
console.log('-'.repeat(COL_PAGE + COL_CHARS + 12));

let violations = 0;

for (const { page, description } of checks) {
  if (!description) {
    console.log(`${page.padEnd(COL_PAGE)} ${'N/A'.padStart(COL_CHARS)}  ${YELLOW}MISSING${RESET}`);
    violations++;
    continue;
  }

  const len = description.length;
  const ok  = len >= MIN && len <= MAX;
  if (!ok) violations++;

  const lenStr = ok
    ? `${GREEN}${String(len).padStart(COL_CHARS)}${RESET}`
    : `${RED}${String(len).padStart(COL_CHARS)}${RESET}`;
  const status = ok
    ? `${GREEN}PASS${RESET}`
    : `${RED}FAIL${RESET}`;

  console.log(`${page.padEnd(COL_PAGE)} ${lenStr}  ${status}`);
  if (!ok) {
    console.log(`         ${YELLOW}${description}${RESET}`);
  }
}

console.log('-'.repeat(COL_PAGE + COL_CHARS + 12));

if (violations === 0) {
  console.log(`\n${GREEN}${BOLD}All ${checks.length} descriptions pass.${RESET}\n`);
  process.exit(0);
} else {
  console.log(`\n${RED}${BOLD}${violations} violation(s) found.${RESET}\n`);
  process.exit(1);
}
