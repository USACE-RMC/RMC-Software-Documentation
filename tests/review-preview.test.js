const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { select, validateArtifact, cleanupList, forgetPreviews } = require('../scripts/review/preview');
const { Controller } = require('../scripts/review/controller');
const { identity, synchronizeBuilds } = require('../scripts/review/builds');

const sha = 'a'.repeat(40);
test('preview selection rejects failed builds, obsolete revisions and wrong run identity', async () => {
  const store = { data: { prs: { 1: {}, 2: {}, 3: {} } } };
  const api = {
    root: '/repo',
    async request(method, p) {
      if (p.includes('/workflows/'))
        return {
          workflow_runs: [
            { id: 1, conclusion: 'failure', event: 'pull_request', head_sha: sha },
            { id: 2, conclusion: 'success', event: 'pull_request', head_sha: 'b'.repeat(40) },
            { id: 3, conclusion: 'success', event: 'workflow_dispatch', head_branch: 'untrusted' },
            { id: 4, conclusion: 'success', event: 'pull_request', head_sha: sha, pull_requests: [{ number: 2 }] },
          ],
        };
      if (p.includes('/artifacts')) return { artifacts: [{ id: 42, name: `preview-2-${sha}` }] };
      return { number: 2, state: 'open', head: { sha } };
    },
  };
  assert.deepEqual(await select(api, store, {}), { number: 2, sha, run: 4, artifact: 42 });
  store.data.prs[2].preview = { sha, stale: false };
  assert.equal(await select(api, store, {}), null);
});

test('artifact validation rejects Git metadata and incomplete sites', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'review-preview-'));
  try {
    assert.throws(() => validateArtifact(dir), /index.html/);
    fs.writeFileSync(path.join(dir, 'index.html'), 'site');
    validateArtifact(dir);
    fs.mkdirSync(path.join(dir, '.git'));
    assert.throws(() => validateArtifact(dir), /Unsafe/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('cleanup keeps Director discussion preview until publication or cancellation', async () => {
  const api = {
    root: '/repo',
    async request() {
      return { state: 'closed' };
    },
  };
  const store = {
    data: {
      prs: {
        1: { number: 1, kind: 'content' },
        2: { number: 2, kind: 'director', session: 'active' },
        3: { number: 3, kind: 'director', session: 'done' },
        4: { number: 4, kind: 'director', session: 'cancelled' },
      },
      sessions: { active: { status: 'awaiting-publication' }, done: { status: 'published' }, cancelled: { status: 'cancelled' } },
    },
  };
  assert.deepEqual(await cleanupList(api, store), [1, 3, 4]);
});

test('review activation starts when requested, then ready requests deduplicate', async () => {
  const requests = [];
  const api = {
    root: '/repo',
    async request(method, p, body) {
      if (method === 'GET') return { state: 'open', user: { login: 'author' }, requested_reviewers: [] };
      requests.push(body);
    },
  };
  const store = { async save() {} };
  const state = { number: 1, kind: 'content', notifications: {}, stages: { lead: { reviewer: 'lead', round: 1, since: '2000-01-01T00:00:00Z' } } };
  const controller = new Controller(api, store);
  await controller.requestReview(state, 'lead', 'assignment-lead-1');
  assert.ok(state.stages.lead.activatedAt > '2000-01-01T00:00:00Z');
  assert.equal(state.stages.lead.since, state.stages.lead.activatedAt);
  await controller.requestReview(state, 'lead', 'assignment-lead-1');
  assert.equal(requests.length, 1);
  const before = state.stages.lead.since;
  await controller.requestReview(state, 'lead', `ready-lead-1-${sha}`);
  await controller.requestReview(state, 'lead', `ready-lead-1-${sha}`);
  assert.equal(requests.length, 2);
  assert.equal(state.stages.lead.since, before);
});

test('latest failed rerun blocks an earlier successful build without blocking other previews', async () => {
  const states = { 1: { number: 1, preview: { sha, stale: false } }, 2: { number: 2 }, 3: { number: 3 } };
  const store = { data: { prs: states }, async save() {} };
  const statuses = [];
  const api = {
    root: '/repo',
    async request(method, p, body) {
      if (method === 'POST') {
        statuses.push(body);
        return {};
      }
      if (p.includes('/workflows/'))
        return {
          workflow_runs: [
            { id: 1, event: 'pull_request', head_sha: sha, pull_requests: [{ number: 1 }], status: 'completed', conclusion: 'success' },
            { id: 2, event: 'pull_request', head_sha: sha, pull_requests: [{ number: 1 }], status: 'completed', conclusion: 'failure' },
            { id: 3, event: 'pull_request', head_sha: sha, pull_requests: [{ number: 2 }], status: 'completed', conclusion: 'success' },
            { id: 4, event: 'pull_request', head_sha: sha, pull_requests: [{ number: 3 }], status: 'completed', conclusion: 'success' },
          ],
        };
      if (p.includes('/artifacts')) {
        const run = Number(p.match(/runs\/(\d+)/)[1]);
        return { artifacts: [{ id: run + 10, name: `preview-${run - 1}-${sha}` }] };
      }
      return { state: 'open', head: { sha } };
    },
  };
  await synchronizeBuilds(api, store);
  assert.equal(states[1].preview.stale, true);
  assert.ok(statuses.some((s) => s.state === 'failure'));
  await synchronizeBuilds(api, store);
  assert.equal(statuses.length, 3);
  states[3].failedPreview = '4:14';
  assert.deepEqual(await select(api, store, {}), { number: 2, sha, run: 3, artifact: 13 });
});

test('dispatch build identity is bound to main and the exact requested PR revision', () => {
  const run = { event: 'workflow_dispatch', head_branch: 'main', display_title: `Validate PR #42 at ${sha}` };
  assert.deepEqual(identity(run), { number: 42, sha });
  assert.equal(identity({ ...run, head_branch: 'author-branch' }), null);
  assert.equal(identity({ ...run, display_title: 'Validate PR #42' }), null);
});

test('cleanup forgets removed previews so reopened PRs can republish without losing review history', () => {
  const state = { preview: { sha }, previewReady: true, stages: { peer: { status: 'approved' } }, history: ['approval'] };
  const other = { preview: { sha }, previewReady: true };
  const store = { data: { prs: { 1: state, 2: other } } };
  forgetPreviews(store, [1]);
  assert.equal(state.preview, undefined);
  assert.equal(state.previewReady, false);
  assert.equal(state.stages.peer.status, 'approved');
  assert.deepEqual(state.history, ['approval']);
  assert.equal(other.preview.sha, sha);
});
