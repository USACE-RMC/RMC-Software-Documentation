// Interactive one-time GitHub login for the reviewer-workflow capture pipeline.
//
// What this does:
//   Opens a real (non-headless) browser window, navigates to github.com/login,
//   and waits for you to sign in interactively (username, password, and 2FA).
//   Once you reach github.com while logged in, it saves your browser session
//   (cookies + localStorage) to .playwright-auth/github.json and exits.
//
// What other capture scripts will do:
//   Load that JSON file via storageState when launching a Playwright context,
//   so subsequent captures run logged-in without re-authenticating. The saved
//   state typically lasts weeks before GitHub expires the session.
//
// Why this script tries real Chrome/Edge before falling back to Playwright's
// bundled Chromium:
//   GitHub blocks the bundled Chromium build with "this browser or app may
//   not be secure" because it carries automation fingerprints (navigator
//   .webdriver, missing extensions, no browsing history, etc.). Using the
//   system's real Chrome or Edge installation through Playwright's channel
//   option avoids the block in nearly all cases. A persistent user-data
//   directory makes the browser look like a returning user, further
//   reducing detection.
//
// Hygiene reminder:
//   This script writes cookies for *your* GitHub account to .playwright-auth/,
//   which is gitignored. Do not commit the auth folder, share it, or open this
//   project on a machine you don't control. Re-run this script to refresh the
//   session.
//
// One-time install (only the first time you run this on a machine):
//   npm install --prefix scripts/capture
//   npx --prefix scripts/capture playwright install chromium
//
// Run:
//   node scripts/capture/login.mjs

import { chromium } from 'playwright';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const AUTH_DIR = resolve(process.cwd(), '.playwright-auth');
const AUTH_FILE = resolve(AUTH_DIR, 'github.json');
const USER_DATA_DIR = resolve(AUTH_DIR, 'browser-profile');

if (!existsSync(AUTH_DIR)) mkdirSync(AUTH_DIR, { recursive: true });
if (!existsSync(USER_DATA_DIR)) mkdirSync(USER_DATA_DIR, { recursive: true });

async function tryChannel(channel) {
  const label = channel || 'bundled Chromium';
  try {
    const ctx = await chromium.launchPersistentContext(USER_DATA_DIR, {
      headless: false,
      ...(channel ? { channel } : {}),
      viewport: { width: 1440, height: 900 },
    });
    console.log(`Launched ${label}.`);
    return ctx;
  } catch (err) {
    console.log(`Could not launch ${label}: ${err.message.split('\n')[0]}`);
    return null;
  }
}

const context = (await tryChannel('chrome')) || (await tryChannel('msedge')) || (await tryChannel(null));
if (!context) {
  console.error('No usable browser channel available. Install Chrome or Edge, or run "npx --prefix scripts/capture playwright install chromium".');
  process.exit(1);
}

const page = context.pages()[0] || (await context.newPage());
await page.goto('https://github.com/login');

console.log('\nSign in to GitHub in the browser window.');
console.log('When you see your GitHub dashboard, press Enter in this terminal to save the session.');

await new Promise((r) => {
  process.stdin.resume();
  process.stdin.once('data', () => r());
});

const url = page.url();
if (!url.startsWith('https://github.com/') || url.includes('/login')) {
  console.error(`\nCurrent page is ${url}. You do not appear to be logged in. Session not saved.`);
  await context.close();
  process.exit(1);
}

await context.storageState({ path: AUTH_FILE });
console.log(`\nSaved session to ${AUTH_FILE}`);
console.log(`Persistent browser profile saved to ${USER_DATA_DIR} (capture scripts can reuse it).`);

await context.close();
process.exit(0);
