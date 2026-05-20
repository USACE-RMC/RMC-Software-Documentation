// Interactive one-time GitHub login for the reviewer-workflow capture pipeline.
//
// What this does:
//   Launches your real Chrome as a plain subprocess with a remote-debugging
//   port and a dedicated user-data directory. Playwright then attaches over
//   the DevTools Protocol — it never invokes Chrome through its own launcher,
//   so the browser carries none of the automation fingerprints (navigator
//   .webdriver, --enable-automation flag, etc.) that GitHub blocks with
//   "this browser or app may not be secure."
//
//   You sign in to GitHub interactively in that Chrome window. When you press
//   Enter back in this terminal, the script saves cookies + localStorage to
//   .playwright-auth/github.json and exits. The user-data directory at
//   .playwright-auth/chrome-profile/ persists, so a follow-up sign-in (after
//   the session expires) won't re-trigger GitHub's "new device" verification.
//
// What other capture scripts will do:
//   Load github.json via storageState when launching a Playwright context, so
//   subsequent captures run logged-in without re-authenticating. The saved
//   state typically lasts weeks before GitHub expires the session.
//
// Hygiene reminder:
//   The cookies in .playwright-auth/github.json are valid GitHub credentials.
//   The folder is gitignored — do not commit it, share it, or open this
//   project on a machine you don't control. Re-run this script to refresh
//   the session if a capture script ever redirects to the login page.
//
// One-time install (only the first time you run this on a machine):
//   npm install --prefix scripts/capture
//   (No browser binary download needed — this script uses your real Chrome.)
//
// Run:
//   node scripts/capture/login.mjs

import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const AUTH_DIR = resolve(process.cwd(), '.playwright-auth');
const AUTH_FILE = resolve(AUTH_DIR, 'github.json');
const USER_DATA_DIR = resolve(AUTH_DIR, 'browser-profile');
const PORT = 9222;

mkdirSync(AUTH_DIR, { recursive: true });
mkdirSync(USER_DATA_DIR, { recursive: true });

// Edge first by default — it's Chromium-based (same CDP-attach trick works)
// and pre-installed on every Windows machine, so the user doesn't need a
// separate browser install. Chrome is still respected if BROWSER_PATH is set.
const BROWSER_CANDIDATES = [
  process.env.BROWSER_PATH,
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  process.env.LOCALAPPDATA && `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
].filter(Boolean);

const browserPath = BROWSER_CANDIDATES.find(existsSync);
if (!browserPath) {
  console.error('Could not find Edge or Chrome. Set BROWSER_PATH env var to your browser executable.');
  process.exit(1);
}

console.log(`Launching ${browserPath}`);
console.log(`User data dir: ${USER_DATA_DIR}`);
console.log(`Debug port:    ${PORT}\n`);

const child = spawn(
  browserPath,
  [
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${USER_DATA_DIR}`,
    '--no-first-run',
    '--no-default-browser-check',
    'https://github.com/login',
  ],
  { detached: false, stdio: 'ignore' },
);

let browser;
const deadline = Date.now() + 15_000;
while (Date.now() < deadline) {
  try {
    browser = await chromium.connectOverCDP(`http://localhost:${PORT}`);
    break;
  } catch {
    await new Promise((r) => setTimeout(r, 500));
  }
}
if (!browser) {
  console.error(`Could not connect to Chrome on port ${PORT} within 15s.`);
  child.kill();
  process.exit(1);
}

const context = browser.contexts()[0];
if (!context) {
  console.error('No default browser context available after connect.');
  child.kill();
  process.exit(1);
}

console.log('Connected. Sign in to GitHub in the Chrome window.');
console.log('When you see your GitHub dashboard, press Enter back in this terminal.');

await new Promise((r) => {
  process.stdin.resume();
  process.stdin.once('data', () => r());
});

const page = context.pages().find((p) => p.url().includes('github.com')) || context.pages()[0];
const url = page ? page.url() : '';
if (!url.startsWith('https://github.com/') || url.includes('/login')) {
  console.error(`\nActive page is ${url}. You do not appear to be logged in. Session not saved.`);
  await browser.close();
  child.kill();
  process.exit(1);
}

await context.storageState({ path: AUTH_FILE });
console.log(`\nSaved session to ${AUTH_FILE}`);
console.log(`Chrome profile persisted at ${USER_DATA_DIR} (re-used on next run).`);

await browser.close();
child.kill();
process.exit(0);
