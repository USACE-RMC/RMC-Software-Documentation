/**
 * HierarchySteps
 * Multi-level "boxed" steps where each node is its own card.
 * Children are shown as *indented* cards with spacing from the parent.
 *
 * Data:
 *   steps: Array<{ title: React.ReactNode, children?: steps[] }>
 *
 * Numbering:
 *   - Top level defaults to decimal (1, 2, 3)
 *   - Children default to lower-alpha (a, b, c)
 *
 * Tailwind knobs:
 *   - levelBoxClass, levelBadgeClass, levelGapClass, levelBadgeSizePx, levelIndentPx
 *   - childGroupSpacingPx
 */
export default function HierarchySteps({
  steps = [],
  startAt = 1,
  numberStyle = 'decimal',
  childNumberStyle = 'lower-alpha',

  levelBoxClass = [
    'bg-ifm-primary border border-ifm-primary rounded-lg shadow-sm px-3 py-2.5 text-font-color-inverse',
    'bg-background-color border border-border-color rounded-lg shadow-sm px-3 py-2.5 text-font-color',
    'bg-background-color border border-border-color/60 rounded-lg px-3 py-2 text-font-color',
  ],
  levelBadgeClass = [
    'bg-ifm-primary border border-border-color rounded-full shadow text-caption font-usace text-font-color-inverse',
    'bg-white border border-border-color rounded-full shadow text-caption font-usace text-slate-900',
    'bg-white border border-border-color rounded-full text-caption font-usace text-slate-900',
  ],
  levelGapClass = ['mb-2.5', 'mb-2', 'mb-1.5'],
  levelBadgeSizePx = [28, 24, 22],
  levelIndentPx = [0, 18, 26],
  childGroupSpacingPx = 8,

  className = '',
}) {
  if (!steps.length) return null;
  return (
    <div className={`not-prose ${className}`}>
      <Level
        steps={steps}
        lvl={0}
        startAt={startAt}
        styleAtLevel={(lvl) => (lvl === 0 ? numberStyle : childNumberStyle)}
        levelBoxClass={levelBoxClass}
        levelBadgeClass={levelBadgeClass}
        levelGapClass={levelGapClass}
        levelBadgeSizePx={levelBadgeSizePx}
        levelIndentPx={levelIndentPx}
        childGroupSpacingPx={childGroupSpacingPx}
      />
    </div>
  );
}

function Level({
  steps,
  lvl,
  startAt,
  styleAtLevel,
  levelBoxClass,
  levelBadgeClass,
  levelGapClass,
  levelBadgeSizePx,
  levelIndentPx,
  childGroupSpacingPx,
}) {
  const boxCls = pick(levelBoxClass, lvl);
  const badgeCls = pick(levelBadgeClass, lvl);
  const gapCls = pick(levelGapClass, lvl);
  const badgeSz = pick(levelBadgeSizePx, lvl);
  const indent = pick(levelIndentPx, lvl);
  const numStyle = styleAtLevel(lvl);

  return (
    <ol className="m-0 list-none p-0">
      {steps.map((step, i) => {
        const label = formatOrdinal(i + startAt, numStyle);
        const hasKids = Array.isArray(step.children) && step.children.length > 0;

        return (
          <li key={i} className={`list-none ${gapCls}`} style={{ marginLeft: indent }}>
            <div
              className={`relative ${boxCls}`}
              style={{
                display: 'grid',
                gridTemplateColumns: `${badgeSz}px 10px 1fr`,
                alignItems: 'center',
                minHeight: Math.max(badgeSz + 8, 36),
              }}
            >
              <span
                aria-hidden="true"
                className={`inline-flex items-center justify-center ${badgeCls}`}
                style={{ width: badgeSz, height: badgeSz, fontWeight: 700 }}
              >
                {label}
              </span>
              <span aria-hidden="true" />
              {/* Title now wraps by default */}
              <span className="font-usace font-bold">{step.title}</span>
            </div>

            {hasKids && (
              <div style={{ marginTop: childGroupSpacingPx }}>
                <Level
                  steps={step.children}
                  lvl={lvl + 1}
                  startAt={1}
                  styleAtLevel={styleAtLevel}
                  levelBoxClass={levelBoxClass}
                  levelBadgeClass={levelBadgeClass}
                  levelGapClass={levelGapClass}
                  levelBadgeSizePx={levelBadgeSizePx}
                  levelIndentPx={levelIndentPx}
                  childGroupSpacingPx={childGroupSpacingPx}
                />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/* -------- helpers -------- */
function pick(arr, idx) {
  return arr[Math.min(idx, arr.length - 1)];
}
function formatOrdinal(n, style = 'decimal') {
  switch (style) {
    case 'decimal':
      return String(n);
    case 'upper-alpha':
      return toAlpha(n).toUpperCase();
    case 'lower-alpha':
      return toAlpha(n).toLowerCase();
    case 'upper-roman':
      return toRoman(n).toUpperCase();
    case 'lower-roman':
      return toRoman(n).toLowerCase();
    default:
      return String(n);
  }
}
function toAlpha(n) {
  let s = '',
    x = n;
  while (x > 0) {
    x--;
    s = String.fromCharCode((x % 26) + 65) + s;
    x = Math.floor(x / 26);
  }
  return s || 'A';
}
function toRoman(num) {
  const r = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];
  let res = '',
    n = Math.max(1, Math.min(3999, num | 0));
  for (const [v, sym] of r) {
    while (n >= v) {
      res += sym;
      n -= v;
    }
  }
  return res;
}
