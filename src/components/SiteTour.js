import { useHistory, useLocation } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTour } from '../contexts/TourContext';

/*
 * ────────────────────────────────────────────────────────────────────
 *  Responsive tier detection
 *
 *  Determined once when the tour starts and locked for the session.
 *  Breakpoints align with tailwind.config.js:
 *    phone  : < 640px  (sm)
 *    tablet : 640 – 1079px  (sm → lg, includes iPad Pro 13" portrait @ 1032px)
 *    desktop: >= 1080px
 * ────────────────────────────────────────────────────────────────────
 */
function getTier() {
  const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
  if (w < 640) return 'phone';
  if (w < 1080) return 'tablet';
  return 'desktop';
}

/*
 * ────────────────────────────────────────────────────────────────────
 *  Tour step definitions (responsive)
 *
 *  Each step carries base fields used by the desktop tier. Optional
 *  `phone` and `tablet` keys override individual fields for that tier.
 *  Setting a tier key to `false` excludes the step entirely.
 *
 *  Placement controls tooltip position relative to the target:
 *    top | bottom | left | right  (default: bottom)
 *
 *  The `page` field tags which page group a step belongs to ('home'
 *  or 'doc'). Navigation is triggered automatically when the current
 *  URL doesn't match the step's required page.
 * ────────────────────────────────────────────────────────────────────
 */
const STEP_FIELDS = ['title', 'content', 'contentAfter', 'selector', 'selectorFallback', 'placement', 'padding', 'icon', 'page'];

