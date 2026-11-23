/**
 * Author-year labels for bibliography entries (static/bibliographies/<doc>/<version>/bib.json).
 * Shared by scripts/generateCitationLabels.js (which feeds the Citation component's `form` prop)
 * and scripts/checkCitations.js.
 *
 * Rules (APA-style author part):
 *   1 author  -> "Barron"            2 authors -> "Kenney and Lau"       3+ -> "van Beek et al."
 * Names may be "R. A. Barron", "Stedinger, J. R." or an organization. An organization ending in an
 * abbreviation in parentheses ("Federal Emergency Management Agency (FEMA)") is cited by the
 * abbreviation. Entries without authors use `organization` or `institution`.
 * A bib entry may set "citeAs" to override the author part, e.g. "citeAs": "USACE".
 */

const INITIALS_RE = /^((?:\p{Lu}\.\s*|\p{Lu}\p{Ll}?\.\s*|\p{Lu}\.-\p{Lu}\.\s*)+)(.*)$/u;

function splitAuthors(author) {
  if (Array.isArray(author)) return author.filter(Boolean).map(String);
  if (typeof author !== 'string' || !author.trim()) return [];
  const s = author.trim();
  if (/\s+and\s+/.test(s) && !s.includes(',')) return s.split(/\s+and\s+/);
  const parts = s.split(/\s*,\s*/).filter(Boolean);
  // "V.M. van Beek, Q. Yao" -> several people; "Stedinger, J. R." or an organization -> one name.
  if (parts.length > 1 && parts.every((p) => INITIALS_RE.test(p) && INITIALS_RE.exec(p)[2].trim())) return parts;
  return [s];
}

const ORG_RE =
  /\b(of|for|Corps|Agency|Department|Center|Centre|Institute|Inc\.?|Association|Foundation|Engineers|Society|Company|Corporation|Bureau|Service|Survey|Administration|Commission|Council|University|Laboratory|International|Government|Authority|Ministry|Office|Group)\b/;

function surname(name) {
  const n = String(name).trim();
  const abbr = n.match(/\(([A-Z][A-Za-z&.\- ]{1,15})\)\s*$/);
  if (abbr && !/^eds?\.?$/i.test(abbr[1].trim())) return abbr[1].trim();
  const plain = n.replace(/\s*\((?:eds?\.?)\)\s*$/i, '');
  if (plain !== n) return surname(plain);
  if (ORG_RE.test(n)) return n; // organization: cite by its full name unless the bib entry sets citeAs
  // "Stedinger, J. R." -> "Stedinger"
  const comma = n.match(/^([^,]+),\s*((?:\p{Lu}\.\s*-?)+|\p{Lu}[\p{Ll}]*\.?)\s*$/u);
  if (comma) return comma[1].trim();
  const m = INITIALS_RE.exec(n);
  if (m && m[2].trim()) return m[2].trim();
  return n; // organization or a single name
}

function authorPart(entry) {
  if (entry.citeAs) return String(entry.citeAs);
  let names = splitAuthors(entry.author);
  if (!names.length) {
    const org = entry.organization || entry.institution || entry.publisher || entry.editor;
    names = org ? [String(org)] : [];
  }
  const sur = names.map(surname);
  if (sur.length === 0) return '';
  if (sur.length === 1) return sur[0];
  if (sur.length === 2) return `${sur[0]} and ${sur[1]}`;
  return `${sur[0]} et al.`;
}

function citationLabel(entry) {
  const authors = authorPart(entry);
  const year = entry.year !== undefined && entry.year !== null && entry.year !== '' ? String(entry.year) : 'n.d.';
  return { authors, year };
}

module.exports = { citationLabel, authorPart, surname, splitAuthors };
