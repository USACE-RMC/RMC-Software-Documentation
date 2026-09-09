const test = require('node:test');
const assert = require('node:assert/strict');

const { Controller } = require('../scripts/review/controller');
const { Store } = require('../scripts/review/github');
const { startDirector, resumePreparing, preparePublication, reconcilePublished } = require('../scripts/review/sessions');
const { createState, transition } = require('../scripts/review/policy');
const { readRegistry } = require('../scripts/review/documents');

const REGISTRY = `const docs=[
  {doc_location:'a/manual',doc_name:'Alpha',active:true,draft:true,reviewedBy:'Keep Me'},
  {doc_location:'b/manual',doc_name:'Beta',active:true,draft:true}
];`;
const admin = { login: 'admin', isAdmin: true };

class FakeGitHub {
  constructor() {
    this.root = '/repos/acme/docs';
    this.repository = 'acme/docs';
    this.botLogin = 'review-bot';
    this.prs = {};
    this.comments = {};
    this.prFiles = {};
    this.reviews = {};
    this.admins = new Set(['admin']);
    this.collaborators = new Set(['admin', 'director']);
    this.trees = {};
    this.files = {};
    this.branches = {};
    this.statuses = [];
    this.dispatches = [];
    this.createdPrs = [];
    this.commits = [];
    this.savedState = null;
    this.failCloseOnce = false;
    this.failCreatePrOnce = false;
    this.noPermission = new Set();
    this.sequence = 100;
  }

