// Find a reliable selector + dismiss action for the "Customizable line
// height" announcement popover that GitHub injects on the Files changed
// tab.

import { chromium } from 'playwright';
import { resolve } from 'node:path';

const AUTH_FILE = resolve(process.cwd(), '.playwright-auth', 'github.json');
const browser = await chromium.launch({ headless: false });
const context = await browser.newContext({ storageState: AUTH_FILE, viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
await page.goto('https://github.com/USACE-RMC/RMC-Software-Documentation/pull/121/files', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(3500);

const info = await page.evaluate(() => {
  const found = [];
  // Find any element whose own innerText includes "Customizable line height"
  for (const el of document.querySelectorAll('*')) {
    const txt = (el.innerText || '').trim();
    if (/Customizable line height/.test(txt) && txt.length < 400) {
      const r = el.getBoundingClientRect();
      found.push({
        tag: el.tagName,
        id: el.id || null,
        classes: (el.className && typeof el.className === 'string') ? el.className.slice(0, 100) : null,
        textHead: txt.slice(0, 100),
        rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
        ariaLabel: el.getAttribute('aria-label'),
        role: el.getAttribute('role'),
      });
    }
  }
  // All buttons/links inside the popover region
  const buttonProbe = Array.from(document.querySelectorAll('button, a, [role="button"]'))
    .map((b) => ({ tag: b.tagName, text: (b.innerText || '').trim().slice(0, 40), role: b.getAttribute('role'), classes: (typeof b.className === 'string' ? b.className.slice(0, 60) : null), rect: (() => { const r = b.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; })() }))
    .filter((b) => b.rect.x > 900 && b.rect.y < 600 && b.rect.w > 20);
  return { found: found.slice(0, 12), buttonProbe: buttonProbe.slice(0, 20) };
});

console.log(JSON.stringify(info, null, 2));
await browser.close();
