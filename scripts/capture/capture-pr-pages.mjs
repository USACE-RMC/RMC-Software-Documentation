// Capture raw PNGs of PR #121 (the reviewer-training sandbox) from the
// reviewer's perspective. Reads the saved storageState from login.mjs and
// drives a headless Playwright Chromium instance through each page.
//
// Outputs:
//   planning/assets/captures/pr-overview.png       — Conversation tab, full page
//   planning/assets/captures/pr-commits.png        — Commits tab, full page
//   planning/assets/captures/pr-files-changed.png  — Files changed tab, full page
//   planning/assets/captures/<name>.coords.json    — bounding boxes of key UI elements
//
// The annotation scripts in scripts/annotate-screenshots/ read both the PNG
// and the coords.json sidecar, so capture and annotation can be re-run
// independently.
//
// Run: node scripts/capture/capture-pr-pages.mjs

import { chromium } from 'playwright';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const AUTH_FILE = resolve(process.cwd(), '.playwright-auth', 'github.json');
const OUT_DIR = resolve(process.cwd(), 'planning', 'assets', 'captures');
const PR_BASE = 'https://github.com/USACE-RMC/RMC-Software-Documentation/pull/121';

if (!existsSync(AUTH_FILE)) {
  console.error(`Missing ${AUTH_FILE}. Run scripts/capture/login.mjs first.`);
  process.exit(1);
}
mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  storageState: AUTH_FILE,
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

// Inject CSS once per page to mute personal-account hygiene risks:
//   - hide the notifications badge (so a "you have 47 new notifications" bell
//     doesn't show up in every figure)
//   - hide any "feedback" toast that might pop up mid-capture
const HYGIENE_CSS = `
  .notification-indicator [data-testid="notification-indicator-modified"],
  .AppHeader-notifications [aria-label*="notifications"] .Octicon-dot,
  span.mail-status.unread {
    display: none !important;
  }
  .Toastify, .js-flash-container, [data-target*="toast"] {
    display: none !important;
  }
`;

async function capture(name, url, locateFn) {
  console.log(`\n→ ${name}`);
  const page = await context.newPage();
  await page.addStyleTag({ content: HYGIENE_CSS }).catch(() => {});
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  // Re-apply hygiene after navigation
  await page.addStyleTag({ content: HYGIENE_CSS }).catch(() => {});
  // Settle: wait for header avatar (indicates logged-in render is complete)
  await page.waitForSelector('img.avatar-user, [data-component="AppHeader"] img', { timeout: 10_000 }).catch(() => {});
  await page.waitForTimeout(800);

  const pngPath = resolve(OUT_DIR, `${name}.png`);
  await page.screenshot({ path: pngPath, fullPage: true });
  console.log(`   wrote ${pngPath}`);

  const coords = await locateFn(page);
  const coordsPath = resolve(OUT_DIR, `${name}.coords.json`);
  writeFileSync(coordsPath, JSON.stringify({ url, viewport: page.viewportSize(), capturedAt: new Date().toISOString(), elements: coords }, null, 2));
  console.log(`   wrote ${coordsPath} (${Object.keys(coords).length} elements)`);

  await page.close();
}

const rect = async (page, fn) => page.evaluate((fnStr) => {
  // eslint-disable-next-line no-eval
  const finder = eval(fnStr);
  const el = finder();
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
}, fn.toString());

await capture('pr-overview', PR_BASE, async (page) => {
  return {
    title: await rect(page, () => document.querySelector('h1 bdi.js-issue-title') || Array.from(document.querySelectorAll('h1')).find((h) => /Sample Document/.test(h.innerText))),
    stateBadge: await rect(page, () => Array.from(document.querySelectorAll('span, div')).find((e) => /^(Open|Merged|Closed|Draft)$/i.test((e.innerText || '').trim()))),
    tabs: await rect(page, () => document.querySelector('[role="tablist"], nav[aria-label="Pull request tabs"], .tabnav-tabs')),
    conversationTab: await rect(page, () => Array.from(document.querySelectorAll('a, [role="tab"]')).find((e) => /Conversation/.test(e.innerText || ''))),
    commitsTab: await rect(page, () => Array.from(document.querySelectorAll('a, [role="tab"]')).find((e) => /^Commits/.test((e.innerText || '').trim()))),
    filesChangedTab: await rect(page, () => Array.from(document.querySelectorAll('a, [role="tab"]')).find((e) => /Files changed/.test(e.innerText || ''))),
    reviewersSidebar: await rect(page, () => {
      const heading = Array.from(document.querySelectorAll('h2, h3, span, div')).find((e) => /^Reviewers$/.test((e.innerText || '').trim()));
      return heading ? heading.closest('.discussion-sidebar-item') || heading.parentElement.parentElement : null;
    }),
    previewDeployedComment: await rect(page, () => Array.from(document.querySelectorAll('.js-comment, .timeline-comment, [data-testid="comment-body"]')).find((e) => /preview deployed/i.test((e.innerText || '').slice(0, 200)))),
    finishYourReviewButton: await rect(page, () => Array.from(document.querySelectorAll('button, a')).find((e) => /Add your review|Finish your review|Submit review/i.test((e.innerText || '').trim()))),
  };
});