const buildSteps = (baseUrl, tier) => {
  const allSteps = [
    // ── Homepage steps ──────────────────────────────────────────

    // 0 — Welcome
    {
      title: 'Welcome to RMC Software Documentation',
      content:
        'This quick tour will show you how to navigate the site, find documents, and use the interactive features built into every page. You can revisit this tour anytime from the home page.',
      icon: 'compass',
      page: 'home',
    },

    // 1 — Navigation
    // Hamburger menu is visible at < 1200px (responsive.css forces display:inline-flex
    // up to 1199px). When the hamburger is hidden (>= 1200px), findTarget falls through
    // to the selectorFallback (full nav bar).
    {
      title: 'Main Navigation',
      content:
        'The navigation organizes all documentation into three categories: Desktop Applications, Toolbox Technical Manuals, and Web Applications. Each category expands to reveal available tools and their documents. Helpful resources can also be accessed from the navigation.',
      selector: 'header.gw-sticky .md\\:gw-hidden',
      selectorFallback: 'header.gw-sticky .gw-bg-nav-black',
      padding: { top: 4, right: 4, bottom: 4, left: 4 },
      placement: 'bottom',
      icon: 'menu',
      page: 'home',
      tablet: {
        title: 'Menu Navigation',
        content:
          'Tap the menu icon to open the navigation drawer. It organizes all documentation into three categories: Desktop Applications, Toolbox Technical Manuals, and Web Applications. Each category expands to reveal available tools and documents.',
      },
      phone: {
        title: 'Menu Navigation',
        content:
          'Tap the menu icon to open the navigation drawer. It lists all documentation organized by category: Desktop Applications, Toolbox Technical Manuals, and Web Applications.',
      },
    },

    // 2 — Search
    {
      title: 'Search',
      content:
        'The search bar finds content across all documents, versions, and document types. Enter a keyword, figure number, or topic to see instant results.',
      selector: 'header.gw-sticky .DocSearch-Button',
      padding: { top: 6, right: 6, bottom: 6, left: 6 },
      placement: 'bottom',
      icon: 'search',
      page: 'home',
      tablet: {
        content: 'Tap the search icon to search across all documents and versions. Enter a keyword or topic to see instant results.',
        padding: { top: 4, right: 4, bottom: 0, left: 4 },
      },
      phone: {
        content: 'Tap the search icon to search across all documents. Enter a keyword or topic to see results.',
        padding: { top: 4, right: 4, bottom: 0, left: 4 },
      },
    },

    // 3 — Light/Dark Mode
    {
      title: 'Light/Dark Mode Toggle',
      content: 'This button switches between light and dark themes. The entire site, including figures and tables, adapts to your chosen theme.',
      selector: 'button[aria-label*="Switch to"]',
      placement: 'bottom',
      icon: 'theme',
      page: 'home',
      tablet: { padding: { top: 4, right: 4, bottom: 0, left: 4 } },
      phone: { padding: { top: 4, right: 4, bottom: 0, left: 4 } },
    },

    // 4 — Homepage Categories
    {
      title: 'Homepage Categories',
      content:
        'The homepage displays all available software organized into categories. Active tools have interactive cards that take you directly to their documentation hub. Grayed-out cards indicate tools with documentation coming soon.',
      selector: '.main-content-container',
      placement: 'top',
      icon: 'grid',
      page: 'home',
      phone: {
        content:
          'The homepage lists all available software organized into categories. Tap any active card to go to its documentation hub. Grayed-out cards indicate tools with documentation coming soon.',
      },
    },

    // ── Doc page steps — navigates across LifeSim pages ─────────

    // 5 — Sidebar (desktop only)
    {
      title: 'Sidebar Navigation',
      content:
        'The left sidebar shows all chapters and sections of the current document. Selecting any item jumps directly to that section. The sidebar reflects the document\u2019s full table of contents.',
      selector: '.theme-doc-sidebar-container',
      selectorFallback: 'aside',
      placement: 'right',
      icon: 'sidebar',
      page: 'doc',
      tablet: false,
      phone: false,
    },

    // 6 — Page Navigation (phone/tablet only — unified InlineNav)
    {
      title: 'Page Navigation',
      content:
        'The "Page navigation" panel at the top of each page combines two tabs: "On this page" shows headings for the current page, and "In this document" lists every chapter\u2014just like the sidebar on a wider screen. Tap the toggle to expand it.',
      selector: '.floating-nav-inline',
      placement: 'bottom',
      icon: 'navigate',
      page: 'doc',
      desktop: false,
      phone: {
        content:
          'The "Page navigation" panel combines two tabs: "On this page" shows headings for the current page, and "In this document" lists every chapter. Tap the toggle to expand it.',
      },
    },

    // 7 — Table of Contents (desktop only — phone/tablet covered by step 6 InlineNav)
    {
      title: 'Table of Contents',
      content:
        'The right-side table of contents shows the headings on the current page. Selecting any heading scrolls directly to that section, and the active heading highlights as you read.',
      selector: '.table-of-contents',
      selectorFallback: '.col--3',
      padding: { left: -2, right: 26 },
      placement: 'left',
      icon: 'toc',
      page: 'doc',
      tablet: false,
      phone: false,
    },

    // 8 — Breadcrumbs
    {
      title: 'Breadcrumb Trail',
      content:
        'Breadcrumbs at the top of each page show your current location in the documentation hierarchy. Each segment is a link back up to that level.',
      selector: '.breadcrumbs, nav[aria-label="Breadcrumbs"]',
      placement: 'bottom',
      icon: 'breadcrumb',
      page: 'doc',
    },

    // 9 — Document Information
    {
      title: 'Document Information',
      content:
        'The Document Information page provides metadata for each document including the report date, type, title, authors, and acknowledgments. Look for it as the first entry in the sidebar.',
      selector: '.table-container',
      placement: 'top',
      icon: 'info',
      page: 'doc-info',
      tablet: {
        content:
          'The Document Information page provides metadata for each document including the report date, type, title, authors, and acknowledgments. Look for it as the first entry in the navigation menu.',
      },
      phone: {
        content:
          'The Document Information page provides metadata for each document including the report date, type, title, authors, and acknowledgments. Look for it as the first entry in the navigation menu.',
      },
    },

    // 10 — Version History
    {
      title: 'Version History',
      content:
        'Each document includes a Version History page that tracks revisions, dates, authors, and reviewers. This table makes it easy to see what changed between versions and who was responsible. Archived versions can be accessed from the links in the Version History table.',
      selector: '.table-container',
      placement: 'top',
      icon: 'version',
      page: 'version-history',
    },

    // 11 — Document Reading Area
    {
      title: 'Document Reading Area',
      content:
        'The central reading area displays the document content. This is where you will find the text, figures, tables, and equations for each section of the document.',
      selector: 'article',
      placement: 'left',
      icon: 'document',
      page: 'doc',
      tablet: { placement: 'top' },
      phone: {
        content: 'The reading area displays the document content. Scroll to read through text, figures, tables, and equations for each section.',
        placement: 'top',
      },
    },

    // 12 — Print Page
    {
      title: 'Print Page',
      content:
        'The print button in the top-right corner of each page opens your browser\u2019s print dialog. The page is automatically reformatted for paper\u2014navigation, sidebars, and other site elements are hidden so the printed output is clean and readable.',
      selector: '.print-button',
      padding: { top: 6, right: 6, bottom: 6, left: 6 },
      placement: 'bottom',
      icon: 'print',
      page: 'doc',
      tablet: { placement: 'left' },
      phone: {
        content:
          'The print button opens your browser\u2019s print dialog. The page is reformatted for paper with navigation and site elements hidden for a clean printout.',
      },
    },

    // 13 — Floating Navigation Button (phone/tablet only)
    {
      title: 'Floating Navigation Button',
      content:
        'After scrolling down, a floating button appears at the bottom-right of the screen. Tap it to open a navigation drawer with the same "On this page" and "In this document" tabs\u2014without scrolling back to the top.',
      contentAfter: (
        <span className="mt-3 flex justify-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ifm-color-primary)] text-white shadow-lg">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </span>
        </span>
      ),
      selector: '.floating-nav__fab',
      placement: 'top',
      icon: 'navigate',
      page: 'doc',
      desktop: false,
      phone: {
        content:
          'After scrolling down, a floating button appears at the bottom-right corner. Tap it to open navigation without scrolling back to the top.',
      },
    },

    // 13 — Figures, Tables & Equations (renumbered from 12 after FAB insertion)
    {
      title: 'Figures, Tables & Equations',
      content:
        'Documents include numbered figures, tables, and equations. In-text references are clickable links that jump to the full element. Figure references also show a preview popup on hover. Tables and equations follow the same clickable reference pattern throughout every document.',
      selector: 'figure',
      placement: 'top',
      icon: 'image',
      page: 'doc',
      phone: {
        content:
          'Documents include numbered figures, tables, and equations. Tap any in-text reference to jump to the full element. Figure references also show a preview when tapped. Tables and equations follow the same tappable reference pattern throughout every document.',
      },
    },

    // 14 — References & Citations
    {
      title: 'References & Citations',
      content:
        'Academic citations appear as numbered superscripts (e.g., [1]) next to the in-text reference. Selecting a citation link jumps to the full reference in the footnotes at the end of the current page.',
      selector: 'span:has(> .citation-link)',
      selectorFallback: '.citation-link',
      padding: { top: 6, right: 8, bottom: 8, left: 8 },
      placement: 'top',
      icon: 'citation',
      page: 'doc',
      tablet: {
        padding: { top: 8, right: 10, bottom: 10, left: 10 },
      },
      phone: {
        content:
          'Academic citations appear as numbered superscripts (e.g., [1]) next to the in-text reference. Tapping a citation link jumps to the full reference in the footnotes at the end of the current page.',
        padding: { top: 10, right: 12, bottom: 12, left: 12 },
      },
    },

    // 15 — References Page
    {
      title: 'References Page',
      content:
        'Each document ends with a References page listing all cited sources. The bibliography is auto-generated from the citations used throughout the document.',
      selector: '.theme-doc-markdown',
      placement: 'left',
      icon: 'book',
      page: 'references',
      tablet: { placement: 'top' },
      phone: { placement: 'top' },
    },

    // ── Return to homepage ──────────────────────────────────────
    {
      title: 'You\u2019re All Set!',
      content: 'You now know the essentials of navigating this site. Remember, you can always restart this tour from the home page. Happy reading!',
      icon: 'check',
      page: 'home',
    },
  ];

  // Filter out steps excluded for this tier, then merge overrides
  return allSteps
    .filter((s) => s[tier] !== false)
    .map((s) => {
      const o = typeof s[tier] === 'object' && s[tier] !== null ? s[tier] : {};
      const merged = {};
      for (const f of STEP_FIELDS) merged[f] = o[f] !== undefined ? o[f] : s[f];
      return merged;
    });
};

