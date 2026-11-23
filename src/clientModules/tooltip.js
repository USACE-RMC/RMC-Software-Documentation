// Site-wide hover tooltip, driven by the `data-tooltip` attribute.
//
// Ported from the DST app's GlobalTooltip so the docs match the application. Any element in
// MDX or in a component gets a tooltip by setting the attribute:
//
//   <button data-tooltip="Save changes">Save</button>
//
// Optional attributes on the same element:
//   data-tooltip-position   top (default), bottom, left or right. Flips when there is no room.
//   data-tooltip-max-width  Maximum width in px (default 280).
//   data-tooltip-anchor     On a child of a tall target: the part the arrow should point at.
//
// The tooltip shows on mouse hover, on keyboard focus (:focus-visible) and on touch (a tap
// shows it, a tap elsewhere hides it). It is position: fixed and ignores the pointer, so it
// never moves anything on the page. Inside an open modal <dialog> (the enlarged-figure view)
// it is placed in the dialog so it renders in the browser's top layer above the dialog.
//
// One tooltip element is created on first use and reused. Styles are in src/css/custom.css
// (.site-tooltip).

const DEFAULT_MAX_WIDTH = 280;
const MARGIN = 8; // gap between the target and the tooltip, and the viewport edge padding
const ARROW_INSET = 10; // keeps the arrow off the rounded corners (6px radius + 4px half-arrow)
const SHOW_DELAY_MS = 50;
const HIDE_DELAY_MS = 50;
const EXIT_DURATION_MS = 150;
const SLIDE_FROM = { top: '0 4px', bottom: '0 -4px', left: '4px 0', right: '-4px 0' };

let tip = null; // the tooltip element
let arrow = null;
let body = null;
let target = null; // element the tooltip is showing for
let pending = null; // element waiting on the show delay
let showTimer = null;
let hideTimer = null;
let exitTimer = null;
let observer = null;
let addedDescribedBy = false;
let initialized = false;

const clamp = (v, min, max) => Math.max(min, Math.min(v, max));
const visibleWidth = () => Math.min(document.documentElement.clientWidth, document.body.clientWidth);
const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function findTarget(node) {
  if (!(node instanceof Element)) return null;
  const el = node.closest('[data-tooltip]');
  return el && el.getAttribute('data-tooltip') ? el : null;
}

function clearTimers() {
  clearTimeout(showTimer);
  clearTimeout(hideTimer);
  clearTimeout(exitTimer);
  showTimer = hideTimer = exitTimer = null;
}

function ensureTip() {
  if (tip) return;
  tip = document.createElement('div');
  tip.className = 'site-tooltip';
  tip.id = 'site-tooltip';
  tip.setAttribute('role', 'tooltip');
  body = document.createElement('div');
  body.className = 'site-tooltip__body';
  arrow = document.createElement('span');
  arrow.className = 'site-tooltip__arrow';
  arrow.setAttribute('aria-hidden', 'true');
  tip.append(body, arrow);
}

function setText(text) {
  body.replaceChildren();
  const lines = text.split('\n');
  tip.classList.toggle('site-tooltip--multiline', lines.length > 1);
  if (lines.length === 1) {
    body.textContent = text;
    return;
  }
  for (const line of lines) {
    const div = document.createElement('div');
    div.textContent = line || ' ';
    body.append(div);
  }
}

// Inside an open modal dialog the tooltip must be a descendant of the dialog, or the
// dialog's top layer covers it.
function containerFor(el) {
  return el.closest('dialog[open]') || document.body;
}

function position() {
  if (!target || !tip) return;
  if (!target.isConnected) {
    dismiss();
    return;
  }
  const rect = (target.querySelector('[data-tooltip-anchor]') ?? target).getBoundingClientRect();
  const vw = visibleWidth();
  const vh = window.innerHeight;
  const maxWidth = Number(target.getAttribute('data-tooltip-max-width')) || DEFAULT_MAX_WIDTH;
  tip.style.maxWidth = `${Math.min(maxWidth, vw - 16)}px`;
  const tw = tip.offsetWidth;
  const th = tip.offsetHeight;

  let pos = target.getAttribute('data-tooltip-position') || 'top';
  if (!SLIDE_FROM[pos]) pos = 'top';
  if (pos === 'top' && rect.top < th + MARGIN) pos = 'bottom';
  else if (pos === 'bottom' && vh - rect.bottom < th + MARGIN) pos = 'top';
  else if (pos === 'left' && rect.left < tw + MARGIN) pos = 'right';
  else if (pos === 'right' && vw - rect.right < tw + MARGIN) pos = 'left';

  let top;
  let left;
  if (pos === 'top' || pos === 'bottom') {
    top = pos === 'top' ? rect.top - th - MARGIN : rect.bottom + MARGIN;
    left = rect.left + rect.width / 2 - tw / 2;
  } else {
    top = rect.top + rect.height / 2 - th / 2;
    left = pos === 'left' ? rect.left - tw - MARGIN : rect.right + MARGIN;
  }
  left = clamp(left, 8, vw - tw - 8);
  top = clamp(top, 8, vh - th - 8);

  tip.dataset.position = pos;
  tip.style.setProperty('--slide-from', SLIDE_FROM[pos]);
  tip.style.left = `${left}px`;
  tip.style.top = `${top}px`;

  // A transformed ancestor would make position: fixed relative to it rather than the
  // viewport. Measure where the box really landed and correct for any difference.
  const actual = tip.getBoundingClientRect();
  const dx = actual.left - left;
  const dy = actual.top - top;
  if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
    tip.style.left = `${left - dx}px`;
    tip.style.top = `${top - dy}px`;
  }

  // Aim the arrow at the target's centre even after the box was clamped to the viewport.
  if (pos === 'top' || pos === 'bottom') {
    const offset = clamp(rect.left + rect.width / 2 - left, ARROW_INSET, Math.max(ARROW_INSET, tw - ARROW_INSET));
    arrow.style.left = `${offset}px`;
    arrow.style.top = '';
  } else {
    const offset = clamp(rect.top + rect.height / 2 - top, ARROW_INSET, Math.max(ARROW_INSET, th - ARROW_INSET));
    arrow.style.top = `${offset}px`;
    arrow.style.left = '';
  }
}