  async admin(login) {
    return this.admins.has(login.toLowerCase());
  }
  async file(path, ref) {
    return this.files[`${ref}:${path}`] ?? null;
  }
  async tree(ref) {
    const resolved = this.branches[ref] || ref;
    const value = this.trees[resolved];
    if (!value) throw Error(`Missing fake tree ${ref}`);
    return structuredClone(value);
  }
  async commit(parent, changes, message) {
    const base = await this.tree(parent);
    const sha = `commit-${++this.sequence}`;
    const files = structuredClone(base.files);
    for (const change of changes) {
      if (change.sha === null) delete files[change.path];
      else files[change.path] = { sha: change.sha || `blob-${this.sequence}-${change.path}`, mode: change.mode };
      if (Object.hasOwn(change, 'content')) this.files[`${sha}:${change.path}`] = change.content;
    }
    this.trees[sha] = { sha, tree: `tree-${sha}`, files };
    this.commits.push({ parent, changes: structuredClone(changes), message, sha });
    return sha;
  }
  async ensureBranch(branch, sha) {
    if (this.branches[branch] && this.branches[branch] !== sha) throw Error(`Unexpected branch ${branch}`);
    this.branches[branch] = sha;
  }
  async list(path) {
    if (path.includes('/deployments?')) return [{ id: 1, ref: 'main', sha: 'deployed' }];
    if (path.endsWith('/deployments/1/statuses')) return [{ state: 'success' }];
    if (path.includes('/pulls?state=all')) {
      const head = decodeURIComponent(path.match(/head=([^&]+)/)?.[1] || '')
        .split(':')
        .at(-1);
      const base = decodeURIComponent(path.match(/base=([^&]+)/)?.[1] || '');
      return Object.values(this.prs).filter((pr) => pr.head.ref === head && pr.base.ref === base);
    }
    if (path.includes('/pulls?state=open&base=main')) return Object.values(this.prs).filter((pr) => pr.state === 'open' && pr.base.ref === 'main');
    let match = path.match(/\/issues\/(\d+)\/comments/);
    if (match) return this.comments[match[1]] || [];
    match = path.match(/\/pulls\/(\d+)\/files/);
    if (match) return this.prFiles[match[1]] || [];
    match = path.match(/\/pulls\/(\d+)\/reviews/);
    if (match) return this.reviews[match[1]] || [];
    throw Error(`Unhandled fake list ${path}`);
  }
  async request(method, path, body) {
    if (method === 'GET' && path.includes('/actions/workflows/ci-build.yml/runs')) return { workflow_runs: [] };
    let match = path.match(/\/pulls\/(\d+)$/);
    if (method === 'GET' && match) return this.prs[match[1]];
    if (method === 'GET' && path.includes('/collaborators/')) {
      const login = decodeURIComponent(path.split('/').at(-2)).toLowerCase();
      if (!this.collaborators.has(login)) {
        const error = Error('not a collaborator');
        error.status = 404;
        throw error;
      }
      return { permission: this.noPermission.has(login) ? 'none' : this.admins.has(login) ? 'admin' : 'write' };
    }
    if (method === 'GET' && path.includes('/compare/')) return { status: 'ahead' };
    if (method === 'POST' && path.endsWith('/pulls')) {
      if (this.failCreatePrOnce) {
        this.failCreatePrOnce = false;
        throw Error('temporary PR creation failure');
      }
      const number = ++this.sequence;
      const pr = {
        number,
        state: 'open',
        merged: false,
        user: { login: 'review-bot' },
        head: { ref: body.head, sha: this.branches[body.head] },
        base: { ref: body.base, sha: this.branches[body.base] || body.base },
        labels: [],
        requested_reviewers: [],
      };
      this.prs[number] = pr;
      this.createdPrs.push(pr);
      return pr;
    }
    match = path.match(/\/issues\/(\d+)\/comments$/);
    if (method === 'POST' && match) {
      const row = {
        id: ++this.sequence,
        body: body.body,
        user: { login: 'review-bot', type: 'Bot' },
        created_at: '2026-09-09T00:00:00Z',
        updated_at: '2026-09-09T00:00:00Z',
      };
      (this.comments[match[1]] ||= []).push(row);
      return row;
    }
    match = path.match(/\/issues\/comments\/(\d+)$/);
    if (method === 'PATCH' && match) {
      for (const rows of Object.values(this.comments)) {
        const row = rows.find((c) => c.id === Number(match[1]));
        if (row) {
          row.body = body.body;
          return row;
        }
      }
    }
    if (method === 'POST' && path.includes('/statuses/')) {
      this.statuses.push(body);
      return body;
    }
    if (method === 'POST' && path.endsWith('/labels')) {
      const number = path.match(/\/issues\/(\d+)/)?.[1];
      if (number)
        for (const label of body.labels) if (!this.prs[number].labels.some((l) => l.name === label)) this.prs[number].labels.push({ name: label });
      return [];
    }
    if (method === 'DELETE' && path.includes('/labels/')) return null;
    if (method === 'POST' && path.includes('/requested_reviewers')) return {};
    if (method === 'POST' && path.includes('/actions/workflows/ci-build.yml/dispatches')) {
      this.dispatches.push(body);
      return null;
    }
    if (method === 'PATCH' && path.match(/\/pulls\/(\d+)$/)) {
      if (this.failCloseOnce) {
        this.failCloseOnce = false;
        throw Error('temporary close failure');
      }
      const pr = this.prs[path.match(/\/pulls\/(\d+)$/)[1]];
      Object.assign(pr, body);
      return pr;
    }
    if (method === 'POST' && path.endsWith('/git/trees')) return { sha: `state-tree-${++this.sequence}` };
    if (method === 'POST' && path.endsWith('/git/commits')) return { sha: `state-commit-${++this.sequence}` };
    if (method === 'POST' && path.endsWith('/git/refs')) return {};
    if (method === 'PUT' && path.endsWith('/contents/state.json')) {
      this.savedState = JSON.parse(Buffer.from(body.content, 'base64').toString('utf8'));
      return { content: { sha: `state-${++this.sequence}` } };
    }
    throw Error(`Unhandled fake request ${method} ${path}`);
  }
}

function pull(number, head = `head-${number}`) {
  return {
    number,
    state: 'open',
    merged: false,
    user: { login: 'writer' },
    head: { ref: `feature-${number}`, sha: head },
    base: { ref: 'main', sha: 'main' },
    labels: [],
    requested_reviewers: [],
  };
}

async function storeFor(api) {
  const store = new Store(api);
  await store.save();
  return store;
}

