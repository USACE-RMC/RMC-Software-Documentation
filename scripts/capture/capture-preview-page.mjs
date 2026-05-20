// Capture the PR #121 preview site, showing the DRAFT watermark on the
// new v1.1 of the TotalRisk Users Guide.
//
// Outputs:
//   planning/assets/captures/preview-page.png — TotalRisk Users Guide
//     v1.1 preface page rendered on the PR #121 preview, showing the
//     diagonal DRAFT watermark.
//   planning/assets/captures/preview-page.coords.json — coords for
//     the watermark element and the version-tag breadcrumb.

import { chromium } from 'playwright';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const OUT_DIR = resolve(process.cwd(), 'planning', 'assets', 'captures');
const PREVIEW_BASE = 'https://usace-rmc.github.io/RMC-Software-Documentation-Previews/pr-121';
const TARGET = `${PREVIEW_BASE}/docs/desktop-applications/rmc-totalrisk/users-guide/v1.1/preface/`;

mkdirSync(OUT_DIR, { recursive: true });

// The preview is public, no auth needed.
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
const page = await context.newPage();

console.log(`→ ${TARGET}`);
await page.goto(TARGET, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2500);

// Dismiss cookie banners or similar overlays if present.
await page.locator('button:has-text("Accept"), button:has-text("OK"), button:has-text("Dismiss")').first().click({ timeout: 1500 }).catch(() => {});
await page.waitForTimeout(500);

const png = resolve(OUT_DIR, 'preview-page.png');
await page.screenshot({ path: png, fullPage: false });
console.log(`   wrote ${png}`);

const rect = async (fn) => page.evaluate((s) => {
  // eslint-disable-next-line no-eval
  const el = eval(s)();
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
}, fn.toString());

const coords = {
  // The DRAFT watermark is drawn by src/theme/DocItem/index.js — search
  // for an element that contains literal text "DRAFT" rendered large
  // (height > 100 implies it's the diagonal watermark, not a small label).
  watermark: await rect(() => Array.from(document.querySelectorAll('div, span')).find((e) => /^DRAFT$/.test((e.innerText || '').trim()) && e.getBoundingClientRect().height > 80)),
  // Version selector in the sidebar — confirms the reader is viewing v1.1
  versionSelector: await rect(() => Array.from(document.querySelectorAll('button, a, select, div')).find((e) => /^v1\.1$/.test((e.innerText || '').trim()) && e.getBoundingClientRect().height < 60)),
  pageTitle: await rect(() => document.querySelector('h1')),
};

writeFileSync(
  resolve(OUT_DIR, 'preview-page.coords.json'),
  JSON.stringify({ url: TARGET, viewport: page.viewportSize(), capturedAt: new Date().toISOString(), elements: coords }, null, 2),
);
console.log(`   wrote preview-page.coords.json (${Object.keys(coords).length} elements)`);

await browser.close();
console.log('\nDone.');
