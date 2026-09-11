const test = require('node:test');
const assert = require('node:assert/strict');
const { readRegistry, flipDraft, documentScope, publicationChanges, registryChanges, validLocation } = require('../scripts/review/documents');
const source = `const docs = [{doc_location:'a/manual', active:true, draft:true},{doc_location:'b/manual',active:true,draft:true}]; module.exports={docs};`;
test('actual registry supports PDF-only tiles while detecting document changes', () => {
  const registry = require('node:fs').readFileSync(require('node:path').join(__dirname, '../src/docConfig.js'), 'utf8');
  assert.deepEqual(registryChanges(registry, registry), []);
  const changed = registry.replace('const docs = [', "const docs = [{doc_location:'regression/manual',active:true,draft:true},");
  assert.deepEqual(registryChanges(registry, changed), ['regression/manual']);
});

test('PDF-only tiles need no document path but malformed document entries are rejected', () => {
  const pdf = `const docs=[{downloadUrl:'/report.pdf',doc_name:'Report'}];`;
  assert.deepEqual(registryChanges(pdf, pdf), []);
  for (const entry of ['{}', "{downloadUrl:''}", "{doc_location:null,downloadUrl:'/report.pdf'}"]) {
    assert.throws(() => registryChanges(`const docs=[${entry}];`, source), /Invalid document location/);
  }
});

test('document locations reject non-string values with a validation error', () => {
  for (const value of [undefined, null, 123, true, {}, '']) {
    assert.throws(() => validLocation(value), /Invalid document location/);
  }
});
test('only the explicitly selected registry flag changes', () => {
  const result = flipDraft(source, 'a/manual');
  assert.equal(readRegistry(result)[0].draft, false);
  assert.equal(readRegistry(result)[1].draft, true);
  assert.match(result, /active:true/);
});
test('untrusted registry code is parsed, never executed', () => {
  assert.throws(() => readRegistry(`const docs = process.exit();`));
  assert.throws(() => flipDraft(source, 'missing'));
  assert.throws(() => flipDraft(source.replace("'b/manual'", "'a/manual'"), 'a/manual'));
});
test('scope counts documents rather than chapter or figure files', () => {
  const registry = readRegistry(source);
  assert.deepEqual(documentScope(['docs/a/manual/01.mdx', 'docs/a/manual/02.mdx', 'static/figures/a/manual/one.png'], registry).documents, [
    'a/manual',
  ]);
  assert.equal(documentScope(['docs/a/manual/01.mdx', 'docs/b/manual/02.mdx'], registry).documents.length, 2);
});
test('scope attributes supported asset roots and catches asset-only multi-document changes', () => {
  const registry = readRegistry(source);
  const scope = documentScope(['static/figures/a/manual/one.png', 'static/bibliographies/b/manual/references.json'], registry);
  assert.deepEqual(scope.documents, ['a/manual', 'b/manual']);
  assert.deepEqual(documentScope(['static/files/a/manual/data.zip'], registry).documents, ['a/manual']);
  assert.deepEqual(documentScope(['static/downloads/b/manual/report.pdf'], registry).documents, ['b/manual']);
  assert.deepEqual(documentScope(['static/figures/not-registered/image.png'], registry).unknown, ['static/figures/not-registered/image.png']);
  assert.deepEqual(documentScope(['static/css/site.css'], registry).code, ['static/css/site.css']);
});
test('registry changes report each added, removed, or edited document identity', () => {
  const before = `const docs=[
    {doc_location:'a/manual',active:true,draft:true,title:'A'},
    {doc_location:'b/manual',active:true,draft:true}
  ];`;
  const after = `const docs=[
    {doc_location:'a/manual',active:true,draft:false,title:'A'},
    {doc_location:'c/manual',active:true,draft:true}
  ];`;
  assert.deepEqual(registryChanges(before, after), ['a/manual', 'b/manual', 'c/manual']);
  assert.deepEqual(registryChanges(before, before), []);
});
test('registry change comparison rejects duplicate document locations', () => {
  const duplicate = `const docs=[{doc_location:'a/manual'},{doc_location:'a/manual'}];`;
  assert.throws(() => registryChanges(duplicate, source), /duplicate document location/i);
  assert.throws(() => registryChanges(source, duplicate), /duplicate document location/i);
});
test('publication preserves unrelated main work but rejects conflicting document edits', () => {
  const original = { 'docs/a/manual/01.mdx': 'old', 'src/x.js': 'original' };
  const reviewed = { ...original, 'docs/a/manual/01.mdx': 'fixed' };
  const main = { ...original, 'src/x.js': 'other work' };
  assert.deepEqual(publicationChanges(original, reviewed, main, 'a/manual'), { 'docs/a/manual/01.mdx': 'fixed' });
  assert.throws(() => publicationChanges(original, reviewed, { ...main, 'docs/a/manual/01.mdx': 'conflict' }, 'a/manual'), /conflict/i);
  assert.throws(() => publicationChanges(original, { ...reviewed, 'src/x.js': 'unexpected' }, main, 'a/manual'), /outside/i);
});
test('publication accepts only selected document asset roots', () => {
  const original = {
    'docs/a/manual/01.mdx': 'old',
    'static/figures/a/manual/chart.png': 'old-chart',
  };
  const reviewed = { ...original, 'static/figures/a/manual/chart.png': 'new-chart' };
  assert.deepEqual(publicationChanges(original, reviewed, original, 'a/manual'), {
    'static/figures/a/manual/chart.png': 'new-chart',
  });
  assert.throws(
    () => publicationChanges(original, { ...reviewed, 'static/figures/b/manual/chart.png': 'foreign' }, original, 'a/manual'),
    /outside/i,
  );
  assert.throws(() => publicationChanges(original, { ...reviewed, 'static/site.css': 'foreign' }, original, 'a/manual'), /outside/i);
});
