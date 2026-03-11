/**
 * FloatingNav + InlineNav — unified navigation components for narrow viewports
 * (< 1080 px), covering mobile, tablet, and desktop split-screen.
 *
 *  • InlineNav  — collapsible tabbed panel rendered at the top of each doc page,
 *                 replacing the separate DocChapterNav and TOCMobile dropdowns.
 *  • FloatingNav — a FAB that opens a bottom-sheet drawer with the same tabbed
 *                  panel, accessible without scrolling back to the top.
 *
 * Both share the same tab UI, link styles, and data sources so the experience
 * is consistent regardless of how the user accesses navigation.
 */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import clsx from 'clsx';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { useDocsSidebar, isActiveSidebarItem } from '@docusaurus/plugin-content-docs/client';
import { useLocation } from '@docusaurus/router';
import { useCollapsible, Collapsible } from '@docusaurus/theme-common';
import { useFilteredAndTreeifiedTOC } from '@docusaurus/theme-common/internal';
import { useScrollPosition } from '@docusaurus/theme-common/internal';
import { useLocationChange } from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import '../css/floating-nav.css';

const SCROLL_THRESHOLD = 300;
const DESKTOP_BREAKPOINT = 1080;

/* ------------------------------------------------------------------ */
/*  TOC tree rendering (page headings)                                */
/* ------------------------------------------------------------------ */

