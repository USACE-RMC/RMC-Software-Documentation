import '../css/custom.css';

/**
 * Callout.js
 * Props:
 * - type: 'note' | 'tip' | 'warn' | 'danger'
 * - title?: string
 */
export default function Calloutt({ type = 'note', title, children }) {
  const theme = {
    note: {
      ring: 'hover:ring-2 ring-[var(--ifm-color-primary-lightest)]',
      bg: 'bg-[var(--ifm-background-color-theme)]',
      text: 'text-[var(--font-color)]',
      border: 'border-[var(--border-color)]',
    },
    tip: {
      ring: 'hover:ring-2 ring-[var(--ifm-color-primary-light)]',
      bg: 'bg-white',
      text: 'text-[var(--font-color)]',
      border: 'border-[var(--ifm-color-primary-light)]',
    },
    warn: {
      ring: 'hover:ring-2 ring-yellow-200',
      bg: 'bg-white',
      text: 'text-[var(--font-color)]',
      border: 'border-yellow-300',
    },
    danger: {
      ring: 'hover:ring-2 ring-red-200',
      bg: 'bg-white',
      text: 'text-[var(--font-color)]',
      border: 'border-red-300',
    },
  }[type];

  return (
    <div
      className={[
        'my-4 rounded-xl border p-4 shadow-sm',
        theme.bg,
        theme.text,
        theme.border,
        theme.ring,
      ].join(' ')}
    >
      {title ? <div className="mb-1 text-base font-semibold">{title}</div> : null}
      <div className="prose max-w-none">{children}</div>
    </div>
  );
}
