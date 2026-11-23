/**
 * Shared column-width handling for the table components (TableVertical, TableHorizontal,
 * TableVerticalNoRef, TableVersionHistory).
 *
 * Tables use `table-layout: fixed`, where a <col> only understands plain lengths
 * (ch, px, rem, em, %) or `auto`. Grid-style values such as `minmax(30ch, 1fr)` and
 * `2fr` are invalid there and used to be silently dropped. This helper translates them:
 *
 *   number            -> `${n}ch`
 *   'minmax(a, b)'    -> column width b (or a share of the free space when b is `fr`),
 *                        and a contributes to the table's minimum width
 *   'Nfr'             -> a share of the free space (percentages when every column is
 *                        `fr`; otherwise `auto`, which splits the free space evenly)
 *   any other string  -> passed through unchanged (e.g. '20ch', '15%', 'auto')
 *
 * The table's minimum width is the larger of the old column-count floor and the sum of
 * the columns' minimum widths, so a table can no longer collapse below its minimums on a
 * phone; it scrolls sideways instead. `minWidth` overrides the computed minimum.
 */

const CELL_PADDING_PX = 16; // .table-body-cell has 8px left + 8px right padding

const MINMAX_RE = /^minmax\(\s*([^,]+?)\s*,\s*(.+?)\s*\)$/i;
const FR_RE = /^(\d*\.?\d+)\s*fr$/i;
const LENGTH_RE = /^\d*\.?\d+\s*(ch|px|rem|em)$/i;

const toCss = (v) => (typeof v === 'number' ? `${v}ch` : String(v).trim());

function parseWidth(raw) {
  const v = toCss(raw);
  const mm = v.match(MINMAX_RE);
  if (mm) {
    const min = mm[1];
    const max = mm[2];
    const fr = max.match(FR_RE);
    return {
      width: fr ? null : max,
      fr: fr ? parseFloat(fr[1]) : null,
      min: LENGTH_RE.test(min) ? min : null,
    };
  }
  const fr = v.match(FR_RE);
  if (fr) return { width: null, fr: parseFloat(fr[1]), min: null };
  return { width: v, fr: null, min: LENGTH_RE.test(v) ? v : null };
}

/**
 * @param {object} opts
 * @param {Array<number|string>} [opts.colWidths]
 * @param {number} opts.colCount
 * @param {number|string} [opts.minWidth]  number => px
 * @param {string} [opts.widthMode] 'auto' drops the per-column floor
 * @param {number} [opts.floorPerColumn=120] old per-column minimum (px)
 * @returns {object} CSS custom properties: --c1..--cN and --table-min-width
 */
export function buildWidthVars({ colWidths, colCount, minWidth, widthMode, floorPerColumn = 120 }) {
  const vars = {};
  // In auto mode the browser already keeps every column at least as wide as its longest word, so
  // the per-column floor is dropped: narrow tables can fit a phone screen instead of scrolling.
  const floor = widthMode === 'auto' ? '0px' : `${Math.max(colCount * floorPerColumn, 300)}px`;
  const mins = [];

  if (Array.isArray(colWidths)) {
    const n = Math.min(colWidths.length, colCount);
    const parsed = colWidths.slice(0, n).map(parseWidth);
    const allFr = n === colCount && parsed.every((p) => p.fr !== null);
    const frTotal = parsed.reduce((s, p) => s + (p.fr || 0), 0);

    parsed.forEach((p, i) => {
      let w = p.width;
      if (p.fr !== null) w = allFr && frTotal > 0 ? `${((p.fr / frTotal) * 100).toFixed(3)}%` : 'auto';
      vars[`--c${i + 1}`] = w;
      if (p.min) mins.push(p.width === p.min ? p.min : `${p.min} + ${CELL_PADDING_PX}px`);
    });
  }

  if (minWidth !== undefined && minWidth !== null && minWidth !== '') {
    vars['--table-min-width'] = typeof minWidth === 'number' ? `${minWidth}px` : minWidth;
  } else if (mins.length) {
    vars['--table-min-width'] = `max(${floor}, calc(${mins.join(' + ')}))`;
  } else {
    vars['--table-min-width'] = floor;
  }
  return vars;
}

/** Extra inline style for widthMode. Returns {} for the default 'full' mode. */
export function widthModeVars(widthMode) {
  if (widthMode === 'intrinsic') return { '--table-width': 'max-content', '--table-display': 'inline-table' };
  if (widthMode === 'auto') return { tableLayout: 'auto' };
  return {};
}

/* ── widthMode="auto": keep text columns readable ─────────────────────────────
 * In auto mode the browser sizes columns from their content. On a phone that can squeeze a
 * description column to a few words per line while short columns keep their width. To keep the
 * result predictable, each column gets a minimum width from the length of its text:
 *   average cell text >= 40 characters -> at least 26ch
 *   average cell text >= 20 characters -> at least 14ch
 *   shorter                            -> no minimum (fits its content)
 * Below the sum of those minimums the table scrolls sideways (with the scroll cue).
 */
function plainText(node) {
  if (node === null || node === undefined || node === false) return '';
  if (typeof node === 'string' || typeof node === 'number')
    return String(node)
      .replace(/<[^>]*>/g, '')
      .replace(/&[a-z#0-9]+;/gi, 'x');
  if (Array.isArray(node)) return node.map(plainText).join('');
  if (typeof node === 'object') {
    if ('value' in node && !node.props) return plainText(node.value); // { value, rowSpan, colSpan } cell
    if (node.props) return plainText(node.props.children);
  }
  return '';
}

/** @param {Array<Array<any>>} columnsData one array of cells per column */
export function autoColumnMins(columnsData) {
  return (columnsData || []).map((cells) => {
    const lens = (cells || []).map((c) => plainText(c).trim().length).filter((n) => n > 0);
    if (!lens.length) return undefined;
    const avg = lens.reduce((a, b) => a + b, 0) / lens.length;
    if (avg >= 40) return '26ch';
    if (avg >= 20) return '14ch';
    return undefined;
  });
}
