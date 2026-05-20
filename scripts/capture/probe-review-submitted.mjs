// Find specific sub-element coords inside the "review submitted" block
// on the PR #121 Conversation tab.

import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const AUTH_FILE = resolve(process.cwd(), '.playwright-auth', 'github.json');
const COORDS_FILE = resolve(process.cwd(), 'planning', 'assets', 'captures', 'post-submit.coords.json');

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ storageState: AUTH_FILE, viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
await page.goto('https://github.com/USACE-RMC/RMC-Software-Documentation/pull/121', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(3000);
// Scroll to bottom to load the recent review event
await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
await page.waitForTimeout(800);

const info = await page.evaluate(() => {
  const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: Math.round(b.x + window.scrollX), y: Math.round(b.y + window.scrollY), w: Math.round(b.width), h: Math.round(b.height) }; };

  // The exact "rmctestreviewer reviewed now" text
  let reviewedHeader = null;
  for (const el of document.querySelectorAll('a, span, h3, h4, div')) {
    const t = (el.innerText || '').trim();
    if (/^rmctestreviewer reviewed/.test(t) && t.length < 80) {
      reviewedHeader = el;
      break;
    }
  }
  // Climb to the containing row
  let reviewedHeaderRow = reviewedHeader;
  if (reviewedHeader) {
    let p = reviewedHeader;
    for (let i = 0; i < 6 && p.parentElement; i++) {
      const pr = p.getBoundingClientRect();
      if (pr.width > 600 && pr.height < 60) { reviewedHeaderRow = p; break; }
      p = p.parentElement;
    }
  }

  // "View reviewed changes" link
  const viewLink = Array.from(document.querySelectorAll('a, button')).find((e) => /^View reviewed changes$/.test((e.innerText || '').trim()));

  // The blue "left a comment" header strip
  let commentHeader = null;
  for (const el of document.querySelectorAll('div, header, span')) {
    const t = (el.innerText || '').trim();
    if (/^rmctestreviewer left a comment$/.test(t) && t.length < 80) {
      commentHeader = el;
      break;
    }
  }
  // The full review comment card (the bordered box)
  let commentCard = null;
  if (commentHeader) {
    let p = commentHeader;
    for (let i = 0; i < 8 && p.parentElement; i++) {
      const pr = p.getBoundingClientRect();
      if (pr.height > 130 && pr.width > 700 && pr.width < 900) { commentCard = p; break; }
      p = p.parentElement;
    }
  }

  return {
    reviewedHeader: r(reviewedHeader),
    reviewedHeaderRow: r(reviewedHeaderRow),
    viewLink: r(viewLink),
    commentHeader: r(commentHeader),
    commentCard: r(commentCard),
    pageHeight: document.documentElement.scrollHeight,
  };
});

console.log(JSON.stringify(info, null, 2));

const existing = JSON.parse(readFileSync(COORDS_FILE, 'utf8'));
Object.assign(existing.elements, info);
delete existing.elements.pageHeight;
writeFileSync(COORDS_FILE, JSON.stringify(existing, null, 2));

await browser.close();
