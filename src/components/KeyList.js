import '../css/custom.css';

/**
 * KeyList.js
 * Props:
 * - title?: string
 * - items: Array<React.ReactNode>
 * - columns?: 1|2|3 (default: 2)
 * - variant?: 'pills' | 'cards' (default: 'cards')
 */
export default function KeyList({ title, items = [], columns = 2, variant = 'cards' }) {
  return (
    <section className="my-6">
      {title ? (
        <h4 className="mb-3 text-lg font-semibold text-[var(--font-color)]">{title}</h4>
      ) : null}
      <div
        className={[
          'grid gap-3',
          columns === 3 ? 'md:grid-cols-3' : columns === 2 ? 'md:grid-cols-2' : 'grid-cols-1',
        ].join(' ')}
      >
        {items.map((it, i) => (
          <div
            key={i}
            className={
              variant === 'pills'
                ? 'rounded-full border border-[var(--border-color)] bg-white px-4 py-2 text-[var(--font-color)]'
                : 'rounded-xl border border-[var(--border-color)] bg-white px-4 py-3 text-[var(--font-color)] shadow-sm'
            }
          >
            <div className="prose max-w-none">{it}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
