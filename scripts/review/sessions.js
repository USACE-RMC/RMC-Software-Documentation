'use strict';
const { readRegistry, validLocation, flipDraft, latestVersion, publicationChanges, documentScope, registryChanges, inScope } = require('./documents');
const { createState, isComplete, transition } = require('./policy');
const crypto = require('node:crypto');
const treeHashes = (t) => Object.fromEntries(Object.entries(t.files).map(([p, f]) => [p, f.sha]));
async function deployedMain(api) {
  const deployments = await api.list(`${api.root}/deployments?environment=production`);
  for (const d of deployments) {
    if (d.ref !== 'main' && d.ref !== 'refs/heads/main') continue;
    const statuses = await api.list(`${api.root}/deployments/${d.id}/statuses`);
    if (statuses.some((s) => s.state === 'success')) return d.sha;
  }
  throw Error('No successful production deployment of main found');
}
async function ensurePR(api, head, base, title, body) {
  const prs = await api.list(
    `${api.root}/pulls?state=all&head=${encodeURIComponent(api.repository.split('/')[0] + ':' + head)}&base=${encodeURIComponent(base)}`,
  );
  if (prs.length) {
    const open = prs.find((pr) => pr.state === 'open');
    if (open) return open;
    throw Error(`Generated pull request for ${head} is closed; cancel this session or retry after administrator reconciliation`);
  }
  return api.request('POST', `${api.root}/pulls`, { head, base, title, body });
}
async function dispatchBuild(api, pr) {
  await api.request('POST', `${api.root}/actions/workflows/ci-build.yml/dispatches`, {
    ref: 'main',
    inputs: { pr: String(pr.number), sha: String(pr.head.sha) },
  });
}
async function startDirector(api, store, parent, action, actor, key) {
  const location = validLocation(action.document),
    version = action.version;
  if (!actor.isAdmin) throw Error('Administrator action required');
  // Establish that the named reviewer can actually be requested before creating branches or commits.
  const reviewerPermission = await api.request('GET', `${api.root}/collaborators/${encodeURIComponent(action.login)}/permission`);
  if (!reviewerPermission?.permission || reviewerPermission.permission === 'none') throw Error('Director reviewer must be a repository collaborator');
  const origin = await api.request('GET', `${api.root}/pulls/${parent.number}`);
  if (!origin.merged || origin.base?.ref !== 'main') throw Error('Director review requires a content origin PR already merged to main');
  if (parent.lane && parent.lane !== 'new') throw Error('A classified Director origin must use the new-document lane');
  if (parent.lane === 'new' && !isComplete(parent)) throw Error('The new-document content review must be complete');
  if (parent.document && parent.document !== location) throw Error('Selected Director document does not match the content origin');
  const existing = Object.values(store.data.sessions).find((s) => s.document === location && !['cancelled', 'published'].includes(s.status));
  const id = crypto.createHash('sha256').update(`${parent.number}:${key}:${location}:${version}`).digest('hex').slice(0, 16);
  if (existing && existing.id !== id) throw Error(`An active Director session already exists: #${existing.reviewPr || existing.originPr}`);
  let session = store.data.sessions[id];
  if (!session) {
    const sourceSha = await deployedMain(api),
      source = await api.tree(sourceSha);
    const lineage = await api.request('GET', `${api.root}/compare/${origin.merge_commit_sha}...${sourceSha}`);
    if (!['ahead', 'identical'].includes(lineage.status)) throw Error('The deployed main revision does not contain the content origin merge');
    const registry = readRegistry(await api.file('src/docConfig.js', sourceSha));
    const matches = registry.filter((d) => d.doc_location === location);
    if (matches.length !== 1 || !matches[0].active || !matches[0].draft) throw Error('Select exactly one active deployed draft');
    if (latestVersion(Object.keys(source.files), location) !== version) throw Error('Selected version is not the deployed latest version');
    const changed = await api.list(`${api.root}/pulls/${parent.number}/files`);
    const names = changed.flatMap((file) => [file.filename, ...(file.previous_filename ? [file.previous_filename] : [])]);
    const scope = documentScope(names, registry);
    const unapprovedCode = scope.code.filter((path) => !parent.allowedCode?.includes(path));
    if (scope.documents.length !== 1 || scope.documents[0] !== location || scope.unknown.length || unapprovedCode.length)
      throw Error('Content origin changed files outside the selected document scope');
    const headRegistry = await api.file('src/docConfig.js', origin.head.sha),
      baseRegistry = await api.file('src/docConfig.js', origin.base.sha);
    if (!headRegistry || !baseRegistry) throw Error('Content origin registry revisions are unavailable');
    if (registryChanges(baseRegistry, headRegistry).some((identity) => identity !== location))
      throw Error('Content origin changed an unrelated registry document');
    session = {
      id,
      document: location,
      version,
      sourceSha,
      originPr: parent.number,
      status: 'preparing',
      reviewer: action.login,
      name: matches[0].doc_name,
      baselineBranch: `director-base/${id}`,
      reviewBranch: `director-review/${id}`,
      publicationBranch: `publication/${id}`,
      startup: { action: structuredClone(action), actor: structuredClone(actor), key },
    };
    store.data.sessions[id] = session;
    parent.session = id;
    await store.save();
  }
  if (session.status === 'cancelled') throw Error('This review session was cancelled');
  const original = await api.tree(session.sourceSha);
  const prefix = `docs/${location}/${version === 'unversioned' ? '' : version + '/'}`;
  const files = Object.keys(original.files).filter((path) => path.startsWith(prefix) || (path.startsWith('static/') && inScope(path, location)));
  if (!files.length) throw Error('Selected document has no source files');
  if (!session.baselineSha) {
    session.baselineSha = await api.commit(
      session.sourceSha,
      files.map((path) => ({ path, mode: '100644', type: 'blob', sha: null })),
      'Prepare full-document review baseline',
    );
    await store.save();
  }
  await api.ensureBranch(session.baselineBranch, session.baselineSha);
  if (!session.initialHead) {
    session.initialHead = await api.commit(
      session.baselineSha,
      files.map((path) => ({ path, mode: original.files[path].mode, type: 'blob', sha: original.files[path].sha })),
      'Restore document for full Director review',
    );
    await store.save();
  }
  // Once established, later author commits on this branch must be preserved.
  if (!session.reviewPr) await api.ensureBranch(session.reviewBranch, session.initialHead);
  const pr = await ensurePR(
    api,
    session.reviewBranch,
    session.baselineBranch,
    `[Director Review] ${session.name} — ${version}`,
    `Full-document Director review for \`${location}\` (${version}).\n\nContent PR: #${parent.number}. Comments, responses and corrections remain here. This PR does **not** merge into main.\n\n**Read the review preview linked in the workflow summary throughout the review.** A publication PR will deliver corrections and draft removal after approval or administrator waiver. Document attribution is filled manually by an administrator.`,
  );
  session.reviewPr = pr.number;
  if (!store.data.prs[pr.number]) {
    let state = createState(pr.number, parent.authors[0]);
    state.authors = [...parent.authors];
    state.history = structuredClone(parent.history || []);
    state = transition(state, { type: 'classify', lane: 'director', document: location }, actor);
    // Carry identity history across PRs for non-admin separation enforcement.
    state.stages = { ...structuredClone(parent.stages), ...state.stages };
    state = transition(state, { type: 'assign', stage: 'director', login: action.login, reviewerIsAdmin: await api.admin(action.login) }, actor);
    state.kind = 'director';
    state.session = id;
    state.previewReady = false;
    state.stages.director.since = new Date().toISOString();
    store.data.prs[pr.number] = state;
  }
  session.status = 'reviewing';
  parent.session = id;
  await store.save();
  await dispatchBuild(api, pr);
  return session;
}
async function resumePreparing(api, store, session) {
  if (session?.status !== 'preparing' || !session.startup) throw Error('Session has no resumable Director preparation');
  const parent = store.data.prs[session.originPr];
  if (!parent) throw Error('Director preparation origin state is missing');
  return startDirector(api, store, parent, structuredClone(session.startup.action), structuredClone(session.startup.actor), session.startup.key);
}
async function preparePublication(api, store, session) {
  if (['cancelled', 'published'].includes(session.status)) return;
  const pr = await api.request('GET', `${api.root}/pulls/${session.reviewPr}`);
  const original = await api.tree(session.sourceSha),
    reviewed = await api.tree(pr.head.sha),
    main = await api.tree('main');
  const changes = publicationChanges(treeHashes(original), treeHashes(reviewed), treeHashes(main), session.document);
  if (session.publicationPr) {
    if (session.publishedReviewSha === pr.head.sha) return;
    const publication = await api.request('GET', `${api.root}/pulls/${session.publicationPr}`);
    if (publication.state !== 'open') throw Error('Publication PR is closed; cancel or reconcile the session');
    const publicationTree = await api.tree(publication.head.sha);
    const selectedPaths = new Set([...Object.keys(original.files), ...Object.keys(reviewed.files)].filter((path) => inScope(path, session.document)));
    const missing = [...selectedPaths].some((path) => (publicationTree.files[path]?.sha ?? null) !== (reviewed.files[path]?.sha ?? null));
    if (missing) {
      const message = 'Director corrections changed after publication preparation; manually apply them to the publication PR, then retry';
      session.status = 'publication-stale';
      if (store.data.prs[session.publicationPr]) store.data.prs[session.publicationPr].operationError = message;
      await store.save();
      throw Error(message);
    }
    session.publishedReviewSha = pr.head.sha;
    session.status = 'awaiting-publication';
    if (store.data.prs[session.publicationPr]) delete store.data.prs[session.publicationPr].operationError;
    await store.save();
    return;
  }
  if (latestVersion(Object.keys(main.files), session.document) !== session.version)
    throw Error('Main has a different latest version; administrator must reconcile publication identity');
  const config = await api.file('src/docConfig.js', main.sha);
  const updated = flipDraft(config, session.document);
  const entries = Object.entries(changes).map(([path, sha]) => ({
    path,
    type: 'blob',
    mode: reviewed.files[path]?.mode || main.files[path]?.mode || '100644',
    sha,
  }));
  if (updated !== config) entries.push({ path: 'src/docConfig.js', mode: '100644', type: 'blob', content: updated });
  if (!entries.length) throw Error('No publication changes remain; administrator must reconcile existing publication');
  if (!session.publicationHead) {
    session.publicationHead = await api.commit(main.sha, entries, `Prepare publication of ${session.document}`);
    session.publicationBase = main.sha;
    await store.save();
  }
  await api.ensureBranch(session.publicationBranch, session.publicationHead);
  const state = store.data.prs[session.reviewPr],
    outcome = state.stages.director.status;
  const publication = await ensurePR(
    api,
    session.publicationBranch,
    'main',
    `[Publication] ${session.name} — Remove draft status`,
    `Director review #${session.reviewPr} is **${outcome}**. Administrator publication action remains.\n\nDocument: \`${session.document}\`\nVersion: \`${session.version}\`\nContent PR: #${session.originPr}\n\nVerify the corrections and the selected \`draft: true → false\` change in \`src/docConfig.js\`. Fill reviewedBy/approvedBy manually. Merge and approve the main production deployment when ready. All Director discussion stays in #${session.reviewPr}.`,
  );
  session.publicationPr = publication.number;
  session.status = 'awaiting-publication';
  session.publishedReviewSha = pr.head.sha;
  if (!store.data.prs[publication.number]) {
    const p = createState(publication.number, state.authors[0]);
    p.authors = [...state.authors];
    p.kind = 'publication';
    p.lane = 'publication';
    p.document = session.document;
    p.session = session.id;
    store.data.prs[publication.number] = p;
  }
  await store.save();
  await dispatchBuild(api, publication);
}
async function reconcilePublished(api, store, sha) {
  for (const session of Object.values(store.data.sessions)) {
    if (session.status === 'published' && session.reviewPr) {
      const review = await api.request('GET', `${api.root}/pulls/${session.reviewPr}`);
      if (review.state === 'open') await api.request('PATCH', `${api.root}/pulls/${session.reviewPr}`, { state: 'closed' });
      continue;
    }
    if (session.status !== 'awaiting-publication' || !session.publicationPr) continue;
    const pr = await api.request('GET', `${api.root}/pulls/${session.publicationPr}`);
    if (!pr.merged) continue;
    const comparison = await api.request('GET', `${api.root}/compare/${pr.merge_commit_sha}...${sha}`);
    if (!['ahead', 'identical'].includes(comparison.status)) continue;
    const registry = readRegistry(await api.file('src/docConfig.js', sha));
    const entry = registry.filter((d) => d.doc_location === session.document);
    if (entry.length !== 1 || entry[0].draft !== false) continue;
    session.status = 'published';
    session.deployedSha = sha;
    await store.save();
    await api.request('PATCH', `${api.root}/pulls/${session.reviewPr}`, { state: 'closed' });
  }
}
module.exports = { startDirector, resumePreparing, preparePublication, reconcilePublished, dispatchBuild, deployedMain };