function TOCTree({ toc, onNavigate }) {
  if (!toc.length) return null;
  return (
    <ul className="floating-nav__toc-list">
      {toc.map((node) => (
        <li key={node.id}>
          <a
            href={`#${node.id}`}
            className="floating-nav__toc-link"
            onClick={onNavigate}
            dangerouslySetInnerHTML={{ __html: node.value }}
          />
          {node.children?.length > 0 && (
            <ul className="floating-nav__toc-sublist">
              {node.children.map((child) => (
                <li key={child.id}>
                  <a
                    href={`#${child.id}`}
                    className="floating-nav__toc-link floating-nav__toc-link--nested"
                    onClick={onNavigate}
                    dangerouslySetInnerHTML={{ __html: child.value }}
                  />
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar tree rendering (document chapters)                        */
/* ------------------------------------------------------------------ */

function SidebarLink({ item, activePath, onNavigate, nested }) {
  const isActive = isActiveSidebarItem(item, activePath);
  return (
    <li>
      <Link
        to={item.href}
        className={clsx('floating-nav__sidebar-link', isActive && 'floating-nav__sidebar-link--active', nested && 'floating-nav__sidebar-link--nested')}
        onClick={onNavigate}
        aria-current={isActive ? 'page' : undefined}
      >
        {item.label}
      </Link>
    </li>
  );
}

function SidebarCategory({ item, activePath, onNavigate, nested }) {
  return (
    <>
      {item.href ? (
        <li>
          <Link
            to={item.href}
            className={clsx('floating-nav__sidebar-link', isActiveSidebarItem(item, activePath) && 'floating-nav__sidebar-link--active', nested && 'floating-nav__sidebar-link--nested')}
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        </li>
      ) : (
        <li className="floating-nav__category-label">{item.label}</li>
      )}
      {item.items.map((sub, i) => (
        <SidebarItem key={sub.label ?? i} item={sub} activePath={activePath} onNavigate={onNavigate} nested />
      ))}
    </>
  );
}

function SidebarItem({ item, activePath, onNavigate, nested }) {
  if (item.type === 'link') return <SidebarLink item={item} activePath={activePath} onNavigate={onNavigate} nested={nested} />;
  if (item.type === 'category') return <SidebarCategory item={item} activePath={activePath} onNavigate={onNavigate} nested={nested} />;
  return null;
}

/* ------------------------------------------------------------------ */
/*  Shared hooks — doc data available to both InlineNav & FloatingNav */
/* ------------------------------------------------------------------ */

function useNavData() {
  const { toc, frontMatter } = useDoc();
  const sidebar = useDocsSidebar();
  const { pathname } = useLocation();

  const hidden = frontMatter.hide_table_of_contents;
  const tocTree = useFilteredAndTreeifiedTOC({
    toc,
    minHeadingLevel: frontMatter.toc_min_heading_level ?? 2,
    maxHeadingLevel: frontMatter.toc_max_heading_level ?? 3,
  });

  const hasTOC = !hidden && tocTree.length > 0;
  const hasSidebar = !!sidebar;

  return { tocTree, sidebar, pathname, hasTOC, hasSidebar };
}

/* ------------------------------------------------------------------ */
/*  NavPanelContent — shared tabs + body used by both components      */
/* ------------------------------------------------------------------ */

function NavPanelContent({ hasTOC, hasSidebar, tocTree, sidebar, pathname, tab, setTab, onNavigate, bodyClassName }) {
  const effectiveTab = tab === 'page' && !hasTOC ? 'doc' : tab === 'doc' && !hasSidebar ? 'page' : tab;

  return (
    <>
      {/* Tab bar — only show both tabs when both sections have content */}
      {hasTOC && hasSidebar && (
        <div className="floating-nav__tabs" role="tablist">
          <button
            type="button"
            role="tab"
            className={clsx('floating-nav__tab', effectiveTab === 'page' && 'floating-nav__tab--active')}
            onClick={() => setTab('page')}
            aria-selected={effectiveTab === 'page'}
          >
            On this page
          </button>
          <button
            type="button"
            role="tab"
            className={clsx('floating-nav__tab', effectiveTab === 'doc' && 'floating-nav__tab--active')}
            onClick={() => setTab('doc')}
            aria-selected={effectiveTab === 'doc'}
          >
            In this document
          </button>
        </div>
      )}

      {/* Single-section header when only one type of content */}
      {hasTOC && !hasSidebar && <div className="floating-nav__header">On this page</div>}
      {!hasTOC && hasSidebar && <div className="floating-nav__header">In this document</div>}

      {/* Scrollable content */}
      <div className={clsx('floating-nav__body', bodyClassName)} role="tabpanel">
        {effectiveTab === 'page' && hasTOC && <TOCTree toc={tocTree} onNavigate={onNavigate} />}
        {effectiveTab === 'doc' && hasSidebar && (
          <ul className="floating-nav__sidebar-list">
            {sidebar.items.map((item, i) => (
              <SidebarItem key={item.label ?? i} item={item} activePath={pathname} onNavigate={onNavigate} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  InlineNav — collapsible tabbed panel at the top of the page       */
/* ------------------------------------------------------------------ */

export function InlineNav() {
  const { tocTree, sidebar, pathname, hasTOC, hasSidebar } = useNavData();
  const { collapsed, toggleCollapsed } = useCollapsible({ initialState: true });
  const [tab, setTab] = useState('page');

  const onNavigate = useCallback(() => {
    if (!collapsed) toggleCollapsed();
  }, [collapsed, toggleCollapsed]);

  if (!hasTOC && !hasSidebar) return null;

  // Pick a sensible label based on available content
  const label = hasTOC && hasSidebar ? 'Page navigation' : hasTOC ? 'On this page' : 'In this document';

  return (
    <div className={clsx('floating-nav-inline', !collapsed && 'floating-nav-inline--expanded')}>
      <button
        type="button"
        className={clsx('clean-btn', 'floating-nav-inline__toggle', !collapsed && 'floating-nav-inline__toggle--expanded')}
        onClick={toggleCollapsed}
        aria-expanded={!collapsed}
        aria-label={collapsed ? `Show ${label.toLowerCase()}` : `Hide ${label.toLowerCase()}`}
      >
        {label}
      </button>
      <Collapsible lazy className="floating-nav-inline__content" collapsed={collapsed}>
        <NavPanelContent
          hasTOC={hasTOC}
          hasSidebar={hasSidebar}
          tocTree={tocTree}
          sidebar={sidebar}
          pathname={pathname}
          tab={tab}
          setTab={setTab}
          onNavigate={onNavigate}
          bodyClassName="floating-nav-inline__body"
        />
      </Collapsible>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FloatingNav — FAB + bottom-sheet drawer (default export)          */
/* ------------------------------------------------------------------ */

export default function FloatingNav() {
  const { tocTree, sidebar, pathname, hasTOC, hasSidebar } = useNavData();
  const drawerRef = useRef(null);
  const triggerRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('page');
  const [visible, setVisible] = useState(false);
  const [narrow, setNarrow] = useState(false);

  // Nothing to show
  if (!hasTOC && !hasSidebar) return null;

  /* --- viewport width check --- */
  useEffect(() => {
    function check() {
      setNarrow(window.innerWidth < DESKTOP_BREAKPOINT);
    }
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* --- show/hide based on scroll --- */
  useScrollPosition(({ scrollY }, lastPosition) => {
    const last = lastPosition?.scrollY;
    if (!last) return;
    if (scrollY < SCROLL_THRESHOLD) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  });

  /* --- close on navigation --- */
  useLocationChange(() => {
    setOpen(false);
  });

  /* --- close on Escape --- */
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  /* --- focus first item in drawer when open --- */
  useEffect(() => {
    if (!open || !drawerRef.current) return;
    const focusable = drawerRef.current.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])');
    if (focusable.length) focusable[0].focus();
  }, [open, tab]);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  const onNavigate = useCallback(() => {
    setOpen(false);
  }, []);

  // Only render in narrow viewports
  if (!narrow) return null;

  const showButton = visible || open;

  return (
    <>
      {/* FAB trigger */}
      <button
        ref={triggerRef}
        type="button"
        className={clsx('clean-btn', 'floating-nav__fab', showButton && 'floating-nav__fab--visible', open && 'floating-nav__fab--active')}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close navigation' : 'Open page navigation'}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <svg className="floating-nav__fab-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {open ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {/* Backdrop */}
      {open && <div className="floating-nav__backdrop" onClick={close} aria-hidden="true" />}

      {/* Bottom-sheet drawer */}
      <div
        ref={drawerRef}
        className={clsx('floating-nav__drawer', open && 'floating-nav__drawer--open')}
        role="dialog"
        aria-label="Page navigation"
        aria-modal="true"
      >
        <NavPanelContent
          hasTOC={hasTOC}
          hasSidebar={hasSidebar}
          tocTree={tocTree}
          sidebar={sidebar}
          pathname={pathname}
          tab={tab}
          setTab={setTab}
          onNavigate={onNavigate}
        />
      </div>
    </>
  );
}
