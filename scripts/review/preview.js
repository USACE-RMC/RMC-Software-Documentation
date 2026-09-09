'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { GitHub, Store } = require('./github');
const { Controller, shouldRetainPreview } = require('./controller');
const { latestBuilds, artifactFor } = require('./builds');
function validateArtifact(directory) {
  const root = path.resolve(directory);
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (fs.lstatSync(full).isSymbolicLink() || entry.name === '.git' || entry.name === '.github') throw Error('Unsafe preview artifact path');
      if (entry.isDirectory()) walk(full);
    }
  }
  walk(root);
  if (!fs.existsSync(path.join(root, 'index.html'))) throw Error('Preview artifact has no index.html');
}
async function select(api, store, event) {
  // Reconcile all latest successful runs as well as this event. GitHub may coalesce
  // pending concurrency runs, so an individual webhook is not the source of truth.
  for (const build of await latestBuilds(api)) {
    const { number: n, sha, run } = build;
    const state = store.data.prs[n];
    if (!state) continue; // controller initializes only legitimate PRs
    if (state.preview?.sha === sha && !state.preview.stale) continue;
    if (state.cancelled) continue;
    const pr = await api.request('GET', `${api.root}/pulls/${n}`);
    if (pr.state !== 'open' || pr.head.sha !== sha) continue;
    const a = await artifactFor(api, build);
    if (!a) continue;
    if (state.failedPreview === `${run.id}:${a.id}`) continue;
    return { number: n, sha, run: run.id, artifact: a.id };
  }
  return null;
}
async function record(api, store, number, sha, result, run, artifact) {
  if (!number) return;
  const state = store.data.prs[number];
  if (!state) return;
  const pr = await api.request('GET', `${api.root}/pulls/${number}`);
  if (pr.head.sha !== sha || state.cancelled) return;
  if (result === 'success') {
    state.preview = { sha, url: `https://usace-rmc.github.io/RMC-Software-Documentation-Previews/pr-${number}/`, stale: false };
    state.previewReady = true;
    delete state.failedPreview;
  } else {
    state.failedPreview = `${run}:${artifact}`;
    if (state.preview) state.preview.stale = true;
  }
  await store.save();
  await new Controller(api, store).reconcile();
  // A concurrency group can coalesce events. Drain remaining successful builds
  // through a fresh dispatch rather than relying on another author action.
  if (await select(api, store, {})) await api.request('POST', `${api.root}/actions/workflows/pr-preview.yml/dispatches`, { ref: 'main' });
}
async function cleanupList(api, store) {
  const numbers = [];
  for (const state of Object.values(store.data.prs)) {
    const pr = await api.request('GET', `${api.root}/pulls/${state.number}`);
    const session = store.data.sessions[state.session];
    if (state.kind === 'director' ? !shouldRetainPreview(state, session) : pr.state === 'closed') numbers.push(state.number);
  }
  return numbers;
}
function forgetPreviews(store, numbers) {
  for (const number of numbers) {
    const state = store.data.prs[number];
    if (!state) continue;
    delete state.preview;
    delete state.failedPreview;
    state.previewReady = false;
  }
}
function cleanup(directory, numbers) {
  const root = path.resolve(directory);
  for (const number of numbers) {
    if (!Number.isSafeInteger(number) || number < 1) throw Error('Invalid preview number');
    const target = path.resolve(root, `pr-${number}`);
    if (path.dirname(target) !== root) throw Error('Unsafe cleanup target');
    fs.rmSync(target, { recursive: true, force: true });
  }
  const git = (...args) => execFileSync('git', args, { cwd: root, stdio: 'pipe' }).toString();
  git('add', '--all');
  if (!git('diff', '--cached', '--name-only').trim()) return;
  git(
    '-c',
    'user.name=github-actions[bot]',
    '-c',
    'user.email=41898282+github-actions[bot]@users.noreply.github.com',
    'commit',
    '-m',
    'Clean up completed review previews',
  );
  // Publishing can advance gh-pages while cleanup runs; replay only our deletions.
  git('pull', '--rebase');
  git('push');
}
async function main() {
  const mode = process.argv[2];
  if (mode === 'validate') return validateArtifact(process.argv[3]);
  if (mode === 'cleanup') return cleanup(process.argv[3], JSON.parse(fs.readFileSync('preview-cleanup.json', 'utf8')));
  const api = new GitHub({ token: process.env.REVIEW_TOKEN || process.env.GITHUB_TOKEN, repository: process.env.GITHUB_REPOSITORY }),
    store = new Store(api);
  await store.read();
  if (mode === 'cleanup-record') {
    forgetPreviews(store, JSON.parse(fs.readFileSync('preview-cleanup.json', 'utf8')));
    await store.save();
    await new Controller(api, store).reconcile();
    if (await select(api, store, {})) await api.request('POST', `${api.root}/actions/workflows/pr-preview.yml/dispatches`, { ref: 'main' });
    return;
  }
  if (mode === 'cleanup-list') {
    fs.writeFileSync('preview-cleanup.json', JSON.stringify(await cleanupList(api, store)));
    return;
  }
  if (mode === 'record')
    return record(
      api,
      store,
      Number(process.env.PREVIEW_NUMBER),
      process.env.PREVIEW_SHA,
      process.env.PREVIEW_RESULT,
      process.env.PREVIEW_RUN,
      process.env.PREVIEW_ARTIFACT,
    );
  if (mode === 'select') {
    const chosen = await select(api, store, {});
    if (chosen) for (const [key, value] of Object.entries(chosen)) fs.appendFileSync(process.env.GITHUB_OUTPUT, `${key}=${value}\n`);
    return;
  }
  throw Error('Unknown preview operation');
}
if (require.main === module)
  main().catch((e) => {
    console.error(e.message);
    process.exitCode = 1;
  });
module.exports = { validateArtifact, select, record, cleanupList, cleanup, forgetPreviews };
