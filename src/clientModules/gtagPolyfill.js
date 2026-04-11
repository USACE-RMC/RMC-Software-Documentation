// Polyfill window.gtag as a no-op if the external Google Analytics script
// is blocked (e.g. by an ad blocker or browser privacy feature). This
// prevents "window.gtag is not a function" errors from the Docusaurus
// gtag plugin on client-side navigations.
if (typeof window !== 'undefined' && typeof window.gtag !== 'function') {
  window.gtag = function () {};
}
