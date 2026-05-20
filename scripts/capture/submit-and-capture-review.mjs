// Submit a Comment-style review on PR #121 (no Approve, no Request changes
// — won't advance the stage label) and capture the resulting post-submit
// states on the Conversation and Files-changed tabs.
//
// Outputs:
//   planning/assets/captures/conversation-post-submit.png
//   planning/assets/captures/files-changed-post-submit.png
//   planning/assets/captures/post-submit.coords.json
//
// The submitted review is clearly marked as a documentation-screenshot
// artifact in the comment body so future viewers of PR #121 don't
// mistake it for a real review.

import { chromium } from 'playwright';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const AUTH_FILE = resolve(process.cwd(), '.playwright-auth', 'github.json');
const OUT_DIR = resolve(process.cwd(), 'planning', 'assets', 'captures');
const FILES_URL = 'https://github.com/USACE-RMC/RMC-Software-Documentation/pull/121/files';
const PR_URL = 'https://github.com/USACE-RMC/RMC-Software-Documentation/pull/121';

const REVIEW_BODY = '**[Documentation training sandbox]** This review was submitted programmatically by the figure-capture pipeline to produce screenshots for the Reviewer Workflow chapter. It is not a real review of the PR. Ignore.';

if (!existsSync(AUTH_FILE)) { console.error('Missing auth file.'); process.exit(1); }
mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ storageState: AUTH_FILE, viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

console.log(`→ ${FILES_URL}`);
await page.goto(FILES_URL, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2500);
await page.locator('a:has-text("Dismiss"), button:has-text("Dismiss"), button:has-text("Got it")').first().click({ timeout: 1500 }).catch(() => {});
await page.waitForTimeout(500);

// 1. Open the Submit-review dialog
console.log('   opening submit-review dialog...');
await page.locator('button:has-text("Submit review"), button:has-text("Add your review"), button:has-text("Finish your review")').first().click({ timeout: 4000 });
await page.waitForTimeout(1200);

// 2. Fill the comment textarea
console.log('   typing review body...');
const textarea = page.locator('textarea[placeholder*="comment" i], textarea[name*="body" i], textarea').first();
await textarea.fill(REVIEW_BODY, { timeout: 4000 });
await page.waitForTimeout(400);

// 3. Confirm "Comment" radio is selected (it's the default, but be explicit)
const commentRadio = page.locator('input[type="radio"][value="comment" i], input[type="radio"]').first();
const checked = await commentRadio.isChecked().catch(() => true);
if (!checked) await commentRadio.click({ timeout: 2000 }).catch(() => {});

// 4. Click the dialog's Submit button
console.log('   submitting review...');
// The dialog has its own Submit button — find by its position inside the
// overlay rather than the top-right open-dialog button.
await page.locator('div[role="dialog"] button:has-text("Submit review"), .Overlay button:has-text("Submit review")').first().click({ timeout: 5000 }).catch(async () => {
  // Fallback — click any Submit review button visible after dialog open
  await page.locator('button:has-text("Submit review")').last().click({ timeout: 4000 });
});

// Wait for the dialog to close and the page to refresh state
await page.waitForTimeout(4000);
console.log('   review submitted.');

// 5. Capture Files-changed post-submit state (no "Add your review" anymore)
await page.locator('a:has-text("Dismiss"), button:has-text("Dismiss"), button:has-text("Got it")').first().click({ timeout: 1500 }).catch(() => {});
await page.screenshot({ path: resolve(OUT_DIR, 'files-changed-post-submit.png'), fullPage: false });
console.log('   wrote files-changed-post-submit.png');

// 6. Navigate to Conversation tab to see the review timeline entry
console.log(`→ ${PR_URL}`);
await page.goto(PR_URL, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(3000);
await page.locator('a:has-text("Dismiss"), button:has-text("Dismiss"), button:has-text("Got it")').first().click({ timeout: 1500 }).catch(() => {});

// Scroll down to find the new review timeline entry
await page.evaluate(() => {
  const allText = document.body.innerText;
  // Scroll to the bottom so the latest review event is in viewport
  window.scrollTo(0, document.documentElement.scrollHeight);
});
await page.waitForTimeout(800);

await page.screenshot({ path: resolve(OUT_DIR, 'conversation-post-submit.png'), fullPage: true });
console.log('   wrote conversation-post-submit.png (full page)');

// 7. Probe for coords of the new review entry
const coords = await page.evaluate(() => {
  const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: Math.round(b.x + window.scrollX), y: Math.round(b.y + window.scrollY), w: Math.round(b.width), h: Math.round(b.height) }; };
  // Look for "rmctestreviewer reviewed" or "left a review" event in the timeline
  let reviewEvent = null;
  for (const el of document.querySelectorAll('div, li, article')) {
    const t = (el.innerText || '').slice(0, 300);
    if (/rmctestreviewer (left a |reviewed|commented)/i.test(t) && el.getBoundingClientRect().height > 40 && el.getBoundingClientRect().height < 800) {
      reviewEvent = el;
      break;
    }
  }
  // Look for the review summary card with the training-sandbox text
  let reviewCard = null;
  for (const el of document.querySelectorAll('div, article, [data-testid="comment-body"], .js-comment, .timeline-comment')) {
    const t = (el.innerText || '').slice(0, 300);
    if (/Documentation training sandbox/i.test(t)) {
      reviewCard = el;
      break;
    }
  }
  return { reviewEvent: r(reviewEvent), reviewCard: r(reviewCard), pageHeight: document.documentElement.scrollHeight };
});

writeFileSync(resolve(OUT_DIR, 'post-submit.coords.json'), JSON.stringify({ url: PR_URL, capturedAt: new Date().toISOString(), elements: coords }, null, 2));
console.log(`   coords: ${JSON.stringify(coords)}`);

await browser.close();
console.log('\nDone.');
