/**
 * Custom GA4 analytics events for RMC Software Documentation.
 *
 * Sends structured custom events to Google Analytics via window.gtag().
 * Relies on gtagPolyfill.js being loaded first (guaranteed by clientModules
 * order in docusaurus.config.js) so window.gtag is always a function.
 *
 * Events:
 *   doc_page_view — every SPA navigation, with structured doc dimensions
 *   search_query  — when a user searches via Algolia DocSearch
 */

const BASE_PATH = '/RMC-Software-Documentation/';

// ── Latest versions cache ───────────────────────────────────────────

let latestVersions = null;

async function loadLatestVersions() {
  try {
    const resp = await fetch(BASE_PATH + 'versions/latestVersions.json');
    latestVersions = await resp.json();
  } catch {
    // Silently fail — is_latest_version will be "unknown"
  }
}

if (typeof window !== 'undefined') {
  loadLatestVersions();
}

// ── URL parser ──────────────────────────────────────────────────────

function parsePath(pathname) {
  const path = pathname.startsWith(BASE_PATH) ? pathname.slice(BASE_PATH.length).replace(/\/$/, '') : pathname.replace(/^\//, '').replace(/\/$/, '');

  // Home page
  if (!path) {
    return { page_type: 'home' };
  }

  // Changelog
  if (path === 'changelog') {
    return { page_type: 'changelog' };
  }

  // Documentation pages: docs/{category}/{product}/{doc_type}/v{X}.{Y}/{page}
  if (path.startsWith('docs/')) {
    const segments = path.replace(/^docs\//, '').split('/');
    const versionIdx = segments.findIndex((s) => /^v\d+\.\d+/.test(s));

    if (versionIdx >= 2) {
      const category = segments[0];
      const product = segments.slice(1, versionIdx - 1).join('/') || segments[1];
      const doc_type = segments[versionIdx - 1];
      const doc_version = segments[versionIdx];
      const doc_page = segments.slice(versionIdx + 1).join('/') || '(index)';
      const doc_path = segments.slice(0, versionIdx + 1).join('/');

      // Lookup key for latestVersions.json: everything before the version
      const lookupKey = segments.slice(0, versionIdx).join('/');
      const latest = latestVersions?.[lookupKey];
      const is_latest_version = latest ? (latest === doc_version ? 'true' : 'false') : 'unknown';

      return { page_type: 'doc_page', doc_category: category, doc_product: product, doc_type, doc_version, doc_page, doc_path, is_latest_version };
    }

    return { page_type: 'docs_index' };
  }

  return { page_type: 'other' };
}

// ── Page view tracking (Docusaurus onRouteDidUpdate hook) ───────────

export function onRouteDidUpdate({ location }) {
  // setTimeout lets react-helmet-async update document.title first
  // (same pattern used by the official gtag plugin)
  setTimeout(() => {
    const dims = parsePath(location.pathname);

    window.gtag('event', 'doc_page_view', {
      page_type: dims.page_type,
      doc_category: dims.doc_category || undefined,
      doc_product: dims.doc_product || undefined,
      doc_type: dims.doc_type || undefined,
      doc_version: dims.doc_version || undefined,
      doc_page: dims.doc_page || undefined,
      doc_path: dims.doc_path || undefined,
      is_latest_version: dims.is_latest_version || undefined,
      page_title: document.title,
    });
  });
}

// ── Search tracking (MutationObserver on DocSearch modal) ───────────

function setupSearchTracking() {
  let currentInput = null;
  let debounceTimer = null;
  let lastTrackedQuery = '';

  function trackSearch(query) {
    const trimmed = (query || '').trim();
    if (trimmed.length < 2 || trimmed === lastTrackedQuery) return;
    lastTrackedQuery = trimmed;
    window.gtag('event', 'search_query', {
      search_term: trimmed,
    });
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      // Modal opened — find input and attach listener
      for (const node of mutation.addedNodes) {
        if (node.nodeType !== 1) continue;
        const modal = node.querySelector?.('.DocSearch-Modal') || (node.classList?.contains('DocSearch-Modal') ? node : null);
        if (!modal) continue;

        const input = modal.querySelector('.DocSearch-Input') || modal.querySelector('input[type="search"]');
        if (input) {
          currentInput = input;
          lastTrackedQuery = '';
          input.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => trackSearch(input.value), 1500);
          });
        }
      }

      // Modal closed — fire final query
      for (const node of mutation.removedNodes) {
        if (node.nodeType !== 1) continue;
        const isModal = node.querySelector?.('.DocSearch-Modal') || node.classList?.contains('DocSearch-Modal');
        if (isModal && currentInput) {
          clearTimeout(debounceTimer);
          trackSearch(currentInput.value);
          currentInput = null;
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupSearchTracking);
  } else {
    setupSearchTracking();
  }
}