test('malformed commands from unauthorized commenters cannot change a valid gate', async () => {
  const api = new FakeGitHub(),
    store = await storeFor(api),
    pr = pull(1);
  api.prs[1] = pr;
  api.prFiles[1] = [{ filename: 'README.md' }];
  api.files[`${pr.head.sha}:src/docConfig.js`] = REGISTRY;
  api.files['main:src/docConfig.js'] = REGISTRY;
  let state = transition(createState(1, 'writer'), { type: 'classify', lane: 'code', document: '-' }, admin);
  store.data.prs[1] = state;
  const comment = {
    id: 9,
    body: '/review classify nonsense',
    user: { login: 'outsider', type: 'User' },
    created_at: '2026-09-09T00:00:00Z',
    updated_at: '2026-09-09T00:00:00Z',
  };
  api.comments[1] = [comment];
  await new Controller(api, store).event('issue_comment', {
    action: 'created',
    issue: { number: 1, pull_request: {} },
    comment,
    sender: comment.user,
  });
  assert.equal(store.data.prs[1].operationError, undefined);
  assert.equal(store.data.prs[1].lane, 'code');
  assert.equal(store.data.prs[1].history.length, 1);
});

test('replayed commands and reconciliation do not duplicate transitions or handoff notices', async () => {
  const api = new FakeGitHub(),
    store = await storeFor(api),
    pr = pull(2);
  api.prs[2] = pr;
  api.prFiles[2] = [{ filename: 'docs/a/manual/01.mdx' }];
  api.files[`${pr.head.sha}:src/docConfig.js`] = REGISTRY;
  api.files['main:src/docConfig.js'] = REGISTRY;
  const comment = {
    id: 10,
    body: '/review classify editorial a/manual',
    user: { login: 'admin', type: 'User' },
    created_at: '2026-09-09T00:00:00Z',
    updated_at: '2026-09-09T00:00:00Z',
  };
  api.comments[2] = [comment];
  const event = { action: 'created', issue: { number: 2, pull_request: {} }, comment, sender: comment.user };
  const controller = new Controller(api, store);
  await controller.event('issue_comment', event);
  await controller.event('issue_comment', event);
  assert.equal(store.data.prs[2].history.filter((h) => h.action.type === 'classify').length, 1);
  assert.equal(api.comments[2].filter((c) => c.body.includes('review-event:merge-editorial')).length, 1);
  assert.equal(api.comments[2].filter((c) => c.body.includes('review-summary-v2')).length, 1);
});

test('validation rejects an unrelated registry entry edit', async () => {
  const api = new FakeGitHub(),
    store = await storeFor(api),
    pr = pull(3);
  api.prs[3] = pr;
  api.files['main:src/docConfig.js'] = REGISTRY;
  api.files[`${pr.head.sha}:src/docConfig.js`] = REGISTRY.replace("doc_name:'Beta'", "doc_name:'Changed Beta'");
  api.prFiles[3] = [{ filename: 'docs/a/manual/01.mdx' }, { filename: 'src/docConfig.js' }];
  const state = transition(createState(3, 'writer'), { type: 'classify', lane: 'minor', document: 'a/manual' }, admin);
  await assert.rejects(() => new Controller(api, store).validate(state, pr), /registry|selected document|unrelated|one document/i);
});

test('validation rejects multiple documents introduced only through assets', async () => {
  const api = new FakeGitHub(),
    store = await storeFor(api),
    pr = pull(30);
  api.prs[30] = pr;
  api.files['main:src/docConfig.js'] = REGISTRY;
  api.files[`${pr.head.sha}:src/docConfig.js`] = REGISTRY;
  api.prFiles[30] = [{ filename: 'static/figures/a/manual/a.png' }, { filename: 'static/files/b/manual/b.zip' }];
  const state = transition(createState(30, 'writer'), { type: 'classify', lane: 'minor', document: 'a/manual' }, admin);
  await assert.rejects(() => new Controller(api, store).validate(state, pr), /one document/i);
});

