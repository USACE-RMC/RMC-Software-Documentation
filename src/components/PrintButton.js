import React from 'react';

/**
 * Small printer icon button for triggering the browser print dialog.
 * Renders in the NavContainer row; hidden in print via @media print in print.css.
 */
export default function PrintButton() {
  return (
    <button
      type="button"
      className="print-button"
      onClick={() => window.print()}
      title="Print this page"
      aria-label="Print this page"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="6 9 6 2 18 2 18 9" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
      </svg>
    </button>
  );
}
