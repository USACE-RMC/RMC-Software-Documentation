// Handles hash-based anchor scrolling after SPA client-side route changes.
// Docusaurus SPA routing doesn't re-trigger the browser's native hash scroll
// because the target element isn't in the DOM yet when the route changes.
// This module watches for the target element and scrolls to it once it appears.

export function onRouteDidUpdate({ location }) {
  if (!location.hash) return;

  const id = decodeURIComponent(location.hash.substring(1));
  if (!id) return;

  // Try immediately first (element may already be in DOM)
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView();
    return;
  }

  // Otherwise, wait for React to mount the element
  const observer = new MutationObserver((_mutations, obs) => {
    const target = document.getElementById(id);
    if (target) {
      obs.disconnect();
      target.scrollIntoView();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Stop watching after 5 seconds to avoid leaks
  setTimeout(() => observer.disconnect(), 5000);
}