function restartAnimation(name) {
  tip.classList.remove('site-tooltip--enter', 'site-tooltip--exit');
  void tip.offsetHeight;
  tip.classList.add(name);
}

function open(el) {
  ensureTip();
  const changed = target !== el;
  if (target && changed) unlinkTarget();
  target = el;
  setText(el.getAttribute('data-tooltip'));
  const container = containerFor(el);
  if (tip.parentNode !== container) container.append(tip);
  position();
  if (changed || tip.classList.contains('site-tooltip--exit')) restartAnimation('site-tooltip--enter');
  linkTarget();
}

// Screen readers: describe the target by the tooltip while it is shown.
function linkTarget() {
  if (!target.hasAttribute('aria-describedby')) {
    target.setAttribute('aria-describedby', tip.id);
    addedDescribedBy = true;
  }
  observer?.disconnect();
  observer = new MutationObserver(() => {
    if (!target) return;
    const next = target.getAttribute('data-tooltip');
    if (!next) dismiss();
    else {
      setText(next);
      position();
    }
  });
  observer.observe(target, { attributes: true, attributeFilter: ['data-tooltip'] });
}

function unlinkTarget() {
  observer?.disconnect();
  observer = null;
  if (target && addedDescribedBy) target.removeAttribute('aria-describedby');
  addedDescribedBy = false;
}

function show(el, immediate = false) {
  clearTimers();
  if (el === target && tip && !tip.classList.contains('site-tooltip--exit')) return; // already showing
  pending = el;
  if (immediate) open(el);
  else showTimer = setTimeout(() => open(pending), SHOW_DELAY_MS);
}

function hide() {
  clearTimers();
  pending = null;
  if (!target) return;
  hideTimer = setTimeout(() => {
    restartAnimation('site-tooltip--exit');
    exitTimer = setTimeout(dismiss, reducedMotion() ? 0 : EXIT_DURATION_MS);
  }, HIDE_DELAY_MS);
}

function dismiss() {
  clearTimers();
  pending = null;
  unlinkTarget();
  target = null;
  tip?.remove();
}

function onMouseOver(e) {
  const el = findTarget(e.target);
  if (el) show(el);
}

function onMouseOut(e) {
  const from = findTarget(e.target);
  if (!from || from === findTarget(e.relatedTarget)) return; // moving within the same target
  hide();
}

function onFocusIn(e) {
  const el = findTarget(e.target);
  if (!el) return;
  // Only keyboard focus: a mouse click also focuses a button, and hover already covers that.
  let keyboard = true;
  try {
    keyboard = e.target.matches(':focus-visible');
  } catch {
    // older browsers: treat all focus as keyboard focus
  }
  if (keyboard) show(el);
}

function onFocusOut(e) {
  if (findTarget(e.target) && findTarget(e.target) === target) hide();
}

function onPointerDown(e) {
  const el = findTarget(e.target);
  if (e.pointerType === 'mouse') {
    dismiss(); // clicking hides the tooltip, as in the app
    return;
  }
  // Touch and pen: a tap on a target shows its tooltip, a tap elsewhere hides it.
  if (el) show(el, true);
  else if (target) dismiss();
}

function onKeyDown(e) {
  if (e.key === 'Escape' && target) dismiss();
}

function init() {
  if (initialized || typeof document === 'undefined') return;
  initialized = true;
  document.addEventListener('mouseover', onMouseOver, true);
  document.addEventListener('mouseout', onMouseOut, true);
  document.addEventListener('focusin', onFocusIn, true);
  document.addEventListener('focusout', onFocusOut, true);
  document.addEventListener('pointerdown', onPointerDown, true);
  document.addEventListener('keydown', onKeyDown, true);
  window.addEventListener('scroll', () => target && position(), { capture: true, passive: true });
  window.addEventListener('resize', () => target && position());
  // A dialog closing hides a tooltip placed inside it; reset so the next one starts clean.
  document.addEventListener('close', (e) => tip && e.target.contains?.(tip) && dismiss(), true);
}

if (typeof window !== 'undefined') init();

export function onRouteDidUpdate() {
  dismiss();
}
