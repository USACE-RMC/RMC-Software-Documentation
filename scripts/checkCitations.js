/**
 * checkCitations.js — compares author-year text in each document with its bibliography.
 *
 * For every document version that has static/bibliographies/<doc>/<version>/bib.json it reports:
 *   missing   <Citation> with no "(Author, Year)" or "Author (Year)" text right before it
 *             (and no `form` prop, which would write the text itself)
 *   mismatch  the text before a <Citation> names a different year, or not the entry's first author
 *   no entry  an author-year in the text that matches no bibliography entry (e.g. a source that was
 *             cited in prose but never added to bib.json)
 *
 * Usage:
 *   npm run check-citations                     # every document
 *   npm run check-citations -- docs/web-applications/system-response
 *   npm run check-citations -- --summary        # one line per document
 *
 * It never fails the build; it is a report. Fix an organization's short name with "citeAs" in bib.json.
 */

const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');
const { citationLabel, splitAuthors, surname } = require('./lib/citationLabel');

const root = path.join(__dirname, '..');
const args = process.argv.slice(2);
const summaryOnly = args.includes('--summary');
const scopes = args.filter((a) => !a.startsWith('--')).map((a) => a.replace(/\\/g, '/').replace(/\/$/, ''));

const NOT_AUTHORS = new Set(
  'Table Figure Equation Video Section Chapter Appendix Version Step Node Stage Volume Part Page January February March April May June July August September October November December Since In On By For From The A An See And Or Report Manual Guide Note EM ER ETL'.split(
    ' ',
  ),
);

