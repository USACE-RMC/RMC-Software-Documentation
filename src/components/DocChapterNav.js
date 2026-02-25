import React, { useCallback } from 'react';
import clsx from 'clsx';
import { useCollapsible, Collapsible } from '@docusaurus/theme-common';
import { useDocsSidebar, isActiveSidebarItem } from '@docusaurus/plugin-content-docs/client';
import { useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import '../css/chapter-nav.css';

function ChapterNavLink({ item, activePath, onNavigate, nested }) {
  const isActive = isActiveSidebarItem(item, activePath);
  return (
    <li>
      <Link
        to={item.href}
        className={clsx('chapter-nav__link', isActive && 'chapter-nav__link--active', nested && 'chapter-nav__link--nested')}
        onClick={onNavigate}
        aria-current={isActive ? 'page' : undefined}
      >
        {item.label}
      </Link>
    </li>
  );
}

function ChapterNavCategory({ item, activePath, onNavigate, nested }) {
  return (
    <>
      {item.href ? (
        <li>
          <Link
            to={item.href}
            className={clsx('chapter-nav__link', isActiveSidebarItem(item, activePath) && 'chapter-nav__link--active', nested && 'chapter-nav__link--nested')}
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        </li>
      ) : (
        <li className="chapter-nav__category-label">{item.label}</li>
      )}
      {item.items.map((subItem, i) => (
        <ChapterNavItem key={subItem.label ?? i} item={subItem} activePath={activePath} onNavigate={onNavigate} nested />
      ))}
    </>
  );
}

function ChapterNavItem({ item, activePath, onNavigate, nested }) {
  if (item.type === 'link') {
    return <ChapterNavLink item={item} activePath={activePath} onNavigate={onNavigate} nested={nested} />;
  }
  if (item.type === 'category') {
    return <ChapterNavCategory item={item} activePath={activePath} onNavigate={onNavigate} nested={nested} />;
  }
  return null;
}

export default function DocChapterNav() {
  const sidebar = useDocsSidebar();
  const { pathname } = useLocation();
  const { collapsed, toggleCollapsed } = useCollapsible({ initialState: true });

  const onNavigate = useCallback(() => {
    if (!collapsed) {
      toggleCollapsed();
    }
  }, [collapsed, toggleCollapsed]);

  if (!sidebar) {
    return null;
  }

  return (
    <div className={clsx('chapter-nav', !collapsed && 'chapter-nav--expanded')}>
      <button
        type="button"
        className={clsx('clean-btn', 'chapter-nav__button', !collapsed && 'chapter-nav__button--expanded')}
        onClick={toggleCollapsed}
        aria-expanded={!collapsed}
        aria-label={collapsed ? 'Show document chapters' : 'Hide document chapters'}
      >
        In this document
      </button>
      <Collapsible lazy className="chapter-nav__content" collapsed={collapsed}>
        <ul>
          {sidebar.items.map((item, i) => (
            <ChapterNavItem key={item.label ?? i} item={item} activePath={pathname} onNavigate={onNavigate} />
          ))}
        </ul>
      </Collapsible>
    </div>
  );
}
