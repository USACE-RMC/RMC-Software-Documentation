import useBaseUrl from '@docusaurus/useBaseUrl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTour } from '../contexts/TourContext';

/*
 * ────────────────────────────────────────────────────────────────────
 *  Tour step definitions
 *
 *  Each step either targets a live DOM element (via `selector`) or
 *  shows a centered modal card (when no selector is provided).
 *
 *  Placement controls tooltip position relative to the target:
 *    top | bottom | left | right  (default: bottom)
 * ────────────────────────────────────────────────────────────────────
 */
const buildSteps = (baseUrl) => [
  {
    title: 'Welcome to RMC Software Documentation',
    content:
      'This quick tour will show you how to navigate the site, find documents, and use the interactive features built into every page. You can revisit this tour anytime from the homepage.',
    icon: 'compass',
  },
  {
    title: 'Main Navigation',
    content:
      'The top navigation bar organizes all documentation into three categories: Desktop Applications, Toolbox Technical Manuals, and Web Applications. Hover over each to see the available tools and their documents.',
    selector: 'header.gw-sticky nav, header.gw-sticky .gw-hidden.md\\:gw-flex',
    placement: 'bottom',
    icon: 'menu',
  },
  {
    title: 'Search',
    content:
      'Use the search bar to quickly find any content across all documents. Search works across all versions and document types \u2014 just start typing a keyword, figure number, or topic.',
    selector: '.search-wrapper',
    placement: 'bottom',
    icon: 'search',
  },
  {
    title: 'Dark Mode',
    content: 'Toggle between light and dark themes to suit your preference. The entire site, including figures and tables, adapts to your chosen theme.',
    selector: 'button[aria-label*="Switch to"]',
    placement: 'bottom',
    icon: 'theme',
  },
  {
    title: 'Homepage Categories',
    content:
      'The homepage displays all available software organized into categories. Active tools have interactive cards that take you directly to their documentation hub. Grayed-out cards indicate tools with documentation coming soon.',
    selector: '.main-content-container',
    placement: 'top',
    icon: 'grid',
  },
  {
    title: 'Sidebar Navigation',
    content:
      'When viewing a document, the left sidebar shows all chapters and sections. Click any item to jump directly to that section. The sidebar reflects the document\u2019s full table of contents.',
    selector: '.theme-doc-sidebar-container',
    selectorFallback: 'aside',
    placement: 'right',
    icon: 'sidebar',
    requiresDocPage: true,
  },
  {
    title: 'Table of Contents',
    content:
      'The right-side table of contents shows the headings on the current page. Click any heading to scroll directly to that section. The active heading is highlighted as you scroll.',
    selector: '.table-of-contents',
    selectorFallback: '.col--3',
    placement: 'left',
    icon: 'toc',
    requiresDocPage: true,
  },
  {
    title: 'Breadcrumb Trail',
    content: 'Breadcrumbs at the top of each page show your current location in the documentation hierarchy. Click any segment to navigate back up to that level.',
    selector: '.breadcrumbs, nav[aria-label="Breadcrumbs"]',
    placement: 'bottom',
    icon: 'breadcrumb',
    requiresDocPage: true,
  },
  {
    title: 'Interactive Figure Previews',
    content:
      'Throughout the documents, figure references (e.g., "Figure 3") are clickable links. Hover over them to see a preview popup of the figure without leaving the page. Click to jump to the full figure.',
    icon: 'image',
  },
  {
    title: 'Version Control',
    content:
      'Many documents have multiple versions. Look for the version selector dropdown near the top of document pages. If you\u2019re viewing an older version, a notice banner will appear with a link to the latest version.',
    icon: 'version',
  },
  {
    title: 'Document Information',
    content:
      'Each document includes a "Document Information" page with metadata such as the report date, authors, abstract, and citation guide. Look for it in the sidebar, usually as the first entry.',
    icon: 'info',
  },
  {
    title: 'References & Citations',
    content:
      'Academic citations appear as numbered superscripts (e.g., [1]) next to the in-text reference. Click the number to jump to the full reference in the bibliography section at the end of the document.',
    icon: 'citation',
  },
  {
    title: 'You\u2019re All Set!',
    content:
      'You now know the essentials of navigating this site. Remember, you can always restart this tour from the homepage. Happy reading!',
    icon: 'check',
  },
];

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
      <path d="M3 21c3-3 3-6 3-9V6a2 2 0 0 1 2-2h2" />
      <path d="M14 21c3-3 3-6 3-9V6a2 2 0 0 1 2-2h2" />
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

