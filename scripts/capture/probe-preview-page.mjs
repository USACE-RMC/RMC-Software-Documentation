// Find coords on the PR #121 preview page for annotation: sidebar nav,
// breadcrumb, preface heading, body content, version indicator (if any).

import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const COORDS_FILE = resolve(process.cwd(), 'planning', 'assets', 'captures', 'preview-page.coords.json');
const TARGET = 'https://usace-rmc.github.io/RMC-Software-Documentation-Previews/pr-121/docs/desktop-applications/rmc-totalrisk/users-guide/v1.1/preface/';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
await page.goto(TARGET, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2500);

const info = await page.evaluate(() => {
  const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) }; };
  // Header nav (USACE site chrome at top)
  const siteHeader = document.querySelector('header, .navbar, nav[role="navigation"]');
  // Sidebar (left rail with section nav)
  const sidebar = document.querySelector('.theme-doc-sidebar-container, aside.theme-doc-sidebar-container, [class*="sidebar"]');
  // Breadcrumb
  const breadcrumb = document.querySelector('nav.theme-doc-breadcrumbs, [class*="breadcrumb"]');
  // Main page heading
  const h1 = document.querySelector('h1');
  // Body content (markdown wrapper)
  const article = document.querySelector('article, main, .theme-doc-markdown, [class*="docItemContainer"]');
  // Footer
  const footer = document.querySelector('footer');
  return {
    siteHeader: r(siteHeader),
    sidebar: r(sidebar),
    breadcrumb: r(breadcrumb),
    h1: r(h1),
    article: r(article),
    footer: r(footer),
    pageHeight: document.documentElement.scrollHeight,
    pageWidth: document.documentElement.scrollWidth,
  };
});

console.log(JSON.stringify(info, null, 2));

const existing = JSON.parse(readFileSync(COORDS_FILE, 'utf8'));
Object.assign(existing.elements, info);
delete existing.elements.pageHeight;
delete existing.elements.pageWidth;
writeFileSync(COORDS_FILE, JSON.stringify(existing, null, 2));
console.log(`merged into ${COORDS_FILE}`);

await browser.close();
