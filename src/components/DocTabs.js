// DocTabs.jsx
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import React, { useMemo } from 'react';

export default function DocTabs({
  items = [], // 'Title' | { title, child?, value?, label? }
  defaultValue, // string (value) or number (index)
  equalWidth = true,
  showDividers = true,
  gap = '',

  // Outer card
  containerClass = 'rounded-lg bg-background-color shadow-md mx-3',

  // Tabs row (doesn't style the tabs themselves)
  tabListClass = '!pl-0 !my-0 flex rounded-t-lg overflow-hidden border-b border-border-color bg-background-color dark:bg-background-color-theme',

  // Base tab (inactive by default)
  tabClass = '!mb-0 rounded-t-lg rounded-b-none px-4 py-2 text-center font-usace font-normal transition-colors ' +
    'bg-tab-color-inactive text-tab-font-color-inactive hover:bg-tab-hover-color',

  // Active state (Docusaurus sets aria-selected + tabs__item--active)
  tabActiveClass = 'aria-selected:bg-tab-color ' +
    'aria-selected:text-tab-font-color ' +
    'aria-selected:shadow-sm ' +
    'aria-selected:font-bold ' +
    'aria-selected:border-b-4 ' +
    'aria-selected:border-tab-underline-color ' +
    '[&.tabs__item--active]:bg-tab-color ' +
    '[&.tabs__item--active]:text-tab-font-color ' +
    '[&.tabs__item--active]:shadow-sm ' +
    '[&.tabs__item--active]:font-bold ' +
    '[&.tabs__item--active]:border-b-4 ' +
    '[&.tabs__item--active]:border-tab-underline-color ',

  // Panel below the tabs
  panelClass = 'min-w-0 rounded-b-xl bg-background-color px-4 py-3 text-base text-font-color',
}) {
  const norm = useMemo(() => normalizeTabs(items), [items]);

  if (!norm.length) return null;

  const widthCls = equalWidth ? 'flex-1' : 'flex-none';

  // Allow defaultValue as index or value
  const resolvedDefault =
    typeof defaultValue === 'number'
      ? norm[Math.max(0, Math.min(norm.length - 1, defaultValue))]?.value
      : (defaultValue ?? norm[0].value);

  return (
    <div className={`not-prose ${containerClass}`}>
      <Tabs className={`${tabListClass} ${gap}`} defaultValue={resolvedDefault}>
        {norm.map((it) => (
          <TabItem
            key={it.value}
            value={it.value}
            label={it.label}
            attributes={{
              className: [
                widthCls,
                tabClass,
                tabActiveClass,
                showDividers ? 'border-r border-border-color last:border-r-0' : '',
              ]
                .filter(Boolean)
                .join(' '),
            }}
          >
            <div className={panelClass}>{renderChild(it)}</div>
          </TabItem>
        ))}
      </Tabs>
    </div>
  );
}

/* ---------------- helpers (unified item API) ---------------- */

function normalizeTabs(items) {
  const used = new Set();
  return (items || []).map((raw, idx) => {
    // normalize title/child (same rules you use elsewhere)
    const node = normalizeNode(raw);

    // label: prefer explicit label (string), else try title text, else "Tab N"
    const labelText =
      typeof raw?.label === 'string' ? raw.label : toPlainText(node.title) || `Tab ${idx + 1}`;

    // value: prefer explicit value (string); else slug from label; ensure unique
    const base = typeof raw?.value === 'string' ? raw.value : slug(labelText) || `tab-${idx + 1}`;
    const value = uniqueValue(base, used, idx);

    return { ...node, label: labelText, value };
  });
}

function normalizeNode(it) {
  // primitives → { title }
  if (typeof it === 'string' || typeof it === 'number') {
    return { title: String(it) };
  }

  const title = it?.title ?? '';

  // Prefer `child`; accept aliases for back-compat
  const rawChild = it?.child ?? it?.content ?? it?.details ?? it?.children;

  if (Array.isArray(rawChild)) {
    // array can be strings/nodes or nested objects; normalize each to { title, child? }
    return { title, childList: rawChild.map(innerNormalize) };
  } else if (rawChild !== undefined && rawChild !== null) {
    // single node → panel content
    return { title, childPanel: rawChild };
  }

  return { title };
}

function innerNormalize(x) {
  if (typeof x === 'string' || typeof x === 'number' || React.isValidElement(x)) {
    return { title: x };
  }
  // support nested { title, child } objects
  const title = x?.title ?? '';
  const rawChild = x?.child ?? x?.content ?? x?.details ?? x?.children;
  if (Array.isArray(rawChild)) return { title, childList: rawChild.map(innerNormalize) };
  if (rawChild !== undefined && rawChild !== null) return { title, childPanel: rawChild };
  return { title };
}

function renderChild(node) {
  if (Array.isArray(node.childList) && node.childList.length) {
    return (
      <ul className="ml-4 list-disc">
        {node.childList.map((c, i) => (
          <li key={i}>
            {c.title}
            {/* nested lists will also render */}
            {renderChild(c)}
          </li>
        ))}
      </ul>
    );
  }
  return node.childPanel ?? null;
}

function toPlainText(maybeNode) {
  // Tab labels in Docusaurus are best as strings. If you pass a ReactNode as title,
  // we fall back to plain "Tab N". This helper tries a few simple stringy cases.
  if (typeof maybeNode === 'string') return maybeNode;
  if (typeof maybeNode === 'number') return String(maybeNode);
  return ''; // complex React nodes → caller can pass `label` explicitly if needed
}

function slug(s) {
  return String(s || '')
    .toLowerCase()
    .trim()
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}
function uniqueValue(base, used, idx) {
  let v = base || `tab-${idx + 1}`;
  let n = 1;
  while (used.has(v)) v = `${base}-${++n}`;
  used.add(v);
  return v;
}
