// One-shot probe: visit the Files changed tab and dump candidate selectors
// for the commit-range dropdown, file tree, and first file header so the
// bulk capture script's selectors can be tightened.

import { chromium } from 'playwright';
import { resolve } from 'node:path';

const AUTH_FILE = resolve(process.cwd(), '.playwright-auth', 'github.json');
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ storageState: AUTH_FILE, viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
await page.goto('https://github.com/USACE-RMC/RMC-Software-Documentation/pull/121/files', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(3000);
// Match the bulk capture's dismissal behavior so the probe sees the same DOM
await page.locator('a:has-text("Dismiss"), button:has-text("Dismiss"), a:has-text("Got it"), button:has-text("Got it")').first().click({ timeout: 1500 }).catch(() => {});
await page.waitForTimeout(800);

// Dismiss popovers
await page.evaluate(() => {
  const dismiss = Array.from(document.querySelectorAll('button, a')).find((b) => /^(Dismiss|Got it|Close)$/i.test((b.innerText || '').trim()));
  if (dismiss) dismiss.click();
});

const info = await page.evaluate(() => {
  const r = (el) => {
    if (!el) return null;
    const b = el.getBoundingClientRect();
    return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) };
  };

  // Find anything whose visible text starts with "All commits" or matches
  // a commit-count pattern in the top half of the page.
  const candidates = [];
  for (const el of document.querySelectorAll('summary, button, a, span, div')) {
    const txt = (el.innerText || '').trim();
    const rect = el.getBoundingClientRect();
    if (rect.height < 5 || rect.height > 60) continue;
    if (rect.y > 500) continue;
    if (/^All commits/.test(txt) || /^\d+ commits?\b/.test(txt)) {
      candidates.push({ tag: el.tagName, text: txt.slice(0, 60), rect: r(el), classes: el.className.slice(0, 80) });
    }
  }

  // File tree probes
  const fileTreeProbes = [
    'file-tree',
    '.diff-file-tree',
    '[aria-label*="File tree" i]',
    '[aria-label*="File Tree" i]',
    'nav[aria-label*="File"]',
    'div.js-diff-progressive-container ~ *',
  ];
  const treeResults = fileTreeProbes.map((sel) => ({ sel, found: r(document.querySelector(sel)) }));

  // First file header probes
  const firstFileProbes = [
    '.file-header',
    '.file .file-header',
    'div[data-tagsearch-path]',
    '.js-file-header',
    '[data-testid="file-header"]',
    'div.file:first-of-type',
  ];
  const fileResults = firstFileProbes.map((sel) => ({ sel, found: r(document.querySelector(sel)) }));

  return { candidates: candidates.slice(0, 10), treeResults, fileResults };
});

console.log(JSON.stringify(info, null, 2));
await browser.close();
