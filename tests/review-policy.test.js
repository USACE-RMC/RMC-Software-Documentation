const test = require('node:test');
const assert = require('node:assert/strict');

const { LANES, createState, currentStage, isComplete, transition } = require('../scripts/review/policy');

const admin = { login: 'AdminUser', isAdmin: true };
const author = { login: 'Writer', isAdmin: false };

function classify(state, lane = 'new', document = 'docs/manual') {
  return transition(state, { type: 'classify', lane, document }, admin);
}

function assign(state, stage, login, reviewerIsAdmin = false) {
  return transition(state, { type: 'assign', stage, login, reviewerIsAdmin }, admin);
}

test('lane requirements match every supported review path', () => {
  assert.deepEqual(LANES, {
    new: ['peer', 'lead', 'editor'],
    major: ['peer', 'lead', 'editor'],
    minor: ['peer', 'editor'],
    editorial: [],
    dev: [],
    code: [],
    director: ['director'],
    publication: [],
  });

  for (const [lane, stages] of Object.entries(LANES)) {
    const state = classify(createState(18, 'WRITER'), lane, lane === 'code' ? '-' : 'docs/manual');
    assert.equal(currentStage(state), stages[0] ?? null, lane);
    assert.equal(isComplete(state), stages.length === 0, lane);
  }
});

test('new state normalizes the author and has no inferred classification', () => {
  assert.deepEqual(createState(42, 'MixedCase'), {
    number: 42,
    authors: ['mixedcase'],
    lane: null,
    document: null,
    stages: {},
    history: [],
    kind: 'content',
    cancelled: false,
    notifications: {},
  });
});

test('transitions clone their input and record normalized actor and action identity', () => {
  const original = createState(1, 'Writer');
  const next = classify(original, 'minor', 'docs/guide');
  assert.equal(original.lane, null);
  assert.notEqual(next, original);
  assert.deepEqual(next.history[0], {
    actor: { login: 'adminuser', isAdmin: true, role: 'admin' },
    action: { type: 'classify', lane: 'minor', document: 'docs/guide' },
  });
});

test('classification preserves completed applicable stages and rejects document replacement', () => {
  let state = classify(createState(2, 'Writer'), 'minor', 'docs/guide');
  state = assign(state, 'peer', 'Peer');
  state = transition(state, { type: 'approve', stage: 'peer', reviewId: 101 }, { login: 'Peer', isAdmin: false });
  state = classify(state, 'major', 'docs/guide');
  assert.equal(state.stages.peer.status, 'approved');
  assert.equal(currentStage(state), 'lead');
  assert.throws(() => classify(state, 'major', 'docs/other'), /document/i);
});

test('admin-only actions reject non-admin actors', () => {
  const state = classify(createState(3, 'Writer'));
  for (const action of [
    { type: 'classify', lane: 'minor', document: 'docs/manual' },
    { type: 'author', login: 'Alias' },
    { type: 'assign', stage: 'peer', login: 'Peer', reviewerIsAdmin: false },
    { type: 'complete', stage: 'peer' },
    { type: 'waive', stage: 'peer' },
    { type: 'restart', stage: 'peer' },
    { type: 'cancel' },
  ]) {
    assert.throws(() => transition(state, action, author), /unauthorized/i, action.type);
  }
});

test('assignment enforces one non-admin authority, author independence, and cross-stage separation', () => {
  let state = classify(createState(4, 'Writer'));
  state = transition(state, { type: 'author', login: 'CoAuthor' }, admin);
  assert.throws(() => assign(state, 'peer', 'writer'), /author/i);
  assert.throws(() => assign(state, 'peer', 'COAUTHOR'), /author/i);
  state = assign(state, 'peer', 'Reviewer');
  assert.deepEqual(state.stages.peer, {
    reviewer: 'reviewer',
    reviewerIsAdmin: false,
    round: 1,
    status: 'pending',
  });
  assert.throws(() => assign(state, 'lead', 'REVIEWER'), /multiple stages/i);
});

test('admin reviewers bypass author and cross-stage identity restrictions', () => {
  let state = classify(createState(5, 'Writer'));
  state = assign(state, 'peer', 'Writer', true);
  state = assign(state, 'lead', 'Writer', true);
  assert.equal(state.stages.peer.reviewer, 'writer');
  assert.equal(state.stages.lead.reviewer, 'writer');
});

test('director may be assigned during new content review without becoming a required content stage', () => {
  let state = classify(createState(11, 'Writer'));
  state = assign(state, 'director', 'Director');
  assert.deepEqual(state.stages.director, {
    reviewer: 'director',
    reviewerIsAdmin: false,
    round: 1,
    status: 'pending',
  });
  assert.equal(currentStage(state), 'peer');
});