/* ── URL helper: derive the required URL for a step ──────────────── */

function getLifeSimBase(latestVersions) {
  const version = latestVersions['desktop-applications/lifesim/users-guide'] || 'v1.0';
  return `docs/desktop-applications/lifesim/users-guide/${version}`;
}

function getRequiredUrl(step, baseUrl, lifeSimBase) {
  if (!step?.page) return null;
  switch (step.page) {
    case 'doc':
      return `${baseUrl}${lifeSimBase}/hydraulic-data`;
    case 'version-history':
      return `${baseUrl}${lifeSimBase}/version-history`;
    case 'doc-info':
      return `${baseUrl}${lifeSimBase}/document-info`;
    case 'references':
      return `${baseUrl}${lifeSimBase}/references`;
    case 'home':
      return baseUrl;
    default:
      return null;
  }
}

function normalizePath(p) {
  return (p || '').replace(/\/+$/, '') || '/';
}

/* ── SVG icon map ─────────────────────────────────────────────────── */

const icons = {
  compass: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" opacity="0.2" stroke="none" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  menu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-6 w-6">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-6 w-6">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  theme: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-6 w-6">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  grid: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  sidebar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="13" y1="8" x2="17" y2="8" />
      <line x1="13" y1="12" x2="17" y2="12" />
      <line x1="13" y1="16" x2="17" y2="16" />
    </svg>
  ),
  toc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-6 w-6">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" strokeWidth="2" />
      <line x1="3" y1="12" x2="3.01" y2="12" strokeWidth="2" />
      <line x1="3" y1="18" x2="3.01" y2="18" strokeWidth="2" />
    </svg>
  ),
  breadcrumb: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <polyline points="9 18 15 12 9 6" />
      <line x1="3" y1="12" x2="15" y2="12" />
    </svg>
  ),
  image: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  version: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  citation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  document: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  navigate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <polyline points="15 18 9 12 15 6" />
      <line x1="20" y1="12" x2="9" y2="12" />
    </svg>
  ),
  print: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
};

