// Shows a cue when a table is wider than its column and scrolls sideways.
//
// Every table component wraps its <table> in a `.table-scroller` element that owns the
// horizontal scrollbar. On phones that scrollbar is often invisible, so a wide table just
// looks cut off. This module marks each scroller with
//   data-scroll-left   when content is hidden to the left
//   data-scroll-right  when content is hidden to the right
// (and mirrors both onto the parent `.table-container`). tables.css turns those into an
// edge fade and, on narrow screens, a "Scroll sideways" hint after the caption.

const registered = new WeakSet();
let resizeObserver = null;
let mutationObserver = null;
let scanQueued = false;

function update(el) {
  const max = el.scrollWidth - el.clientWidth;
  const left = max > 1 && el.scrollLeft > 1;
  const right = max > 1 && el.scrollLeft < max - 1;
  const targets = [el, el.closest('.table-container')].filter(Boolean);
  for (const t of targets) {
    t.toggleAttribute('data-scroll-left', left);
    t.toggleAttribute('data-scroll-right', right);
  }
}

function register(el) {
  if (registered.has(el)) return;
  registered.add(el);
  el.addEventListener('scroll', () => update(el), { passive: true });
  resizeObserver?.observe(el);
  const table = el.querySelector('table');
  if (table) resizeObserver?.observe(table);
  update(el);
}

function scan() {
  scanQueued = false;
  document.querySelectorAll('.table-scroller').forEach(register);
}

function queueScan() {
  if (scanQueued) return;
  scanQueued = true;
  requestAnimationFrame(scan);
}

function init() {
  if (typeof window === 'undefined' || resizeObserver) return;
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target.classList?.contains('table-scroller') ? entry.target : entry.target.closest?.('.table-scroller');
        if (el) update(el);
      }
    });
  }
  // Tables can mount after the route renders (tabs, expandable panels), so watch for them.
  mutationObserver = new MutationObserver(queueScan);
  mutationObserver.observe(document.body, { childList: true, subtree: true });
}

export function onRouteDidUpdate() {
  init();
  queueScan();
}
