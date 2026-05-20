// One-off: re-extract a few coords from PR #121 that the bulk capture
// script's selectors didn't catch — specifically the Reviewers sidebar
// section and the "review requested" banner. Merges them into
// planning/assets/captures/pr-overview.coords.json.

import { chromium } from 'playwright';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const AUTH_FILE = resolve(process.cwd(), '.playwright-auth', 'github.json');
const COORDS_FILE = resolve(process.cwd(), 'planning', 'assets', 'captures', 'pr-overview.coords.json');

if (!existsSync(AUTH_FILE)) {
  console.error('Missing auth file.'); process.exit(1);
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ storageState: AUTH_FILE, viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
await page.goto('https://github.com/USACE-RMC/RMC-Software-Documentation/pull/121', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2000);

const more = await page.evaluate(() => {
  const r = (el) => {
    if (!el) return null;
    const b = el.getBoundingClientRect();
    return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) };
  };

  // Reviewers sidebar: find the heading text "Reviewers", climb to the
  // enclosing section that includes the user list.
  let reviewersSection = null;
  for (const el of document.querySelectorAll('h2, h3, div, span')) {
    const t = (el.innerText || '').trim();
    if (t === 'Reviewers' || /^Reviewers\s/.test(t)) {
      let p = el;
      while (p && p.parentElement) {
        const pr = p.getBoundingClientRect();
        if (pr.height > 40 && pr.height < 200 && pr.width > 200 && pr.width < 400) {
          reviewersSection = p;
          break;
        }
        p = p.parentElement;
      }
      if (reviewersSection) break;
    }
  }

  // Banner at the top of the page that says "X requested your review"
  let reviewRequestedBanner = null;
  for (const el of document.querySelectorAll('div, section, p')) {
    if (/requested your review/i.test(el.innerText || '') && el.getBoundingClientRect().height < 80) {
      reviewRequestedBanner = el;
      break;
    }
  }

  // "Open" pill near the title
  const openPill = Array.from(document.querySelectorAll('span')).find((e) => /^Open$/.test((e.innerText || '').trim()));

  // Branch info row (the "wants to merge X commits into main from <branch>" line)
  const branchLine = Array.from(document.querySelectorAll('div, p')).find((e) =>
    /wants to merge \d+ commit/.test(e.innerText || ''),
  );

  return {
    reviewersSidebar: r(reviewersSection),
    reviewRequestedBanner: r(reviewRequestedBanner),
    openPill: r(openPill),
    branchLine: r(branchLine),
    pageHeight: document.documentElement.scrollHeight,
  };
});

console.log(JSON.stringify(more, null, 2));

// Merge into the existing coords file
const existing = JSON.parse(readFileSync(COORDS_FILE, 'utf8'));
existing.elements = { ...existing.elements, ...more };
writeFileSync(COORDS_FILE, JSON.stringify(existing, null, 2));
console.log(`\nMerged into ${COORDS_FILE}`);

await browser.close();