/* ── Tooltip positioning helper ───────────────────────────────────── */

function getTooltipStyle(rect, placement, tooltipW, tooltipH, tier) {
  // On phone, pin tooltip to the bottom of the viewport with an explicit top value
  // (avoids relying on CSS bottom-pinning which breaks on some mobile browsers).
  // If the target element is near the bottom, place the tooltip above the target
  // so it doesn't overlap (e.g. the FloatingNav FAB).
  if (tier === 'phone') {
    const bottomPin = window.innerHeight - tooltipH - 12;
    if (rect && rect.top > window.innerHeight * 0.5) {
      const aboveTarget = rect.top - tooltipH - 16;
      return { top: Math.max(12, aboveTarget), left: 12 };
    }
    return { top: Math.max(12, bottomPin), left: 12 };
  }

  const GAP = 16;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // On tablet, left/right placements often lack horizontal space — fall back
  let effectivePlacement = placement;
  if (tier === 'tablet' && (placement === 'left' || placement === 'right')) {
    const spaceLeft = rect.left - GAP;
    const spaceRight = vw - rect.right - GAP;
    const neededSide = tooltipW + GAP;
    const fits = placement === 'left' ? spaceLeft >= neededSide : spaceRight >= neededSide;
    if (!fits) {
      // Prefer top if there's room above, otherwise bottom
      effectivePlacement = rect.top - tooltipH - GAP >= 16 ? 'top' : 'bottom';
    }
  }

  let top, left;

  switch (effectivePlacement) {
    case 'top':
      top = rect.top - tooltipH - GAP;
      left = rect.left + rect.width / 2 - tooltipW / 2;
      break;
    case 'left':
      top = rect.top + rect.height / 2 - tooltipH / 2;
      left = rect.left - tooltipW - GAP;
      break;
    case 'right':
      top = rect.top + rect.height / 2 - tooltipH / 2;
      left = rect.right + GAP;
      break;
    default:
      // bottom
      top = rect.bottom + GAP;
      left = rect.left + rect.width / 2 - tooltipW / 2;
  }

  // Clamp to viewport
  if (left < 16) left = 16;
  if (left + tooltipW > vw - 16) left = vw - tooltipW - 16;
  if (top < 16) top = 16;
  if (top + tooltipH > vh - 16) top = vh - tooltipH - 16;

  return { top, left };
}

