/**
 * Swizzled from @docusaurus/theme-classic DocItem/Layout.
 * Changes:
 *  - Replaced the separate DocChapterNav ("In this document") and
 *    DocItemTOCMobile ("On this page") dropdowns with a single unified
 *    InlineNav tabbed panel for narrow viewports.
 *  - Added FloatingNav FAB + bottom-sheet drawer so users can reach
 *    the same navigation without scrolling to the top when the
 *    viewport is narrow (< 1080 px).
 */
import React from 'react';
import clsx from 'clsx';
import { useWindowSize } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import ContentVisibility from '@theme/ContentVisibility';
import FloatingNav, { InlineNav } from '@site/src/components/FloatingNav';
import styles from './styles.module.css';

function useDocTOC() {
  const { frontMatter, toc } = useDoc();
  const windowSize = useWindowSize();
  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;
  const desktop = canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? <DocItemTOCDesktop /> : undefined;
  return { hidden, desktop };
}

export default function DocItemLayout({ children }) {
  const docTOC = useDocTOC();
  const { metadata } = useDoc();
  return (
    <div className="row">
      <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <DocBreadcrumbs />
            <DocVersionBadge />
            <InlineNav />
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>
      {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
      <FloatingNav />
    </div>
  );
}
