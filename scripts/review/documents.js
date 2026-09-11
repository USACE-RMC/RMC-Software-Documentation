'use strict';
// Never require/eval a PR's docConfig.js: it is untrusted executable source.
const acorn = require('acorn');
function entries(source) {
  const ast = acorn.parse(source, { ecmaVersion: 2022, sourceType: 'script' });
  const declaration = ast.body.flatMap((n) => (n.type === 'VariableDeclaration' ? n.declarations : [])).filter((n) => n.id.name === 'docs');
  if (declaration.length !== 1 || declaration[0].init.type !== 'ArrayExpression') throw Error('Registry must contain one literal docs array');
  return declaration[0].init.elements.map((node) => {
    if (!node || node.type !== 'ObjectExpression') throw Error('Registry entries must be literal objects');
    const values = {},
      positions = {};
    for (const p of node.properties) {
      if (p.type !== 'Property' || p.computed || p.kind !== 'init' || p.value.type !== 'Literal') throw Error('Registry properties must be literals');
      const key = p.key.name || p.key.value;
      if (Object.hasOwn(values, key)) throw Error('Duplicate registry property');
      values[key] = p.value.value;
      positions[key] = p.value;
    }
    return { values, positions };
  });
}
function readRegistry(source) {
  return entries(source).map((e) => e.values);
}
function validLocation(location) {
  if (
    typeof location !== 'string' ||
    !/^[a-zA-Z0-9][a-zA-Z0-9_./-]*$/.test(location) ||
    location.split('/').some((p) => !p || p === '.' || p === '..')
  )
    throw Error('Invalid document location');
  return location;
}
function flipDraft(source, location) {
  validLocation(location);
  const matches = entries(source).filter((e) => e.values.doc_location === location);
  if (matches.length !== 1) throw Error('Document identity must match exactly one registry entry');
  const { values, positions } = matches[0];
  if (values.active !== true || typeof values.draft !== 'boolean') throw Error('Publication requires an active document with a draft flag');
  if (!values.draft) return source;
  return source.slice(0, positions.draft.start) + 'false' + source.slice(positions.draft.end);
}
const ASSET_ROOTS = ['figures', 'bibliographies', 'files', 'downloads'];
function registryMap(source) {
  const result = new Map();
  for (const entry of readRegistry(source)) {
    // Download-only landing-page tiles have no MDX document identity.
    if (!Object.hasOwn(entry, 'doc_location') && typeof entry.downloadUrl === 'string' && entry.downloadUrl.trim()) continue;
    const location = validLocation(entry.doc_location);
    if (result.has(location)) throw Error(`Duplicate document location: ${location}`);
    result.set(location, entry);
  }
  return result;
}
function canonicalEntry(entry) {
  return JSON.stringify(
    Object.fromEntries(
      Object.keys(entry)
        .sort()
        .map((key) => [key, entry[key]]),
    ),
  );
}
function registryChanges(beforeSource, afterSource) {
  const before = registryMap(beforeSource),
    after = registryMap(afterSource),
    changed = [];
  for (const location of new Set([...before.keys(), ...after.keys()])) {
    if (!before.has(location) || !after.has(location) || canonicalEntry(before.get(location)) !== canonicalEntry(after.get(location)))
      changed.push(location);
  }
  return changed.sort();
}
function assetOwner(filename, locations) {
  for (const root of ASSET_ROOTS) {
    const prefix = `static/${root}/`;
    if (!filename.startsWith(prefix)) continue;
    const path = filename.slice(prefix.length);
    return locations.find((location) => path.startsWith(`${location}/`)) || null;
  }
  return undefined;
}
function documentScope(files, registry) {
  const locations = registry
    .filter((d) => d.doc_location)
    .map((d) => d.doc_location)
    .sort((a, b) => b.length - a.length);
  const documents = new Set(),
    unknown = [],
    code = [];
  for (const filename of files) {
    if (filename.startsWith('docs/')) {
      const path = filename.slice(5);
      const known = locations.find((loc) => path.startsWith(loc + '/'));
      if (known) documents.add(known);
      else if (path.startsWith('dev/')) documents.add(path.split('/').slice(0, 2).join('/'));
      else {
        const version = path.match(/^(.*?)\/v\d[^/]*\//);
        if (version) documents.add(version[1]);
        else unknown.push(filename);
      }
    } else if (filename.startsWith('static/')) {
      const owner = assetOwner(filename, locations);
      if (owner) documents.add(owner);
      else if (owner === null) unknown.push(filename);
      else code.push(filename);
    } else if (filename !== 'src/docConfig.js') code.push(filename);
  }
  return { documents: [...documents].sort(), unknown, code };
}
function inScope(path, location) {
  const selected = validLocation(location);
  return path.startsWith(`docs/${selected}/`) || ASSET_ROOTS.some((root) => path.startsWith(`static/${root}/${selected}/`));
}
function publicationChanges(original, reviewed, main, location) {
  const changes = {};
  for (const path of new Set([...Object.keys(original), ...Object.keys(reviewed)])) {
    if (original[path] === reviewed[path]) continue;
    if (!inScope(path, location)) throw Error(`Review changes outside selected document/assets: ${path}`);
    if (main[path] !== original[path] && main[path] !== reviewed[path])
      throw Error(`Publication conflict needs administrator reconciliation: ${path}`);
    if (main[path] !== reviewed[path]) changes[path] = reviewed[path] ?? null;
  }
  return changes;
}
function latestVersion(paths, location) {
  const root = `docs/${validLocation(location)}/`;
  const versions = [
    ...new Set(
      paths
        .filter((p) => p.startsWith(root))
        .map((p) => p.slice(root.length).split('/')[0])
        .filter((v) => /^v\d+(\.\d+)*$/.test(v)),
    ),
  ];
  versions.sort((a, b) => {
    const aa = a.slice(1).split('.').map(Number),
      bb = b.slice(1).split('.').map(Number);
    for (let i = 0; i < Math.max(aa.length, bb.length); i++) if ((aa[i] || 0) !== (bb[i] || 0)) return (aa[i] || 0) - (bb[i] || 0);
    return 0;
  });
  return versions.at(-1) || 'unversioned';
}
module.exports = { readRegistry, flipDraft, validLocation, documentScope, registryChanges, publicationChanges, inScope, latestVersion };
