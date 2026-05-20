// Find the right element to hover/click to open a comment composer.

import { chromium } from 'playwright';
import { resolve } from 'node:path';

const AUTH_FILE = resolve(process.cwd(), '.playwright-auth', 'github.json');
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ storageState: AUTH_FILE, viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
await page.goto('https://github.com/USACE-RMC/RMC-Software-Documentation/pull/121/files/85e53a4f..7ae20224', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(3000);
await page.locator('a:has-text("Dismiss"), button:has-text("Dismiss"), button:has-text("Got it")').first().click({ timeout: 1500 }).catch(() => {});
await page.waitForTimeout(800);

// Scroll to 01-preface diff
const prefaceHeader = page.locator('a, span').filter({ hasText: /01-preface\.mdx$/ }).first();
await prefaceHeader.scrollIntoViewIfNeeded({ timeout: 5000 }).catch(() => {});
await page.waitForTimeout(1500);

const info = await page.evaluate(() => {
  // Inspect the structure of a diff row in 01-preface
  const fileHeader = Array.from(document.querySelectorAll('a, span')).find((e) => /01-preface\.mdx$/.test((e.innerText || '').trim()));
  if (!fileHeader) return { error: 'no preface header' };
  let container = fileHeader.closest('[data-tagsearch-path], .file, .Diff, div[id^="diff-"]') || fileHeader.parentElement;
  // Climb until we find a container that has multiple rows
  for (let i = 0; i < 12 && container; i++) {
    if (container.querySelectorAll('tr, [role="row"]').length > 3) break;
    container = container.parentElement;
  }
  if (!container) return { error: 'no container' };

  const rows = container.querySelectorAll('tr, [role="row"]');
  const sample = rows[Math.min(3, rows.length - 1)];
  return {
    containerTag: container.tagName,
    containerClasses: (typeof container.className === 'string' ? container.className.slice(0, 100) : null),
    rowCount: rows.length,
    sampleRowHTML: sample ? sample.outerHTML.slice(0, 1200) : null,
    addCommentTriggers: Array.from(container.querySelectorAll('button[aria-label*="omment" i], button[data-testid*="comment" i], button[class*="comment-button" i]')).slice(0, 5).map((b) => ({ tag: b.tagName, aria: b.getAttribute('aria-label'), classes: (typeof b.className === 'string' ? b.className.slice(0, 60) : null) })),
    lineNumCells: Array.from(container.querySelectorAll('td.blob-num, td[data-line-number], [data-testid*="line-number"]')).slice(0, 3).map((td) => ({ tag: td.tagName, classes: (typeof td.className === 'string' ? td.className.slice(0, 80) : null), html: td.outerHTML.slice(0, 200) })),
  };
});

console.log(JSON.stringify(info, null, 2));
await browser.close();
