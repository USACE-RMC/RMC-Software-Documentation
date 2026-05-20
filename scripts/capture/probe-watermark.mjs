// Find the DRAFT watermark element on the preview page.

import { chromium } from 'playwright';

const TARGET = 'https://usace-rmc.github.io/RMC-Software-Documentation-Previews/pr-121/docs/desktop-applications/rmc-totalrisk/users-guide/v1.1/preface/';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
await page.goto(TARGET, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2500);

const info = await page.evaluate(() => {
  const matches = [];
  for (const el of document.querySelectorAll('*')) {
    const txt = (el.innerText || '').trim();
    if (/DRAFT/i.test(txt) && txt.length < 80) {
      const r = el.getBoundingClientRect();
      matches.push({ tag: el.tagName, text: txt.slice(0, 60), classes: (typeof el.className === 'string' ? el.className.slice(0, 80) : null), rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) } });
    }
  }
  return { pageHeight: document.documentElement.scrollHeight, matches: matches.slice(0, 10) };
});

console.log(JSON.stringify(info, null, 2));
await browser.close();