const norm = (s) =>
  String(s || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[’']/g, "'");

// "Federal Emergency Management Agency" -> "fema", "U.S. Army Corps of Engineers" -> "usace"
function acronym(name) {
  return String(name || '')
    .replace(/\(.*?\)/g, ' ')
    .split(/\s+/)
    .filter((w) => w && !/^(of|and|for|the|on|in|&)$/i.test(w))
    .map((w) => (/^([A-Z]\.)+$/.test(w) ? w.replace(/\./g, '') : /^[A-Z]{2,}$/.test(w) ? w : w[0]))
    .join('')
    .toLowerCase();
}

// Every way the text may name an author: surname, organization name, its acronym, citeAs.
function nameForms(entry) {
  const names = splitAuthors(entry.author);
  const src = names.length ? names : [entry.organization || entry.institution || ''];
  const forms = new Set();
  for (const n of src) {
    forms.add(norm(surname(n)));
    const acr = acronym(n);
    if (acr.length >= 2) forms.add(acr);
    const paren = String(n).match(/\(([^)]+)\)/);
    if (paren) forms.add(norm(paren[1]));
  }
  if (entry.citeAs) forms.add(norm(entry.citeAs));
  forms.delete('');
  return [...forms];
}

// Standards are cited by designation, not author-year ("ASTM D2487 <Citation/>").
const STANDARD_RE = /\b(ASTM|ASCE(?:\/SEI)?|AASHTO|ISO|ANSI|API|EM|ER|ETL|EP|DS|FEMA P)[\s/-]*[A-Z]?[\d][\w.\-/]*$/;

function stripCode(text) {
  return text.replace(/```[\s\S]*?```/g, (m) => m.replace(/[^\n]/g, ' ')).replace(/^import .*$/gm, (m) => ' '.repeat(m.length));
}

function lineOf(text, index) {
  return text.slice(0, index).split('\n').length;
}

function checkDoc(docDir, bibFile) {
  const bib = JSON.parse(fs.readFileSync(bibFile, 'utf8'));
  const byKey = new Map(bib.filter((e) => e && e.citationKey).map((e) => [e.citationKey, e]));
  // All surname/year pairs known to the bibliography (any author position).
  const known = bib.map((e) => ({ year: String(e.year ?? ''), names: nameForms(e) }));

  const issues = [];
  for (const file of globSync('*.mdx', { cwd: docDir })) {
    const full = path.join(docDir, file);
    const text = stripCode(fs.readFileSync(full, 'utf8'));
    const rel = path.relative(root, full).replace(/\\/g, '/');

    // 1. Each <Citation>: text before it.
    for (const m of text.matchAll(/<Citation\b([^>]*?)\/?>/g)) {
      const attrs = m[1];
      const key = attrs.match(/citationKey="([^"]+)"/)?.[1];
      if (!key || /\bform=/.test(attrs)) continue;
      const before = text
        .slice(Math.max(0, m.index - 200), m.index)
        .replace(/\{\s*['"]\s*['"]\s*\}/g, '')
        .replace(/\{"\\n"\}/g, ' ')
        .replace(/\s+$/, '');
      const entry = byKey.get(key);
      const ay = before.match(/(?:\(([^()]*?(?:\d{4}[a-z]?|n\.d\.))\)|(\S.{0,100}?)\s\((\d{4}[a-z]?|n\.d\.)\))$/s);
      if (!ay) {
        if (STANDARD_RE.test(before)) continue;
        // Several citations in a row share one author-year group: "(A, 2001; B, 2002) <Citation/> <Citation/>"
        if (/<\/?Citation[^>]*>?$/.test(before) || /\/>$/.test(before)) continue;
        issues.push({ kind: 'missing', file: rel, line: lineOf(text, m.index), detail: `${key}: no author-year text before the citation` });
        continue;
      }
      if (!entry) {
        issues.push({ kind: 'no entry', file: rel, line: lineOf(text, m.index), detail: `${key}: key not in bib.json` });
        continue;
      }
      const label = citationLabel(entry);
      const chunk = norm(ay[0]);
      const forms = nameForms(entry);
      const nameOk = forms.length === 0 || forms.some((f) => chunk.includes(f));
      if (!chunk.includes(norm(label.year)) || !nameOk) {
        issues.push({
          kind: 'mismatch',
          file: rel,
          line: lineOf(text, m.index),
          detail: `${key}: text "${ay[0].trim().slice(-60)}" vs bib "${label.authors}, ${label.year}"`,
        });
      }
    }

    // 2. Author-year strings that match no bibliography entry.
    const patterns = [
      /\b(\p{Lu}[\p{L}'’-]+(?:\s(?:de|van|von|der|den|la|du)\s\p{Lu}?[\p{L}'’-]+)?)(?:\s(?:et al\.|and\s\p{Lu}[\p{L}'’-]+))?\s\((\d{4})[a-z]?\)/gu,
      /\((\p{Lu}[\p{L}'’-]+)(?:\s(?:et al\.|and\s\p{Lu}[\p{L}'’-]+))?,\s(\d{4})[a-z]?\)/gu,
    ];
    for (const re of patterns) {
      for (const m of text.matchAll(re)) {
        const name = m[1];
        const year = m[2];
        if (NOT_AUTHORS.has(name)) continue;
        const n = norm(name);
        const hit = known.some((k) => k.year.startsWith(year) && k.names.some((s) => s === n || s.split(' ').includes(n)));
        if (!hit) issues.push({ kind: 'no entry', file: rel, line: lineOf(text, m.index), detail: `"${m[0]}" matches no bib.json entry` });
      }
    }
  }
  return issues;
}

function main() {
  const bibRoot = path.join(root, 'static', 'bibliographies');
  const bibs = globSync('**/bib.json', { cwd: bibRoot }).map((f) => f.replace(/\\/g, '/'));
  let total = 0;
  let docs = 0;
  for (const b of bibs.sort()) {
    const docRel = `docs/${path.posix.dirname(b)}`;
    if (scopes.length && !scopes.some((s) => docRel.startsWith(s) || s.startsWith(docRel))) continue;
    const docDir = path.join(root, docRel);
    if (!fs.existsSync(docDir)) continue;
    let issues;
    try {
      issues = checkDoc(docDir, path.join(bibRoot, b));
    } catch (e) {
      console.warn(`⚠️ ${docRel}: ${e.message}`);
      continue;
    }
    // de-duplicate identical findings
    const seen = new Set();
    issues = issues.filter((i) => {
      const k = `${i.kind}|${i.file}|${i.line}|${i.detail}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
    if (!issues.length) continue;
    docs++;
    total += issues.length;
    const counts = issues.reduce((a, i) => ((a[i.kind] = (a[i.kind] || 0) + 1), a), {});
    console.log(
      `\n${docRel}: ${Object.entries(counts)
        .map(([k, v]) => `${v} ${k}`)
        .join(', ')}`,
    );
    if (!summaryOnly) for (const i of issues) console.log(`  ${i.kind.padEnd(8)} ${i.file}:${i.line}  ${i.detail}`);
  }
  console.log(total ? `\nCitation check: ${total} findings in ${docs} documents (report only).` : '\nCitation check: no findings.');
}

main();
