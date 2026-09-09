'use strict';
const fs = require('node:fs');
const { GitHub, Store } = require('./github');
const { synchronizeBuilds } = require('./builds');
const { LANES, createState, currentStage, isComplete, transition } = require('./policy');
const { readRegistry, documentScope, validLocation, registryChanges, inScope } = require('./documents');
const { startDirector, resumePreparing, preparePublication, reconcilePublished, deployedMain, dispatchBuild } = require('./sessions');
function parseCommand(body) {
  if (!body?.trim().startsWith('/review ')) return null;
  const parts = body.trim().split(/\s+/),
    type = parts[1],
    args = parts.slice(2);
  const count = (n) => {
    if (args.length !== n) throw Error(`Invalid /review ${type} arguments`);
  };
  switch (type) {
    case 'classify':
      count(2);
      if (!['new', 'major', 'minor', 'editorial', 'dev', 'code'].includes(args[0])) throw Error('Choose a content classification');
      return { type, lane: args[0], document: args[1] };
    case 'assign':
      count(2);
      return { type, stage: args[0], login: args[1].replace(/^@/, '').toLowerCase() };
    case 'author':
      count(1);
      return { type, login: args[0].replace(/^@/, '').toLowerCase() };
    case 'complete':
    case 'restart':
      count(1);
      return { type, stage: args[0] };
    case 'waive':
      if (!args.length) throw Error('Choose a stage to waive');
      return { type, stage: args[0], reason: args.slice(1).join(' ') };
    case 'ready':
    case 'cancel':
    case 'retry':
      count(0);
      return { type };
    case 'start-director':
      count(3);
      return { type, document: validLocation(args[0]), version: args[1], login: args[2].replace(/^@/, '').toLowerCase() };
    case 'retarget':
      count(2);
      return { type, document: validLocation(args[0]), version: args[1] };
    default:
      throw Error('Unknown review command');
  }
}
function shouldRetainPreview(state, session) {
  return state?.kind === 'director' && !['published', 'cancelled'].includes(session?.status);
}
function summary(state, session) {
  const stage = currentStage(state);
  const lines = [
    '<!-- review-summary-v2 -->',
    '## Review workflow',
    `**Purpose:** ${state.kind || 'content'} · **Classification:** ${state.lane || 'awaiting administrator assignment'}`,
    `**Document:** \`${state.document || 'not selected'}\``,
    '',
    '| Stage | Reviewer | Status |',
    '| --- | --- | --- |',
  ];
  for (const name of LANES[state.lane] || []) {
    const s = state.stages[name] || {};
    lines.push(`| ${name} | ${s.reviewer ? '`' + s.reviewer + '`' : 'administrator assignment/completion'} | ${s.status || 'pending'} |`);
  }
  lines.push(
    '',
    `**Next:** ${state.cancelled ? 'Cancelled' : state.error || (!state.lane ? 'Administrator: classify this PR' : stage ? `${stage}: ${state.stages[stage]?.reviewer ? 'reviewer approval' : 'administrator action needed'}` : state.kind === 'director' ? 'Director requirement complete; publication preparation' : 'Administrator: inspect and merge after CI passes')}`,
  );
  if (state.preview)
    lines.push(
      '',
      `**Review preview:** ${state.preview.url}`,
      `Preview revision: \`${state.preview.sha}\`${state.preview.stale ? ' — **STALE: a newer build is pending or the latest build/update failed.**' : ''}`,
    );
  else if (state.kind === 'director')
    lines.push('', '**Preview:** awaiting the first successful preview publication before requesting the Director.');
  if (state.failedPreview)
    lines.push('', 'Preview publication failed. An administrator can correct the failure and use `/review retry`; other PR previews continue.');
  if (session)
    lines.push(
      '',
      `**Related PRs:** content #${session.originPr}${session.reviewPr ? ' · Director #' + session.reviewPr : ''}${session.publicationPr ? ' · publication #' + session.publicationPr : ''}`,
      `Publication status: **${session.status}**`,
    );
  lines.push(
    '',
    'Completed stages persist until an administrator restarts them. Replies and resolved threads are not approval requirements. Use `/review ready` to request re-review within an active stage.',
  );
  if (state.lifecycle === 'merged')
    lines.push(
      '',
      '**This PR has merged.** ' +
        (state.kind === 'publication'
          ? 'Awaiting confirmed production deployment.'
          : state.lane === 'new'
            ? 'After draft deployment, an administrator can start the separate Director review.'
            : 'Production deployment follows the main approval process.'),
    );
  else if (state.lifecycle === 'closed') lines.push('', '**This PR is closed.** Review history is retained.');
  return lines.join('\n');
}
class Controller {
  constructor(api, store) {
    this.api = api;
    this.store = store;
    this.prCache = new Map();
  }
  async pr(number) {
    return this.api.request('GET', `${this.api.root}/pulls/${number}`);
  }
  async comments(number) {
    return this.api.list(`${this.api.root}/issues/${number}/comments`);
  }
  async notice(state, key, text) {
    if (state.notifications[key]) return;
    const marker = `<!-- review-event:${key} -->`;
    const existing = (await this.comments(state.number)).some(
      (c) => c.user?.login === (this.api.botLogin || 'github-actions[bot]') && c.body.includes(marker),
    );
    if (!existing) await this.api.request('POST', `${this.api.root}/issues/${state.number}/comments`, { body: `${marker}\n${text}` });
    state.notifications[key] = true;
    await this.store.save();
  }
  async requestReview(state, stage, key) {
    const assigned = state.stages[stage];
    if (!assigned?.reviewer || state.notifications[key]) return;
    if (state.kind === 'director' && !state.previewReady) return;
    const pr = await this.pr(state.number);
    if (pr.state !== 'open') return;
    if (!assigned.activatedAt) {
      assigned.activatedAt = new Date().toISOString();
      assigned.since = assigned.activatedAt;
      await this.store.save();
    }
    // GitHub cannot request a review from a PR's creator; admins use explicit completion.
    if (pr.user.login.toLowerCase() === assigned.reviewer) {
      state.notifications[key] = true;
      await this.store.save();
      return;
    }
    if (!pr.requested_reviewers.some((r) => r.login.toLowerCase() === assigned.reviewer))
      await this.api.request('POST', `${this.api.root}/pulls/${state.number}/requested_reviewers`, { reviewers: [assigned.reviewer] });
    state.notifications[key] = true;
    await this.store.save();
  }
  async validate(state, pr) {
    if (state.kind === 'director') return null; // synthetic comparison is never a production merge
    if (pr.base.ref !== 'main') throw Error('Content and publication PRs must target main');
    const raw = await this.api.file('src/docConfig.js', pr.head.sha);
    if (!raw) throw Error('Missing document registry');
    const registry = readRegistry(raw);
    const comparison = await this.api.request('GET', `${this.api.root}/compare/${pr.base.sha}...${pr.head.sha}`);
    const baseRaw = await this.api.file('src/docConfig.js', comparison.merge_base_commit?.sha || pr.base.sha),
      base = baseRaw ? readRegistry(baseRaw) : [];
    const files = await this.api.list(`${this.api.root}/pulls/${pr.number}/files`);
    const scope = documentScope(
      files.flatMap((f) => [f.filename, ...(f.previous_filename ? [f.previous_filename] : [])]),
      [...registry, ...base],
    );
    const changedRegistry = registryChanges(baseRaw || 'const docs = [];', raw);
    scope.documents = [...new Set([...scope.documents, ...changedRegistry])];
    if (scope.documents.length > 1) throw Error('One document per author PR: split this change');
    if (scope.unknown.length) throw Error('Document identity is ambiguous; register the selected document before review');
    if (state.lane && state.lane === 'code' && scope.documents.length) throw Error('Code classification cannot bypass document review');
    if (state.lane === 'dev' && files.some((f) => f.filename.startsWith('docs/') && !f.filename.startsWith('docs/dev/')))
      throw Error('Developer classification only covers docs/dev');
    if (state.document && scope.documents.some((d) => d !== state.document)) throw Error('Selected document does not match changed files');
    if (state.lane && state.lane !== 'code' && !scope.documents.length) throw Error('No changes to the selected document; classify as code');
    if (state.kind === 'content' && scope.documents.length && scope.code.some((p) => !state.allowedCode?.includes(p)))
      throw Error('Mixed document/code change requires administrator classification of its current file scope');
    if (state.lane === 'new') {
      const d = registry.filter((d) => d.doc_location === state.document);
      if (d.length !== 1 || d[0].active !== true || d[0].draft !== true) throw Error('New documents merge as active drafts; retain draft: true');
    }
    const cleared = registry.filter(
      (d) => d.doc_location && d.draft === false && base.find((b) => b.doc_location === d.doc_location)?.draft !== false,
    );
    if (cleared.length && (state.kind !== 'publication' || cleared.length !== 1 || cleared[0].doc_location !== state.document))
      throw Error('Draft removal requires its linked publication PR; do not bypass it through classification');
    if (state.kind === 'publication') {
      const session = this.store.data.sessions[state.session],
        review = this.store.data.prs[session?.reviewPr];
      if (!session || session.status === 'cancelled' || !review || !isComplete(review)) throw Error('Director review must be complete or waived');
      if (!registry.some((d) => d.doc_location === session.document && d.draft === false && d.active === true))
        throw Error('Publication must clear the selected active draft');
      if (
        files.some((f) =>
          [f.filename, ...(f.previous_filename ? [f.previous_filename] : [])].some((p) => p !== 'src/docConfig.js' && !inScope(p, session.document)),
        )
      )
        throw Error('Publication contains unrelated code or document assets');
      const director = await this.pr(session.reviewPr);
      if (session.publishedReviewSha && director.head.sha !== session.publishedReviewSha)
        throw Error('Director content changed after publication preparation; administrator must reconcile the publication PR and use /review retry');
    }
    return scope;
  }
  async display(state) {
    const pr = await this.pr(state.number),
      session = this.store.data.sessions[state.session];
    state.lifecycle = pr.merged ? 'merged' : pr.state;
    let failure = state.operationError || null;
    try {
      await this.validate(state, pr);
    } catch (e) {
      failure = e.message;
    }
    state.error = failure;
    const body = summary(state, session),
      comments = await this.comments(state.number);
    const previous = comments.find(
      (c) => c.user?.login === (this.api.botLogin || 'github-actions[bot]') && c.body.includes('<!-- review-summary-v2 -->'),
    );
    if (!previous) await this.api.request('POST', `${this.api.root}/issues/${state.number}/comments`, { body });
    else if (previous.body !== body) await this.api.request('PATCH', `${this.api.root}/issues/comments/${previous.id}`, { body });
    if (pr.state === 'open') {
      if (state.kind === 'content' && pr.title && !pr.title.startsWith('[Content]'))
        await this.api.request('PATCH', `${this.api.root}/pulls/${state.number}`, { title: `[Content] ${pr.title}` });
      const success = isComplete(state) && !failure && state.kind !== 'director';
      const gate = {
        state: success ? 'success' : 'pending',
        context: 'review-workflow',
        description: (
          failure ||
          (state.kind === 'director'
            ? 'Review-only PR: publication uses its linked PR'
            : success
              ? 'Review requirements satisfied; administrator may merge'
              : 'Awaiting classification or authoritative review')
        ).slice(0, 140),
      };
      const signature = JSON.stringify([pr.head.sha, gate]);
      if (state.lastGate !== signature) {
        await this.api.request('POST', `${this.api.root}/statuses/${pr.head.sha}`, gate);
        state.lastGate = signature;
      }
      await this.labels(state, pr);
      if (!state.lane)
        await this.notice(
          state,
          'classification',
          `@${this.api.repository.split('/')[0]}/docs-admin — classify this PR with \`/review classify <lane> <document|->\`. Builds run while classification is pending.`,
        );
      else if (!failure && !state.cancelled) {
        const stage = currentStage(state),
          s = state.stages[stage];
        if (stage && s?.reviewer) await this.requestReview(state, stage, `assignment-${stage}-${s.round}`);
        else if (stage)
          await this.notice(
            state,
            `need-${stage}-${s?.round || 0}`,
            `@${this.api.repository.split('/')[0]}/docs-admin — ${stage === 'editor' ? 'manually run the technical edit, then use `/review complete editor`, or assign a human editor.' : `assign the ${stage} reviewer.`}`,
          );
        else if (state.kind !== 'director')
          await this.notice(
            state,
            `merge-${state.lane}`,
            `@${this.api.repository.split('/')[0]}/docs-admin — review requirements are satisfied. Inspect the changes, fill document attribution manually, and merge when CI passes.`,
          );
      }
    }
    await this.store.save();
  }
  async labels(state, pr) {
    const desired = [
      `purpose:${state.kind || 'content'}`,
      `stage:${state.cancelled ? 'cancelled' : !state.lane ? 'needs-lane' : currentStage(state) || 'ready-to-merge'}`,
      ...(state.lane ? [`lane:${state.lane}`] : []),
    ];
    for (const name of desired) {
      if (pr.labels.some((l) => l.name === name)) continue;
      try {
        await this.api.request('POST', `${this.api.root}/labels`, { name, color: name.startsWith('purpose:') ? '5319e7' : '0366d6' });
      } catch (e) {
        if (e.status !== 422) throw e;
      }
      await this.api.request('POST', `${this.api.root}/issues/${state.number}/labels`, { labels: [name] });
    }
    for (const l of pr.labels)
      if (/^(stage|lane|purpose):/.test(l.name) && !desired.includes(l.name))
        await this.api.request('DELETE', `${this.api.root}/issues/${state.number}/labels/${encodeURIComponent(l.name)}`);
  }
  async command(state, action, actor, key) {
    if (state.processed?.includes(key)) return state;
    if (action.type !== 'ready' && !actor.isAdmin) throw Error('Only administrators can perform this action');
    if (action.type === 'ready') {
      if (!actor.isAdmin && !state.authors.includes(actor.login)) throw Error('Only authors or administrators request re-review');
      const stage = currentStage(state);
      if (!stage) throw Error('Only an administrator can restart a completed review');
      const pr = await this.pr(state.number);
      await this.requestReview(state, stage, `ready-${stage}-${state.stages[stage]?.round || 0}-${pr.head.sha}`);
    } else if (action.type === 'start-director') {
      await startDirector(this.api, this.store, state, action, actor, key);
    } else if (action.type === 'retry') {
      state.operationError = null;
      delete state.failedPreview;
      const session = this.store.data.sessions[state.session];
      const target = await this.pr(session?.publicationPr || session?.reviewPr || state.number);
      if (target.state === 'open') await dispatchBuild(this.api, target);
    } else if (action.type === 'retarget') {
      const session = this.store.data.sessions[state.session];
      if (!session) throw Error('No linked review session');
      if (session.publicationPr && (await this.pr(session.publicationPr)).merged) throw Error('Cannot retarget a merged publication');
      session.identityHistory ||= [];
      session.identityHistory.push({ document: session.document, version: session.version, actor: actor.login, at: new Date().toISOString() });
      session.document = action.document;
      session.version = action.version;
      for (const p of Object.values(this.store.data.prs)) if (p.session === session.id) p.document = action.document;
      state.operationError = null;
    } else {
      if (action.type === 'classify' && state.kind !== 'content') throw Error('Linked review/publication purpose cannot be reclassified');
      if (action.type === 'assign') {
        if (!/^[a-z\d](?:[a-z\d-]{0,38})$/i.test(action.login)) throw Error('Invalid reviewer login');
        const permission = await this.api.request('GET', `${this.api.root}/collaborators/${action.login}/permission`);
        if (permission.permission === 'none') throw Error('Reviewer must have repository access');
        action.reviewerIsAdmin = await this.api.admin(action.login);
      }
      const previousRound = state.stages[action.stage]?.round;
      const next = transition(state, action, actor);
      if (
        action.stage &&
        next.stages[action.stage] &&
        (next.stages[action.stage].round !== previousRound || ['complete', 'waive'].includes(action.type))
      )
        next.stages[action.stage].since = new Date().toISOString();
      Object.assign(state, next);
      if (state.history.length) state.history.at(-1).at = new Date().toISOString();
      if (action.type === 'classify') {
        const pr = await this.pr(state.number),
          files = await this.api.list(`${this.api.root}/pulls/${state.number}/files`);
        state.allowedCode = documentScope(
          files.flatMap((f) => [f.filename, ...(f.previous_filename ? [f.previous_filename] : [])]),
          readRegistry(await this.api.file('src/docConfig.js', pr.head.sha)),
        ).code;
      }
      state.operationError = null;
      if (action.type === 'cancel' && state.session) {
        const session = this.store.data.sessions[state.session];
        session.status = 'cancelled';
        await this.store.save();
        for (const number of [session.reviewPr, session.publicationPr].filter(Boolean)) {
          const pr = await this.pr(number);
          if (pr.state === 'open') await this.api.request('PATCH', `${this.api.root}/pulls/${number}`, { state: 'closed' });
        }
      }
    }
    state.processed ||= [];
    state.processed.push(key);
    await this.store.save();
    return state;
  }
  async event(eventName, event) {
    if (eventName === 'workflow_dispatch') {
      await this.reconcile();
      return;
    }
    if (eventName === 'workflow_run') {
      const run = event.workflow_run;
      if (run.name === 'Deploy to GitHub Pages' && run.conclusion === 'success' && run.head_branch === 'main')
        await reconcilePublished(this.api, this.store, run.head_sha);
    } else {
      const number = event.pull_request?.number || (event.issue?.pull_request ? event.issue.number : null);
      if (!number) return;
      const pr = await this.pr(number);
      let state = this.store.data.prs[number];
      if (!state && pr.base.ref !== 'main') return;
      if (!state) {
        state = createState(number, pr.user.login);
        this.store.data.prs[number] = state;
        await this.store.save();
      }
      if (eventName === 'issue_comment' && event.action === 'created') {
        const actor = { login: event.sender.login.toLowerCase(), isAdmin: await this.api.admin(event.sender.login) };
        if (!actor.isAdmin && !state.authors.includes(actor.login)) return;
        let action;
        try {
          action = parseCommand(event.comment.body);
        } catch (e) {
          if (!actor.isAdmin) return;
          state.operationError = e.message;
          await this.store.save();
          return this.display(state);
        }
        if (action) {
          // Untrusted comments must not be able to hold a valid PR hostage.
          if (!actor.isAdmin && !(action.type === 'ready' && state.authors.includes(actor.login))) return;
          try {
            await this.command(state, action, actor, `comment-${event.comment.id}`);
          } catch (e) {
            if (actor.isAdmin) {
              state.operationError = e.message;
              await this.store.save();
            }
          }
        }
      }
      if (eventName === 'pull_request_review' && event.action === 'submitted' && event.review.state.toLowerCase() === 'approved') {
        const stage = currentStage(state),
          assigned = state.stages[stage];
        if (
          assigned?.activatedAt &&
          assigned.reviewer === event.review.user.login.toLowerCase() &&
          event.review.submitted_at >= assigned.since &&
          !state.processed?.includes(`review-${event.review.id}`)
        ) {
          const updated = transition(
            state,
            { type: 'approve', stage, reviewId: event.review.id, round: assigned.round },
            { login: assigned.reviewer, isAdmin: assigned.reviewerIsAdmin },
          );
          Object.assign(state, updated);
          state.history.at(-1).at = event.review.submitted_at;
          state.processed ||= [];
          state.processed.push(`review-${event.review.id}`);
          await this.store.save();
        }
      }
    }
    await this.reconcile();
  }
  async reconcile() {
    // Recover work from webhook coalescing: durable commands and approvals can be replayed.
    for (const pr of await this.api.list(`${this.api.root}/pulls?state=open&base=main`)) {
      if (!this.store.data.prs[pr.number]) this.store.data.prs[pr.number] = createState(pr.number, pr.user.login);
    }
    await this.store.save();
    await synchronizeBuilds(this.api, this.store);
    for (const state of Object.values(this.store.data.prs)) {
      if (state.cancelled) continue;
      for (const comment of await this.comments(state.number)) {
        const key = `comment-${comment.id}`;
        if (state.processed?.includes(key) || !comment.body.trim().startsWith('/review ') || comment.user.type === 'Bot') continue;
        // Commands are immutable submissions: do not execute later edits to old comments.
        if (comment.updated_at !== comment.created_at) continue;
        const actor = { login: comment.user.login.toLowerCase(), isAdmin: await this.api.admin(comment.user.login) };
        if (!actor.isAdmin && !state.authors.includes(actor.login)) continue;
        try {
          const action = parseCommand(comment.body);
          if (action && (actor.isAdmin || action.type === 'ready')) await this.command(state, action, actor, key);
        } catch (e) {
          if (actor.isAdmin) {
            state.operationError = e.message;
            state.processed ||= [];
            state.processed.push(key);
            await this.store.save();
          }
        }
      }
      const stage = currentStage(state),
        assigned = state.stages[stage];
      if (!assigned?.reviewer || !assigned.activatedAt || (state.kind === 'director' && !state.previewReady)) continue;
      const reviews = await this.api.list(`${this.api.root}/pulls/${state.number}/reviews`);
      const approval = reviews
        .filter(
          (r) =>
            r.user.login.toLowerCase() === assigned.reviewer &&
            ['APPROVED', 'CHANGES_REQUESTED'].includes(r.state) &&
            r.submitted_at >= assigned.since &&
            !state.processed?.includes(`review-${r.id}`),
        )
        .at(-1);
      if (approval?.state === 'APPROVED') {
        const updated = transition(
          state,
          { type: 'approve', stage, reviewId: approval.id, round: assigned.round },
          { login: assigned.reviewer, isAdmin: assigned.reviewerIsAdmin },
        );
        Object.assign(state, updated);
        state.processed ||= [];
        state.processed.push(`review-${approval.id}`);
        state.history.at(-1).at = approval.submitted_at;
        await this.store.save();
      }
    }
    for (const session of Object.values(this.store.data.sessions)) {
      if (session.status === 'preparing') {
        try {
          await resumePreparing(this.api, this.store, session);
        } catch (e) {
          const origin = this.store.data.prs[session.originPr];
          origin.operationError = e.message;
          await this.store.save();
          await this.notice(
            origin,
            `preparation-failure-${session.id}`,
            `@${this.api.repository.split('/')[0]}/docs-admin — Director setup needs intervention. See the summary and use \`/review retry\` after correcting the issue.`,
          );
        }
      }
      if (session.status === 'cancelled') {
        for (const number of [session.reviewPr, session.publicationPr].filter(Boolean)) {
          const pr = await this.pr(number);
          if (this.store.data.prs[number]) this.store.data.prs[number].cancelled = true;
          if (pr.state === 'open') await this.api.request('PATCH', `${this.api.root}/pulls/${number}`, { state: 'closed' });
        }
        continue;
      }
      const state = this.store.data.prs[session.reviewPr];
      if (state && isComplete(state) && !['published', 'cancelled'].includes(session.status)) {
        try {
          await preparePublication(this.api, this.store, session);
          state.operationError = null;
        } catch (e) {
          state.operationError = e.message;
          await this.store.save();
          await this.notice(
            state,
            `publication-failure-${session.id}`,
            `@${this.api.repository.split('/')[0]}/docs-admin — publication preparation needs intervention. See the review summary; correct the issue and use \`/review retry\`.`,
          );
        }
      }
    }
    if (Object.values(this.store.data.sessions).some((s) => ['awaiting-publication', 'published'].includes(s.status))) {
      try {
        await reconcilePublished(this.api, this.store, await deployedMain(this.api));
      } catch (e) {
        if (!e.message.includes('No successful production deployment')) throw e;
      }
    }
    for (const state of Object.values(this.store.data.prs)) await this.display(state);
  }
}
async function main() {
  if (!process.env.REVIEW_TOKEN) throw Error('The protected review controller App token is required');
  const api = new GitHub({ token: process.env.REVIEW_TOKEN || process.env.GITHUB_TOKEN, repository: process.env.GITHUB_REPOSITORY });
  const store = new Store(api);
  await store.read();
  const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  await new Controller(api, store).event(process.argv[2] === 'reconcile' ? 'workflow_dispatch' : process.env.GITHUB_EVENT_NAME, event);
}
if (require.main === module)
  main().catch((e) => {
    console.error(e.message);
    process.exitCode = 1;
  });
module.exports = { Controller, parseCommand, summary, shouldRetainPreview };