test('Director baseline removes and its child restores the complete selected document', async () => {
  const api = new FakeGitHub(),
    store = await storeFor(api);
  const doc = 'docs/a/manual/v1/01.mdx';
  const asset = 'static/figures/a/manual/chart.png';
  api.trees.deployed = {
    sha: 'deployed',
    tree: 'tree-deployed',
    files: {
      [doc]: { sha: 'doc-original', mode: '100644' },
      [asset]: { sha: 'asset-original', mode: '100644' },
      'README.md': { sha: 'readme', mode: '100644' },
    },
  };
  api.files['deployed:src/docConfig.js'] = REGISTRY;
  api.files['origin-head:src/docConfig.js'] = REGISTRY;
  api.files['origin-base:src/docConfig.js'] = REGISTRY.replace(
    "{doc_location:'a/manual',doc_name:'Alpha',active:true,draft:true,reviewedBy:'Keep Me'},",
    '',
  );
  api.branches.main = 'deployed';
  api.prs[4] = { ...pull(4, 'origin-head'), merged: true, merge_commit_sha: 'origin-merge', base: { ref: 'main', sha: 'origin-base' } };
  api.prFiles[4] = [
    { filename: 'docs/a/manual/v1/01.mdx' },
    { filename: asset },
    { filename: 'scripts/approved-helper.js' },
    { filename: 'src/docConfig.js' },
  ];
  let parent = transition(createState(4, 'writer'), { type: 'classify', lane: 'new', document: 'a/manual' }, admin);
  parent = transition(parent, { type: 'waive', stage: 'peer' }, admin);
  parent = transition(parent, { type: 'waive', stage: 'lead' }, admin);
  parent = transition(parent, { type: 'complete', stage: 'editor' }, admin);
  parent.allowedCode = ['scripts/approved-helper.js'];
  store.data.prs[4] = parent;
  const session = await startDirector(
    api,
    store,
    parent,
    { type: 'start-director', document: 'a/manual', version: 'v1', login: 'director' },
    admin,
    'comment-40',
  );
  const baseline = await api.tree(session.baselineSha),
    child = await api.tree(session.initialHead);
  assert.equal(baseline.files[doc], undefined);
  assert.equal(baseline.files[asset], undefined);
  assert.deepEqual(child.files[doc], { sha: 'doc-original', mode: '100644' });
  assert.deepEqual(child.files[asset], { sha: 'asset-original', mode: '100644' });
  assert.deepEqual(child.files['README.md'], baseline.files['README.md']);
  assert.deepEqual(store.data.prs[session.reviewPr].history.slice(0, parent.history.length), parent.history);
});

test('Director startup validates origin and reviewer before creating artifacts', async () => {
  const api = new FakeGitHub(),
    store = await storeFor(api);
  api.trees.deployed = { sha: 'deployed', tree: 'tree-deployed', files: { 'docs/a/manual/v1/01.mdx': { sha: 'doc', mode: '100644' } } };
  api.files['deployed:src/docConfig.js'] = REGISTRY;
  api.branches.main = 'deployed';
  api.prs[5] = { ...pull(5, 'origin-head'), merged: false, base: { ref: 'main', sha: 'origin-base' } };
  const parent = transition(createState(5, 'writer'), { type: 'classify', lane: 'new', document: 'a/manual' }, admin);
  store.data.prs[5] = parent;
  await assert.rejects(
    () => startDirector(api, store, parent, { type: 'start-director', document: 'a/manual', version: 'v1', login: 'outsider' }, admin, 'comment-50'),
    /collaborator|permission/i,
  );
  assert.equal(api.commits.length, 0);
  api.collaborators.add('noaccess');
  api.noPermission.add('noaccess');
  await assert.rejects(
    () => startDirector(api, store, parent, { type: 'start-director', document: 'a/manual', version: 'v1', login: 'noaccess' }, admin, 'comment-50b'),
    /collaborator|permission/i,
  );
  assert.equal(api.commits.length, 0);
  await assert.rejects(
    () => startDirector(api, store, parent, { type: 'start-director', document: 'a/manual', version: 'v1', login: 'director' }, admin, 'comment-51'),
    /merged|origin/i,
  );
  assert.equal(api.commits.length, 0);
});

