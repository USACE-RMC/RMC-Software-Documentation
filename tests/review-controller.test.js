const test = require('node:test');
const assert = require('node:assert/strict');
const { parseCommand, summary, shouldRetainPreview } = require('../scripts/review/controller');
test('commands are explicit and reject trailing or ambiguous input', () => {
  assert.deepEqual(parseCommand('/review classify new a/manual'), { type: 'classify', lane: 'new', document: 'a/manual' });
  assert.equal(parseCommand('Please /review waive peer'), null);
  assert.deepEqual(parseCommand('/review waive director'), { type: 'waive', stage: 'director', reason: '' });
  assert.throws(() => parseCommand('/review assign peer person extra'));
});
test('Director preview survives closure and approval until deployment or cancellation', () => {
  assert.equal(shouldRetainPreview({ kind: 'director', session: '1' }, { status: 'approved' }), true);
  assert.equal(shouldRetainPreview({ kind: 'director', session: '1' }, { status: 'published' }), false);
  assert.equal(shouldRetainPreview({ kind: 'director', session: '1' }, { status: 'cancelled' }), false);
  assert.equal(shouldRetainPreview({ kind: 'content' }, null), false);
});
test('summary distinguishes waiver from approval and does not mention people', () => {
  const text = summary(
    { number: 1, lane: 'new', document: 'a/manual', stages: { peer: { status: 'waived', reviewer: 'alice' } }, authors: ['bob'] },
    null,
  );
  assert.match(text, /waived/i);
  assert.equal(text.includes('@alice'), false);
});
