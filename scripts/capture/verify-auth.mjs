// Sanity check that .playwright-auth/github.json gives a working logged-in
// session. Loads the storage state into a Playwright Chromium context,
// navigates to https://github.com/, and reports which account it's signed
// in as.
//
// Run: node scripts/capture/verify-auth.mjs

import { chromium } from 'playwright';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';

const AUTH_FILE = resolve(process.cwd(), '.playwright-auth', 'github.json');
if (!existsSync(AUTH_FILE)) {
  console.error(`Missing ${AUTH_FILE}. Run scripts/capture/login.mjs first.`);
  process.exit(1);
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ storageState: AUTH_FILE, viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
await page.goto('https://github.com/', { waitUntil: 'domcontentloaded' });

const loggedInMeta = await page.locator('meta[name="user-login"]').getAttribute('content').catch(() => null);
const headerLogin = await page.evaluate(() => {
  const a = document.querySelector('[aria-label^="View profile and more"]');
  return a ? a.getAttribute('aria-label') : null;
});

console.log('meta[name="user-login"] →', loggedInMeta);
console.log('header avatar aria-label →', headerLogin);

await browser.close();

if (loggedInMeta) {
  console.log(`\nLogged in as: ${loggedInMeta}`);
  process.exit(0);
} else {
  console.error('\nNot logged in — storageState did not authenticate. Re-run login.mjs.');
  process.exit(1);
}