function getTooltipStyle(rect, placement, tooltipW, tooltipH) {
  const GAP = 16;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let top, left;

  switch (placement) {
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

/* ── Spotlight overlay (four rects around the target) ─────────────── */

function SpotlightOverlay({ rect }) {
  if (!rect) {
    return <div className="tour-overlay tour-overlay--full" />;
  }

  const pad = 8;
  const r = {
    top: Math.max(0, rect.top - pad),
    left: Math.max(0, rect.left - pad),
    width: rect.width + pad * 2,
    height: rect.height + pad * 2,
  };

  return (
    <svg className="tour-overlay" viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`} preserveAspectRatio="none">
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
        className="tour-spotlight-ring"
      />
    </svg>
  );
}

/* ── Progress dots ────────────────────────────────────────────────── */

function ProgressDots({ current, total }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`Step ${current + 1} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`inline-block h-1.5 rounded-full transition-all duration-300 ${
            i === current ? 'w-5 bg-[var(--ifm-color-primary)]' : i < current ? 'w-1.5 bg-[var(--ifm-color-primary-light)]' : 'w-1.5 bg-gray-300 dark:bg-gray-600'
          }`}
        />
      ))}
    </div>
  );
}

/* ── Main Tour Component ──────────────────────────────────────────── */

export default function SiteTour() {
  const { isTourActive, currentStep, totalSteps, nextStep, prevStep, endTour, startTour } = useTour();
  const baseUrl = useBaseUrl('/');
  const steps = useMemo(() => buildSteps(baseUrl), [baseUrl]);
  const tooltipRef = useRef(null);
  const [targetRect, setTargetRect] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  // Register step count on mount
  useEffect(() => {
    if (isTourActive && totalSteps !== steps.length) {
      startTour(steps.length);
    }
  }, [isTourActive, totalSteps, steps.length, startTour]);

  // Find and position the tooltip relative to the target element
  useEffect(() => {
    if (!isTourActive) return;

    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);

    const step = steps[currentStep];
    if (!step) return;

    const findTarget = () => {
      if (!step.selector) {
        setTargetRect(null);
        return;
      }

      let el = document.querySelector(step.selector);
      if (!el && step.selectorFallback) {
        el = document.querySelector(step.selectorFallback);
      }
      if (!el) {
        setTargetRect(null);
        return;
      }

      const rect = el.getBoundingClientRect();
      setTargetRect(rect);

      // Position tooltip after a tick so the ref is sized
      requestAnimationFrame(() => {
        if (!tooltipRef.current) return;
        const tRect = tooltipRef.current.getBoundingClientRect();
        const pos = getTooltipStyle(rect, step.placement || 'bottom', tRect.width, tRect.height);
        setTooltipPos(pos);
      });
    };

    // Small delay to let any page transitions settle
    const posTimer = setTimeout(findTarget, 50);

    // Reposition on resize
    const handleResize = () => findTarget();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      clearTimeout(posTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [isTourActive, currentStep, steps]);

  // Keyboard navigation
  useEffect(() => {
    if (!isTourActive) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') endTour(false);
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (currentStep < steps.length - 1) nextStep();
        else endTour(true);
      }
      if (e.key === 'ArrowLeft') prevStep();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTourActive, currentStep, steps.length, nextStep, prevStep, endTour]);

  if (!isTourActive) return null;

  const step = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;
  const isCentered = !step.selector || !targetRect;

  return (
    <div className="tour-container" role="dialog" aria-modal="true" aria-label="Site tour">
      <SpotlightOverlay rect={isCentered ? null : targetRect} />

      {/* Click-shield: clicking the overlay advances or dismisses */}
      <div className="tour-click-shield" onClick={() => (isLast ? endTour(true) : nextStep())} />

      {/* Tooltip card */}
      <div
        ref={tooltipRef}
        className={`tour-tooltip ${isAnimating ? 'tour-tooltip--entering' : ''} ${isCentered ? 'tour-tooltip--centered' : ''}`}
        style={
          isCentered
            ? {}
            : {
                position: 'fixed',
                top: tooltipPos.top,
                left: tooltipPos.left,
              }
        }
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start gap-3">
          <span className="tour-icon">{icons[step.icon] || icons.compass}</span>
          <div className="flex-1">
            <h3 className="m-0 font-usace text-base font-semibold text-font-color dark:text-gray-100">{step.title}</h3>
          </div>
          <button
            type="button"
            onClick={() => endTour(false)}
            className="tour-close"
            aria-label="Close tour"
            title="Close tour"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <p className="mt-3 mb-4 font-usace text-sm leading-relaxed text-gray-600 dark:text-gray-300">{step.content}</p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <ProgressDots current={currentStep} total={steps.length} />

          <div className="flex items-center gap-2">
            {!isFirst && (
              <button type="button" onClick={prevStep} className="tour-btn tour-btn--secondary">
                Back
              </button>
            )}
            {isFirst && (
              <button type="button" onClick={() => endTour(false)} className="tour-btn tour-btn--secondary">
                Skip
              </button>
            )}
            <button type="button" onClick={() => (isLast ? endTour(true) : nextStep())} className="tour-btn tour-btn--primary">
              {isLast ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
