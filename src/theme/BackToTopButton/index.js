/**
 * Swizzled from @docusaurus/theme-classic BackToTopButton.
 * Only change: replaced the polyfill smooth-scroll animation with a direct
 * window.scrollTo call so tapping the button reliably scrolls all the way
 * to the top of the page on mobile devices.
 */
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useScrollPosition } from '@docusaurus/theme-common/internal';
import { useLocationChange } from '@docusaurus/theme-common/internal';

import styles from './styles.module.css';

const threshold = 300;

export default function BackToTopButton() {
  const [shown, setShown] = useState(false);
  const isFocusedAnchor = useRef(false);

  useScrollPosition(({ scrollY: scrollTop }, lastPosition) => {
    const lastScrollTop = lastPosition?.scrollY;
    if (!lastScrollTop) return;

    if (isFocusedAnchor.current) {
      isFocusedAnchor.current = false;
    } else if (scrollTop < threshold) {
      setShown(false);
    } else if (scrollTop + window.innerHeight < document.documentElement.scrollHeight) {
      setShown(true);
    }
  });

  useLocationChange((locationChangeEvent) => {
    if (locationChangeEvent.location.hash) {
      isFocusedAnchor.current = true;
      setShown(false);
    }
  });

  return (
    <button
      aria-label={translate({
        id: 'theme.BackToTopButton.buttonAriaLabel',
        message: 'Scroll back to top',
        description: 'The ARIA label for the back to top button',
      })}
      className={clsx('clean-btn', ThemeClassNames.common.backToTopButton, styles.backToTopButton, shown && styles.backToTopButtonShow)}
      type="button"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setShown(false);
      }}
    />
  );
}