test('replaced non-admin reviewers remain unavailable for a different stage', () => {
  let state = classify(createState(12, 'Writer'));
  state = assign(state, 'peer', 'First');
  state = assign(state, 'peer', 'Second');
  assert.throws(() => assign(state, 'lead', 'First'), /multiple stages/i);
});

test('an author alias cannot overlap a current or historical non-admin reviewer', () => {
  let state = classify(createState(13, 'Writer'));
  state = assign(state, 'peer', 'First');
  assert.throws(() => transition(state, { type: 'author', login: 'FIRST' }, admin), /reviewer/i);

  state = assign(state, 'peer', 'Second');
  assert.throws(() => transition(state, { type: 'author', login: 'first' }, admin), /reviewer/i);
});

test('repeating the same assignment is idempotent', () => {
  let state = classify(createState(14, 'Writer'));
  state = assign(state, 'peer', 'Peer');
  const repeated = assign(state, 'peer', 'PEER');
  assert.deepEqual(repeated, state);
  assert.notEqual(repeated, state);
});

test('future stages may be assigned but only the current authoritative reviewer may approve', () => {
  let state = classify(createState(6, 'Writer'));
  state = assign(state, 'editor', 'Editor');
  state = assign(state, 'lead', 'Lead');
  state = assign(state, 'peer', 'Peer');
  assert.throws(() => transition(state, { type: 'approve', stage: 'lead', reviewId: 20 }, { login: 'Lead', isAdmin: false }), /current stage/i);
  assert.throws(
    () => transition(state, { type: 'approve', stage: 'peer', reviewId: 21 }, { login: 'Other', isAdmin: false }),
    /authoritative reviewer/i,
  );
  state = transition(state, { type: 'approve', stage: 'peer', reviewId: 22 }, { login: 'PEER', isAdmin: false });
  assert.equal(state.stages.peer.status, 'approved');
  assert.equal(state.stages.peer.reviewId, 22);
  assert.equal(currentStage(state), 'lead');
});

test('admin completion needs no editor assignment and waiver may satisfy any required stage', () => {
  let state = classify(createState(7, 'Writer'), 'minor');
  state = transition(state, { type: 'waive', stage: 'peer', reason: 'Unavailable' }, admin);
  assert.equal(state.stages.peer.status, 'waived');
  assert.equal(state.stages.peer.reason, 'Unavailable');
  state = transition(state, { type: 'complete', stage: 'editor' }, admin);
  assert.equal(state.stages.editor.status, 'approved');
  assert.equal(state.stages.editor.completedBy, 'adminuser');
  assert.equal(isComplete(state), true);
});

test('reassignment cannot erase completion and restart opens only the selected stage in a fresh round', () => {
  let state = classify(createState(8, 'Writer'));
  state = assign(state, 'peer', 'Peer');
  state = transition(state, { type: 'approve', stage: 'peer', reviewId: 30, round: 1 }, { login: 'Peer', isAdmin: false });
  state = assign(state, 'peer', 'Replacement');
  assert.equal(state.stages.peer.status, 'approved');
  assert.equal(state.stages.peer.reviewer, 'peer');
  state = transition(state, { type: 'waive', stage: 'lead' }, admin);
  state = transition(state, { type: 'restart', stage: 'peer', reason: 'Content changed' }, admin);
  assert.deepEqual(state.stages.peer, {
    reviewer: 'peer',
    reviewerIsAdmin: false,
    round: 2,
    status: 'pending',
    restartReason: 'Content changed',
  });
  assert.equal(state.stages.lead.status, 'waived');
  assert.throws(() => transition(state, { type: 'approve', stage: 'peer', reviewId: 31, round: 1 }, { login: 'Peer', isAdmin: false }), /stale/i);
});

test('pending reassignment creates a fresh round and invalidates old-round approvals', () => {
  let state = classify(createState(9, 'Writer'));
  state = assign(state, 'peer', 'First');
  state = assign(state, 'peer', 'Second');
  assert.equal(state.stages.peer.round, 2);
  assert.equal(state.stages.peer.reviewer, 'second');
  assert.throws(() => transition(state, { type: 'approve', stage: 'peer', reviewId: 40, round: 1 }, { login: 'Second', isAdmin: false }), /stale/i);
});

test('cancelled sessions reject delayed review actions', () => {
  let state = classify(createState(10, 'Writer'), 'director');
  state = assign(state, 'director', 'Director');
  state = transition(state, { type: 'cancel' }, admin);
  assert.equal(state.cancelled, true);
  assert.equal(isComplete(state), false);
  assert.throws(() => transition(state, { type: 'approve', stage: 'director', reviewId: 50 }, { login: 'Director', isAdmin: false }), /cancelled/i);
});