/* ── Clip a rect to the visible viewport ──────────────────────────── */

function clipToViewport(rect) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const top = Math.max(0, rect.top);
  const left = Math.max(0, rect.left);
  const bottom = Math.min(vh, rect.top + rect.height);
  const right = Math.min(vw, rect.left + rect.width);
  return { top, left, bottom, right, width: Math.max(0, right - left), height: Math.max(0, bottom - top) };
}

/* ── Spotlight overlay (four rects around the target) ─────────────── */

function SpotlightOverlay({ rect, padding }) {
  if (!rect) {
    return <div className="pointer-events-none fixed inset-0 z-[10001] bg-black/55" />;
  }

  const defaultPad = 8;
  const pt = padding?.top ?? defaultPad;
  const pr = padding?.right ?? defaultPad;
  const pb = padding?.bottom ?? defaultPad;
  const pl = padding?.left ?? defaultPad;
  const r = {
    top: Math.max(0, rect.top - pt),
    left: Math.max(0, rect.left - pl),
    width: Math.max(0, rect.width + pl + pr),
    height: Math.max(0, rect.height + pt + pb),
  };

  return (
    <svg
      className="pointer-events-none fixed inset-0 z-[10001]"
      viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
      preserveAspectRatio="none"
    >
      <defs>
        <mask id="tour-spotlight-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <rect x={r.left} y={r.top} width={r.width} height={r.height} rx="8" fill="black" />
        </mask>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="rgba(0,0,0,0.55)" mask="url(#tour-spotlight-mask)" />
      <rect
        x={r.left}
        y={r.top}
        width={r.width}
        height={r.height}
        rx="8"
        fill="none"
        stroke="var(--ifm-color-primary)"
        strokeWidth="2"
        className="animate-[tour-pulse_2s_ease-in-out_infinite]"
      />
    </svg>
  );
}

/* ── Progress dots ────────────────────────────────────────────────── */

