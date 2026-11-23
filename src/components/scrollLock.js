import { useEffect } from 'react';

/**
 * useScrollLock(locked): while `locked` is true, the page behind a modal (enlarged figure, page
 * navigation drawer) cannot scroll by wheel, touch or keyboard.
 *
 * Sets overflow: hidden on <html> and <body>, pads <body> by the scrollbar's width so the page does
 * not shift sideways, and on unlock (or unmount) puts back the exact inline styles and, unless
 * `restoreScroll` is false (a drawer whose links move the page), the scroll position.
 * Nested locks are counted, so two open modals unlock only when both close.
 */
let depth = 0;
let saved = null;
let restore = true;

function lock(restoreScroll) {
  depth += 1;
  if (depth > 1 || typeof document === 'undefined') return;
  restore = restoreScroll;
  const html = document.documentElement;
  const { body } = document;
  const scrollbar = window.innerWidth - html.clientWidth;
  saved = {
    x: window.scrollX,
    y: window.scrollY,
    htmlOverflow: html.style.overflow,
    bodyOverflow: body.style.overflow,
    bodyPaddingRight: body.style.paddingRight,
  };
  if (scrollbar > 0) {
    const current = parseFloat(window.getComputedStyle(body).paddingRight) || 0;
    body.style.paddingRight = `${current + scrollbar}px`;
  }
  html.style.overflow = 'hidden';
  body.style.overflow = 'hidden';
}

function unlock() {
  depth = Math.max(0, depth - 1);
  if (depth > 0 || !saved || typeof document === 'undefined') return;
  const html = document.documentElement;
  const { body } = document;
  html.style.overflow = saved.htmlOverflow;
  body.style.overflow = saved.bodyOverflow;
  body.style.paddingRight = saved.bodyPaddingRight;
  if (restore && (window.scrollX !== saved.x || window.scrollY !== saved.y)) window.scrollTo({ left: saved.x, top: saved.y, behavior: 'instant' });
  saved = null;
}

export default function useScrollLock(locked, { restoreScroll = true } = {}) {
  useEffect(() => {
    if (!locked) return undefined;
    lock(restoreScroll);
    return unlock;
  }, [locked, restoreScroll]);
}
