// Find coords for the three bot comments on PR #121's Conversation tab:
//   - Stage progression / lane info bot ("Lane: minor revision")
//   - Assigned reviewers state bot ("Assigned reviewers for this PR")
//   - Preview deployed bot ("Preview deployed for commit ...")

import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const AUTH_FILE = resolve(process.cwd(), '.playwright-auth', 'github.json');
const COORDS_FILE = resolve(process.cwd(), 'planning', 'assets', 'captures', 'pr-overview.coords.json');

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ storageState: AUTH_FILE, viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
await page.goto('https://github.com/USACE-RMC/RMC-Software-Documentation/pull/121', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2500);

const info = await page.evaluate(() => {
  const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) }; };
  const findContaining = (re) => {
    const candidates = document.querySelectorAll('.js-comment, .timeline-comment, [data-testid="comment-body"]');
    for (const c of candidates) {
      const t = (c.innerText || '').slice(0, 800);
      if (re.test(t)) {
        // Climb to the comment block container (one level up usually)
        let p = c;
        while (p && p.parentElement) {
          const pr = p.getBoundingClientRect();
          if (pr.height >= 80 && pr.width > 600) { return p; }
          p = p.parentElement;
        }
        return c;
      }
    }
    return null;
  };
  return {
    stageProgression: r(findContaining(/Lane: minor revision|Lane: peer review|Lane:/i)),
    assignedReviewers: r(findContaining(/Assigned reviewers for this PR/i)),
    previewDeployed: r(findContaining(/Preview deployed for commit/i)),
    ciBuild: r(findContaining(/CI build (passed|failed) for commit/i)),
    issueTrackerLabels: r(findContaining(/RMC Software Documentation Issue Tracker|labels.*automatically/i)),
    pageHeight: document.documentElement.scrollHeight,
  };
});

console.log(JSON.stringify(info, null, 2));

const existing = JSON.parse(readFileSync(COORDS_FILE, 'utf8'));
Object.assign(existing.elements, info);
delete existing.elements.pageHeight;
writeFileSync(COORDS_FILE, JSON.stringify(existing, null, 2));
console.log(`merged into ${COORDS_FILE}`);

await browser.close();