test('a persisted preparing session can resume after generated PR creation fails', async () => {
  const api = new FakeGitHub(),
    store = await storeFor(api),
    doc = 'docs/a/manual/v1/01.mdx';
  api.trees.deployed = { sha: 'deployed', tree: 'tree-deployed', files: { [doc]: { sha: 'doc', mode: '100644' } } };
  api.files['deployed:src/docConfig.js'] = REGISTRY;
  api.files['origin-head:src/docConfig.js'] = REGISTRY;
  api.files['origin-base:src/docConfig.js'] = REGISTRY.replace(
    "{doc_location:'a/manual',doc_name:'Alpha',active:true,draft:true,reviewedBy:'Keep Me'},",
    '',
  );
  api.branches.main = 'deployed';
  api.prs[7] = { ...pull(7, 'origin-head'), merged: true, merge_commit_sha: 'origin-merge', base: { ref: 'main', sha: 'origin-base' } };
  api.prFiles[7] = [{ filename: doc }, { filename: 'src/docConfig.js' }];
  let parent = transition(createState(7, 'writer'), { type: 'classify', lane: 'new', document: 'a/manual' }, admin);
  parent = transition(parent, { type: 'waive', stage: 'peer' }, admin);
  parent = transition(parent, { type: 'waive', stage: 'lead' }, admin);
  parent = transition(parent, { type: 'complete', stage: 'editor' }, admin);
  store.data.prs[7] = parent;
  api.failCreatePrOnce = true;
  await assert.rejects(
    () => startDirector(api, store, parent, { type: 'start-director', document: 'a/manual', version: 'v1', login: 'director' }, admin, 'comment-70'),
    /creation failure/i,
  );
  const session = Object.values(store.data.sessions)[0];
  assert.equal(session.status, 'preparing');
  assert.equal(parent.session, session.id);
  assert.deepEqual(session.startup, {
    action: { type: 'start-director', document: 'a/manual', version: 'v1', login: 'director' },
    actor: admin,
    key: 'comment-70',
  });
  await resumePreparing(api, store, session);
  assert.equal(session.status, 'reviewing');
  assert.ok(session.reviewPr);
});

test('Director startup rejects a previously closed generated review PR', async () => {
  const api = new FakeGitHub(),
    store = await storeFor(api);
  const doc = 'docs/a/manual/v1/01.mdx';
  api.trees.deployed = { sha: 'deployed', tree: 'tree-deployed', files: { [doc]: { sha: 'doc', mode: '100644' } } };
  api.files['deployed:src/docConfig.js'] = REGISTRY;
  api.files['origin-head:src/docConfig.js'] = REGISTRY;
  api.files['origin-base:src/docConfig.js'] = REGISTRY.replace(
    "{doc_location:'a/manual',doc_name:'Alpha',active:true,draft:true,reviewedBy:'Keep Me'},",
    '',
  );
  api.branches.main = 'deployed';
  api.prs[6] = { ...pull(6, 'origin-head'), merged: true, merge_commit_sha: 'origin-merge', base: { ref: 'main', sha: 'origin-base' } };
  api.prFiles[6] = [{ filename: doc }, { filename: 'src/docConfig.js' }];
  let parent = transition(createState(6, 'writer'), { type: 'classify', lane: 'new', document: 'a/manual' }, admin);
  parent = transition(parent, { type: 'waive', stage: 'peer' }, admin);
  parent = transition(parent, { type: 'waive', stage: 'lead' }, admin);
  parent = transition(parent, { type: 'complete', stage: 'editor' }, admin);
  store.data.prs[6] = parent;
  const first = await startDirector(
    api,
    store,
    parent,
    { type: 'start-director', document: 'a/manual', version: 'v1', login: 'director' },
    admin,
    'comment-60',
  );
  api.prs[first.reviewPr].state = 'closed';
  first.reviewPr = null;
  await assert.rejects(
    () => startDirector(api, store, parent, { type: 'start-director', document: 'a/manual', version: 'v1', login: 'director' }, admin, 'comment-60'),
    /closed|cancel|retry/i,
  );
});