function ProgressIndicator({ current, total, tier }) {
  // Compact text counter on phone/tablet where dots would overflow
  if (tier === 'phone' || tier === 'tablet') {
    return (
      <span className="font-usace text-xs tabular-nums text-[var(--font-color-description)]" aria-label={`Step ${current + 1} of ${total}`}>
        {current + 1} / {total}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-1.5" aria-label={`Step ${current + 1} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`inline-block h-1.5 rounded-full transition-all duration-300 ${
            i === current
              ? 'w-5 bg-[var(--ifm-color-primary)]'
              : i < current
                ? 'w-1.5 bg-[var(--ifm-color-primary-light)]'
                : 'w-1.5 bg-gray-300 dark:bg-gray-600'
          }`}
        />
      ))}
    </div>
  );
}

/* ── Main Tour Component ──────────────────────────────────────────── */

export default function SiteTour({ latestVersions = {} }) {
  const { isTourActive, currentStep, totalSteps, nextStep, prevStep, endTour, startTour } = useTour();
  const baseUrl = useBaseUrl('/');
  const history = useHistory();
  const location = useLocation();
  const lifeSimBase = useMemo(() => getLifeSimBase(latestVersions), [latestVersions]);
  const [tier, setTier] = useState(() => getTier());
  const steps = useMemo(() => buildSteps(baseUrl, tier), [baseUrl, tier]);
  const tooltipRef = useRef(null);
  const [targetRect, setTargetRect] = useState(null);
  const [spotlightPadding, setSpotlightPadding] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Wrap endTour so exiting always returns to the homepage
  const handleEndTour = useCallback(
    (markComplete) => {
      endTour(markComplete);
      const currentPath = normalizePath(location.pathname);
      const homePath = normalizePath(baseUrl);
      if (currentPath !== homePath) {
        history.push(baseUrl);
      }
    },
    [endTour, location.pathname, baseUrl, history],
  );

  // Re-detect tier once each time the tour activates (handles resize between sessions)
  const prevActive = useRef(false);
  useEffect(() => {
    if (isTourActive && !prevActive.current) {
      setTier(getTier());
    }
    prevActive.current = isTourActive;
  }, [isTourActive]);

  // Register step count when it changes and play entrance animation
  useEffect(() => {
    if (isTourActive && totalSteps !== steps.length) {
      startTour(steps.length);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [isTourActive, totalSteps, steps.length, startTour]);

  // Navigate when the current step requires a different page
  useEffect(() => {
    if (!isTourActive) return;

    const step = steps[currentStep];
    const requiredUrl = getRequiredUrl(step, baseUrl, lifeSimBase);
    if (!requiredUrl) return;

    const currentPath = normalizePath(location.pathname);
    const targetPath = normalizePath(requiredUrl);

    if (currentPath !== targetPath) {
      // Fade out tooltip first, then navigate
      setIsFadingOut(true);
      const navTimer = setTimeout(() => {
        setIsFadingOut(false);
        setIsNavigating(true);
        setTargetRect(null);
        document.documentElement.style.overflow = '';
        document.body.style.overflowY = '';
        history.push(requiredUrl);
      }, 200);
      return () => clearTimeout(navTimer);
    }
  }, [isTourActive, currentStep, steps, baseUrl, lifeSimBase, history, location.pathname]);

  // Detect when navigation completes and let the page settle
  useEffect(() => {
    if (!isNavigating) return;

    const step = steps[currentStep];
    const requiredUrl = getRequiredUrl(step, baseUrl, lifeSimBase);
    if (!requiredUrl) {
      setIsNavigating(false);
      return;
    }

    const currentPath = normalizePath(location.pathname);
    const targetPath = normalizePath(requiredUrl);

    if (currentPath === targetPath) {
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflowY = 'scroll';
        setIsAnimating(true);
        setIsNavigating(false);
        setTimeout(() => setIsAnimating(false), 300);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, isNavigating, currentStep, steps, baseUrl, lifeSimBase]);

  // Find and position the tooltip relative to the target element
  useEffect(() => {
    if (!isTourActive || isNavigating) return;

    const step = steps[currentStep];
    if (!step) return;

    // Helper: position the tooltip centered (no spotlight).
    // Double-rAF ensures the new step content is painted before measuring.
    const centerTooltip = () => {
      setTargetRect(null);
      setSpotlightPadding(null);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!tooltipRef.current) return;
          const tRect = tooltipRef.current.getBoundingClientRect();
          const vh = window.innerHeight;
          const top = Math.max(12, Math.min((vh - tRect.height) / 2, vh - tRect.height - 12));
          const left = tier === 'phone' ? 12 : (window.innerWidth - tRect.width) / 2;
          setTooltipPos({ top, left });
        });
      });
    };

    const findTarget = (attempt = 0) => {
      if (!step.selector) {
        centerTooltip();
        return;
      }

      let el = document.querySelector(step.selector);
      // If primary element exists but is hidden/zero-size, try fallback instead
      if (el) {
        const pRect = el.getBoundingClientRect();
        if (pRect.width === 0 || pRect.height === 0) el = null;
      }
      if (!el && step.selectorFallback) {
        el = document.querySelector(step.selectorFallback);
      }

      // Treat zero-size elements (e.g. scale(0) / visibility:hidden) as not yet ready
      const elRect = el?.getBoundingClientRect();
      const elReady = el && elRect && elRect.width > 0 && elRect.height > 0;

      // Retry a few times after navigation in case DOM hasn't rendered yet
      if (!elReady && attempt < 3) {
        setTimeout(() => findTarget(attempt + 1), 200);
        return;
      }

      if (!elReady) {
        centerTooltip();
        return;
      }

      const rect = clipToViewport(el.getBoundingClientRect());

      // If the element is entirely off-screen (clipped to zero area), center instead
      if (rect.width === 0 || rect.height === 0) {
        centerTooltip();
        return;
      }

      setTargetRect(rect);
      setSpotlightPadding(step.padding);

      // Position tooltip after a tick so the ref is sized
      requestAnimationFrame(() => {
        if (!tooltipRef.current) return;
        const tRect = tooltipRef.current.getBoundingClientRect();
        const pos = getTooltipStyle(rect, step.placement || 'bottom', tRect.width, tRect.height, tier);
        setTooltipPos(pos);
      });
    };

    // Longer delay after a navigation to let the page fully render
    const delay = step.page !== 'home' ? 200 : 50;
    const posTimer = setTimeout(findTarget, delay);

    // Reposition on resize
    const handleResize = () => findTarget();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(posTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [isTourActive, currentStep, steps, isNavigating, tier]);

  // Keyboard navigation
  useEffect(() => {
    if (!isTourActive || isNavigating) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleEndTour(false);
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (currentStep < steps.length - 1) nextStep();
        else handleEndTour(true);
      }
      if (e.key === 'ArrowLeft') prevStep();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTourActive, currentStep, steps.length, nextStep, prevStep, handleEndTour, isNavigating]);

  if (!isTourActive) return null;

  // Dark overlay only while navigating between pages
  if (isNavigating) {
    return (
      <div className="fixed inset-0 z-[10000]" role="dialog" aria-modal="true" aria-label="Site tour">
        <div className="pointer-events-none fixed inset-0 z-[10001] bg-black/55" />
      </div>
    );
  }

  const step = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;
  const isCentered = !step.selector || !targetRect;

  return (
    <div className="fixed inset-0 z-[10000]" role="dialog" aria-modal="true" aria-label="Site tour">
      <SpotlightOverlay rect={isCentered ? null : targetRect} padding={spotlightPadding} />

      {/* Click-shield: clicking the overlay advances or dismisses */}
      <div className="fixed inset-0 z-[10002] cursor-pointer" onClick={() => (isLast ? handleEndTour(true) : nextStep())} />

      {/* Tooltip card */}
      <div
        ref={tooltipRef}
        className={`tour-tooltip ${isAnimating ? 'tour-tooltip--entering' : ''} ${isCentered ? 'tour-tooltip--centered' : ''} ${isFadingOut ? 'tour-tooltip--exiting' : ''} ${tier === 'phone' ? 'tour-tooltip--phone' : ''}`}
        style={{
          position: 'fixed',
          top: tooltipPos.top,
          left: tooltipPos.left,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div key={currentStep} className="relative flex min-h-0 flex-1 flex-col animate-[tour-content-fade_0.45s_ease-out]">
          {/* Close button */}
          <button
            type="button"
            onClick={() => handleEndTour(false)}
            className="absolute right-0 top-0 z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--font-color-description)] transition-colors hover:bg-[var(--surface-card)] hover:text-[var(--font-color)]"
            aria-label="Close tour"
            title="Close tour"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Header — always visible */}
          <div className="flex shrink-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--ifm-color-primary-lightest)] text-[var(--ifm-color-primary)] dark:bg-[var(--ifm-color-primary-darkest)] dark:text-[var(--ifm-color-primary-light)]">
              {icons[step.icon] || icons.compass}
            </span>
            <div className="flex-1">
              <h3 className="m-0 font-usace text-base font-semibold text-font-color dark:text-gray-100">{step.title}</h3>
            </div>
          </div>

          {/* Body — scrolls when viewport is short */}
          <div className="mt-3 min-h-0 flex-1 overflow-y-auto">
            <div className="font-usace text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {step.content}
              {step.contentAfter && <div className="mt-2">{step.contentAfter}</div>}
            </div>
          </div>

          {/* Footer — always visible */}
          <div className="mt-4 flex shrink-0 items-center justify-between">
            <ProgressIndicator current={currentStep} total={steps.length} tier={tier} />

            <div className="flex items-center gap-2">
              {!isFirst && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="cursor-pointer rounded-lg border-none bg-transparent px-4 py-1.5 font-usace text-sm font-medium text-[var(--font-color-description)] transition-all duration-150 hover:bg-[var(--surface-card)] hover:text-[var(--font-color)]"
                >
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={() => (isLast ? handleEndTour(true) : nextStep())}
                className="cursor-pointer rounded-lg border-none bg-[var(--ifm-color-primary)] px-4 py-1.5 font-usace text-sm font-medium text-white transition-all duration-150 hover:bg-[var(--ifm-color-primary-dark)]"
              >
                {isLast ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
