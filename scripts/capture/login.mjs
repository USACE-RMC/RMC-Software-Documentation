// Interactive one-time GitHub login for the reviewer-workflow capture pipeline.
//
// What this does:
//   Opens a real (non-headless) Chromium window, navigates to github.com/login,
//   and waits for you to sign in interactively (username, password, and 2FA).
//   Once you reach github.com while logged in, it saves your browser session
//   (cookies + localStorage) to .playwright-auth/github.json and exits.
//
// What other capture scripts will do:
//   Load that JSON file via storageState when launching a Playwright context,
//   so subsequent captures run logged-in without re-authenticating. The saved
//   state typically lasts weeks before GitHub expires the session.
//
// Hygiene reminder:
//   This script writes cookies for *your* GitHub account to .playwright-auth/,
//   which is gitignored. Do not commit the auth folder, share it, or open this
//   project on a machine you don't control. Re-run this script to refresh the
//   session.
//
// One-time install (only the first time you run this on a machine):
//   npm exec --yes playwright install chromium
//   npx playwright --version    # confirms Playwright is reachable via npx
//
// Run:
//   node scripts/capture/login.mjs

import { chromium } from 'playwright';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const AUTH_DIR = resolve(process.cwd(), '.playwright-auth');
const AUTH_FILE = resolve(AUTH_DIR, 'github.json');

if (!existsSync(AUTH_DIR)) {
  mkdirSync(AUTH_DIR, { recursive: true });
}

console.log('Opening a Chromium window. Sign in to GitHub interactively.');
console.log('When you see your GitHub dashboard, press Enter in this terminal to save the session.');

const browser = await chromium.launch({ headless: false });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
await page.goto('https://github.com/login');

await new Promise((resolveWait) => {
  process.stdin.resume();
  process.stdin.once('data', () => resolveWait());
});

const url = page.url();
if (!url.startsWith('https://github.com/') || url.includes('/login')) {
  console.error(`\nCurrent page is ${url}. You do not appear to be logged in. Session not saved.`);
  await browser.close();
  process.exit(1);
}

await context.storageState({ path: AUTH_FILE });
console.log(`\nSaved session to ${AUTH_FILE}`);

await browser.close();
process.exit(0);