await capture('pr-commits', `${PR_BASE}/commits`, async (page) => {
  return {
    tabs: await rect(page, () => document.querySelector('[role="tablist"], nav[aria-label="Pull request tabs"]')),
    commitsTab: await rect(page, () => Array.from(document.querySelectorAll('a, [role="tab"]')).find((e) => /^Commits/.test((e.innerText || '').trim()))),
    scaffoldingCommit: await rect(page, () => Array.from(document.querySelectorAll('a, p, span, li')).find((e) => /Scaffold v1\.1/.test(e.innerText || ''))?.closest('li, .Box-row, [data-testid="commit"]')),
    contentCommit: await rect(page, () => Array.from(document.querySelectorAll('a, p, span, li')).find((e) => /Update preface, installation/.test(e.innerText || ''))?.closest('li, .Box-row, [data-testid="commit"]')),
  };
});

// Use the filtered URL (content commit only) so the captured diff shows
// the four files the reviewer should actually focus on, not the 200+
// scaffolding files. The "All commits" toolbar now reads "Commit 7ae2022".
await capture('pr-files-changed', `${PR_BASE}/files/85e53a4f..7ae20224`, async (page) => {
  // Files changed is heavy — wait extra for the diff to render
  await page.waitForTimeout(2000);

  // Dismiss any "what's new" announcement popovers GitHub injects on first
  // visit (e.g. the "Customizable line height" toast). Try Playwright's
  // locator first — it waits for the element and is reliable, unlike a
  // raw evaluate() with synchronous querySelectorAll. Multiple tries
  // because the popover sometimes appears after a delay.
  for (let i = 0; i < 3; i++) {
    const dismissed = await page
      .locator('a:has-text("Dismiss"), button:has-text("Dismiss"), a:has-text("Got it"), button:has-text("Got it")')
      .first()
      .click({ timeout: 1500 })
      .then(() => true)
      .catch(() => false);
    if (dismissed) {
      console.log('   dismissed an announcement popover');
      break;
    }
    await page.waitForTimeout(800);
  }

  return {
    tabs: await rect(page, () => document.querySelector('[role="tablist"], nav[aria-label="Pull request tabs"]')),
    filesChangedTab: await rect(page, () => Array.from(document.querySelectorAll('a, [role="tab"]')).find((e) => /Files changed/.test(e.innerText || ''))),
    diffSettingsButton: await rect(page, () => document.querySelector('summary[aria-label*="Diff settings"], summary[aria-label*="Diff view"], [aria-label*="Diff settings"]')),
    finishYourReviewButton: await rect(page, () => Array.from(document.querySelectorAll('button, a')).find((e) => /Add your review|Finish your review|Submit review/i.test((e.innerText || '').trim()))),
    firstFileHeader: await rect(page, () => document.querySelector('.file-header, [data-testid="file-header"]')),
    // "All commits ▼" dropdown above the diff — narrows the view to a
    // single commit. Implemented as a Primer button.
    commitRangeDropdown: await rect(page, () => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.find((b) => /^All commits/.test((b.innerText || '').trim()) && b.getBoundingClientRect().height < 50);
    }),
    fileTree: await rect(page, () => document.querySelector('[aria-label*="File tree" i]')),
    firstFileHeader: await rect(page, () => {
      const links = Array.from(document.querySelectorAll('a, span'));
      const fileLink = links.find((a) => /00-document-info\.mdx$/.test((a.innerText || '').trim()) && a.getBoundingClientRect().height < 40);
      return fileLink ? fileLink.closest('header, .file-header, [class*="Header"], .Box-header, div') : null;
    }),
  };
});

await browser.close();
console.log('\nDone.');