test('publication preparation is idempotent and preserves manual registry fields', async () => {
  const api = new FakeGitHub(),
    store = await storeFor(api);
  api.trees.source = { sha: 'source', tree: 'tree-source', files: { 'docs/a/manual/v1/01.mdx': { sha: 'old', mode: '100644' } } };
  api.trees.reviewed = { sha: 'reviewed', tree: 'tree-reviewed', files: { 'docs/a/manual/v1/01.mdx': { sha: 'corrected', mode: '100644' } } };
  api.trees.main = structuredClone(api.trees.source);
  api.trees.main.sha = 'main';
  api.files['main:src/docConfig.js'] = REGISTRY;
  api.branches.main = 'main';
  api.prs[20] = { ...pull(20, 'reviewed'), head: { ref: 'director-review/x', sha: 'reviewed' } };
  const review = transition(
    transition(createState(20, 'writer'), { type: 'classify', lane: 'director', document: 'a/manual' }, admin),
    { type: 'waive', stage: 'director' },
    admin,
  );
  review.kind = 'director';
  review.session = 'x';
  store.data.prs[20] = review;
  const session = {
    id: 'x',
    document: 'a/manual',
    version: 'v1',
    sourceSha: 'source',
    originPr: 4,
    reviewPr: 20,
    status: 'reviewing',
    name: 'Alpha',
    publicationBranch: 'publication/x',
  };
  store.data.sessions.x = session;
  await preparePublication(api, store, session);
  await preparePublication(api, store, session);
  assert.equal(api.createdPrs.filter((pr) => pr.base.ref === 'main').length, 1);
  assert.equal(api.dispatches.length, 1);
  const publicationCommit = api.commits.find((c) => c.message.includes('Prepare publication'));
  const config = publicationCommit.changes.find((c) => c.path === 'src/docConfig.js').content;
  const alpha = readRegistry(config).find((d) => d.doc_location === 'a/manual');
  assert.equal(alpha.draft, false);
  assert.equal(alpha.reviewedBy, 'Keep Me');
  assert.equal(readRegistry(config).find((d) => d.doc_location === 'b/manual').doc_name, 'Beta');
});

test('new Director corrections invalidate an already prepared publication', async () => {
  const api = new FakeGitHub(),
    store = await storeFor(api);
  api.trees.source = { sha: 'source', tree: 'tree-source', files: { 'docs/a/manual/v1/01.mdx': { sha: 'old', mode: '100644' } } };
  api.trees.reviewed = { sha: 'reviewed', tree: 'tree-reviewed', files: { 'docs/a/manual/v1/01.mdx': { sha: 'first-fix', mode: '100644' } } };
  // A later correction can also revert an earlier correction. The publication
  // must not retain the now-stale first edit merely because the new delta is empty.
  api.trees['reviewed-again'] = {
    sha: 'reviewed-again',
    tree: 'tree-reviewed-again',
    files: { 'docs/a/manual/v1/01.mdx': { sha: 'old', mode: '100644' } },
  };
  api.trees.main = structuredClone(api.trees.source);
  api.trees.main.sha = 'main';
  api.files['main:src/docConfig.js'] = REGISTRY;
  api.branches.main = 'main';
  api.prs[21] = { ...pull(21, 'reviewed'), head: { ref: 'director-review/y', sha: 'reviewed' } };
  const review = transition(
    transition(createState(21, 'writer'), { type: 'classify', lane: 'director', document: 'a/manual' }, admin),
    { type: 'waive', stage: 'director' },
    admin,
  );
  review.kind = 'director';
  review.session = 'y';
  store.data.prs[21] = review;
  const session = {
    id: 'y',
    document: 'a/manual',
    version: 'v1',
    sourceSha: 'source',
    originPr: 4,
    reviewPr: 21,
    status: 'reviewing',
    name: 'Alpha',
    publicationBranch: 'publication/y',
  };
  store.data.sessions.y = session;
  await preparePublication(api, store, session);
  api.prs[21].head.sha = 'reviewed-again';
  await assert.rejects(() => preparePublication(api, store, session), /changed|stale|correction|publication/i);
  assert.match(store.data.prs[session.publicationPr].operationError, /changed|stale|correction/i);
});

test('published reconciliation retries review closure after a transient failure', async () => {
  const api = new FakeGitHub(),
    store = await storeFor(api);
  api.prs[22] = { ...pull(22), state: 'open' };
  api.prs[23] = { ...pull(23), merged: true, merge_commit_sha: 'publication-merge' };
  api.files['deployed-final:src/docConfig.js'] = REGISTRY.replace('draft:true', 'draft:false');
  store.data.sessions.z = { id: 'z', document: 'a/manual', reviewPr: 22, publicationPr: 23, status: 'awaiting-publication' };
  api.failCloseOnce = true;
  await assert.rejects(() => reconcilePublished(api, store, 'deployed-final'), /close failure/i);
  assert.equal(store.data.sessions.z.status, 'published');
  await reconcilePublished(api, store, 'deployed-final');
  assert.equal(api.prs[22].state, 'closed');
});
