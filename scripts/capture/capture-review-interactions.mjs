// Capture GitHub UI interaction states for Section 5/6 of the reviewer-
// workflow chapter:
//
//   composer-blank.png  — Files changed page with a comment composer opened
//                         on a line in 01-preface.mdx (the content commit).
//   composer-suggestion.png — same composer with the ± "suggested change"
//                         button clicked so the suggestion code block is
//                         pre-filled.
//   finish-review.png   — "Submit review" panel with the three options
//                         (Comment, Approve, Request changes) visible.
//
// Each capture saves a PNG and a JSON sidecar of key element coordinates.
// All require the logged-in storageState from scripts/capture/login.mjs.

import { chromium } from 'playwright';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const AUTH_FILE = resolve(process.cwd(), '.playwright-auth', 'github.json');
const OUT_DIR = resolve(process.cwd(), 'planning', 'assets', 'captures');
// Filter the Files changed view to just the content commit's contribution
// (commit 7ae20224d, applied after the scaffolding commit 85e53a4fa). This
// reduces the diff to four files instead of 219.
const FILES_URL = 'https://github.com/USACE-RMC/RMC-Software-Documentation/pull/121/files/85e53a4f..7ae20224';

if (!existsSync(AUTH_FILE)) { console.error('Missing auth file.'); process.exit(1); }
mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ storageState: AUTH_FILE, viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

console.log(`→ ${FILES_URL}`);
await page.goto(FILES_URL, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(3500);

// Dismiss any "what's new" popovers (line height etc.)
for (let i = 0; i < 3; i++) {
  const dismissed = await page.locator('a:has-text("Dismiss"), button:has-text("Dismiss"), a:has-text("Got it"), button:has-text("Got it")').first().click({ timeout: 1500 }).then(() => true).catch(() => false);
  if (dismissed) break;
  await page.waitForTimeout(800);
}

// --- 1. Open a comment composer on a line in 01-preface.mdx ---

// Scroll to the 01-preface file header to bring its diff into view.
const prefaceHeader = page.locator('a, span').filter({ hasText: /01-preface\.mdx$/ }).first();
await prefaceHeader.scrollIntoViewIfNeeded({ timeout: 5000 }).catch(() => {});
await page.waitForTimeout(1500);

// In the preface diff, hover the gutter on an added line. GitHub renders
// per-line "Add line comment" buttons that appear on hover. Find a line
// number cell inside the 01-preface diff and hover its row.
const prefaceFileBox = page.locator('[data-tagsearch-path$="01-preface.mdx"], div').filter({ has: prefaceHeader }).first();
// Best-effort: locate the first add-line-comment trigger inside the preface diff.
const addLineButton = page.locator('button[aria-label*="Add a comment"], button[aria-label*="Add line comment"], button[data-testid*="add-line-comment"]').first();

// GitHub's new diff grid mounts the per-line "Add a comment" button only
// after the user hovers the line. Hover an added line in 01-preface, then
// wait for the dynamically-rendered button.
let opened = false;
try {
  // Pick line 21 — first new line in the preface diff.
  const lineCell = page.locator('td[data-line-number="21"]').first();
  await lineCell.scrollIntoViewIfNeeded({ timeout: 4000 }).catch(() => {});
  await lineCell.hover({ timeout: 4000 });
  await page.waitForTimeout(500);
  const addBtn = page.locator('button[aria-label*="omment" i], button[data-testid*="add-comment"]').first();
  await addBtn.waitFor({ state: 'visible', timeout: 3000 });
  await addBtn.click();
  await page.waitForTimeout(800);
  opened = true;
} catch (e) {
  console.log('   composer-open failed:', e.message.split('\n')[0]);
}
console.log(`   composer opened: ${opened}`);
await page.waitForTimeout(800);

await page.screenshot({ path: resolve(OUT_DIR, 'composer-blank.png'), fullPage: false });
console.log('   wrote composer-blank.png');

// --- 2. Click the ± "suggestion" button in the open composer ---

const suggestionButton = page.locator('button[aria-label*="Insert a suggestion"], button[aria-label*="Suggestion"], button[title*="suggestion" i]').first();
const clickedSuggestion = await suggestionButton.click({ timeout: 4000 }).then(() => true).catch(() => false);
console.log(`   suggestion button clicked: ${clickedSuggestion}`);
await page.waitForTimeout(800);

await page.screenshot({ path: resolve(OUT_DIR, 'composer-suggestion.png'), fullPage: false });
console.log('   wrote composer-suggestion.png');

// --- 3. Open the Finish-your-review / Submit-review dialog ---

// Cancel any open composer first.
await page.locator('button:has-text("Cancel")').first().click({ timeout: 2000 }).catch(() => {});
await page.waitForTimeout(500);

// Scroll to top to find the review submit button.
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);

await page.locator('button:has-text("Submit review"), button:has-text("Add your review"), button:has-text("Finish your review")').first().click({ timeout: 4000 }).catch((e) => console.log('   submit-review click failed:', e.message.split('\n')[0]));
await page.waitForTimeout(1500);

await page.screenshot({ path: resolve(OUT_DIR, 'finish-review.png'), fullPage: false });
console.log('   wrote finish-review.png');

// Coords sidecar for the three captures
const coords = await page.evaluate(() => {
  const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) }; };
  return {
    dialogTitle: r(Array.from(document.querySelectorAll('h2, h3')).find((e) => /Finish your review|Submit your review/i.test((e.innerText || '').trim()))),
    commentRadio: r(Array.from(document.querySelectorAll('label, div')).find((e) => /^Comment\b/.test((e.innerText || '').trim()) && e.getBoundingClientRect().width < 600)),
    approveRadio: r(Array.from(document.querySelectorAll('label, div')).find((e) => /^Approve\b/.test((e.innerText || '').trim()) && e.getBoundingClientRect().width < 600)),
    requestChangesRadio: r(Array.from(document.querySelectorAll('label, div')).find((e) => /^Request changes/.test((e.innerText || '').trim()) && e.getBoundingClientRect().width < 600)),
    submitButton: r(Array.from(document.querySelectorAll('button')).find((b) => /^Submit review$/.test((b.innerText || '').trim()))),
  };
});

writeFileSync(resolve(OUT_DIR, 'finish-review.coords.json'), JSON.stringify({ url: FILES_URL, capturedAt: new Date().toISOString(), elements: coords }, null, 2));

await browser.close();
console.log('\nDone.');
