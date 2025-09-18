import { useMemo } from 'react';
import '../css/custom.css';

/**
 * Steps.js
 * Props:
 * - title?: string
 * - variant?: 'cards' | 'timeline' | 'accordion' (default: 'cards')
 * - start?: number (default: 1)
 * - columns?: 1 | 2       (cards only)
 * - dense?: boolean       (tighter spacing)
 * - sectionId?: string    (prefix for deep-link anchors)
 * - items: Array<{
 *     id?: string
 *     label?: string      // override index label (e.g., '5a')
 *     title: React.ReactNode
 *     body?: React.ReactNode
 *     href?: string
 *     children?: Array<{ id?: string; title: React.ReactNode; body?: React.ReactNode }>
 *   }>
 */

export default function Steps({
  title,
  variant = 'cards',
  start = 1,
  columns = 1,
  dense = false,
  sectionId,
  items = [],
}) {
  const listId = sectionId || (typeof title === 'string' ? slugify(title) : undefined);
  const numbered = useMemo(
    () =>
      items.map((it, i) => ({
        ...it,
        _index: i + start,
        _id: it.id || slugify(String(it.title ?? `step-${i + start}`)),
      })),
    [items, start],
  );

  return (
    <section
      aria-labelledby={listId ? `${listId}-title` : undefined}
      className="my-6 text-[var(--font-color)]"
    >
      {title && (
        <h3 id={listId ? `${listId}-title` : undefined} className="mb-3 text-xl font-semibold">
          {title}
        </h3>
      )}

      <ol className="m-0 list-none p-0">
        {variant === 'timeline' &&
          numbered.map((it) => (
            <li key={it._id} className="relative mb-5 pl-12">
              <span
                aria-hidden
                className="absolute bottom-0 left-5 top-4 w-px bg-[var(--border-color)]"
              />
              <a
                href={`#${anchorId(listId, it._id)}`}
                id={anchorId(listId, it._id)}
                title="Copy link to this step"
                className="absolute left-2 top-0 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-color)] bg-white text-sm font-semibold shadow-sm hover:ring-2 hover:ring-[var(--ifm-color-primary-lightest)]"
              >
                <span className="sr-only">Step </span>
                {it.label || it._index}
              </a>

              <div className={dense ? 'mt-1' : 'mt-2'}>
                <StepHeader it={it} />
                <StepBody it={it} dense={dense} />
                {it.children?.length ? (
                  <Substeps
                    parentAnchor={anchorId(listId, it._id)}
                    items={it.children}
                    dense={dense}
                  />
                ) : null}
              </div>
            </li>
          ))}

        {variant === 'cards' && (
          <li className="list-none">
            <div
              className={['grid gap-4', columns === 2 ? 'md:grid-cols-2' : 'grid-cols-1'].join(' ')}
            >
              {numbered.map((it) => (
                <article
                  key={it._id}
                  id={anchorId(listId, it._id)}
                  className={[
                    'rounded-2xl border border-[var(--border-color)] bg-white p-5 shadow-sm',
                    dense ? 'p-4' : '',
                  ].join(' ')}
                >
                  <div className="flex items-start gap-3">
                    <a
                      href={`#${anchorId(listId, it._id)}`}
                      title="Copy link to this step"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border-color)] bg-white text-sm font-semibold shadow-sm hover:ring-2 hover:ring-[var(--ifm-color-primary-lightest)]"
                    >
                      <span className="sr-only">Step </span>
                      {it.label || it._index}
                    </a>
                    <div className="min-w-0 flex-1">
                      <StepHeader it={it} />
                      <StepBody it={it} dense={dense} />
                      {it.children?.length ? (
                        <Substeps
                          parentAnchor={anchorId(listId, it._id)}
                          items={it.children}
                          dense={dense}
                          variant="inline"
                        />
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </li>
        )}

        {variant === 'accordion' &&
          numbered.map((it) => (
            <li key={it._id} className="mb-3">
              <details
                id={anchorId(listId, it._id)}
                className="group rounded-xl border border-[var(--border-color)] bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center gap-3 rounded-xl px-4 py-3 hover:bg-[var(--ifm-background-color-theme)]">
                  <a
                    href={`#${anchorId(listId, it._id)}`}
                    title="Copy link to this step"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border-color)] bg-white text-sm font-semibold shadow-sm group-open:bg-[var(--ifm-background-color-theme)]"
                  >
                    {it.label || it._index}
                  </a>
                  <StepHeader it={it} as="h4" className="m-0" />
                </summary>
                <div className={['px-5 pb-5', dense ? 'pt-2' : 'pt-3'].join(' ')}>
                  <StepBody it={it} dense={dense} />
                  {it.children?.length ? (
                    <Substeps
                      parentAnchor={anchorId(listId, it._id)}
                      items={it.children}
                      dense={dense}
                    />
                  ) : null}
                </div>
              </details>
            </li>
          ))}
      </ol>
    </section>
  );
}

function StepHeader({ it, as: Tag = 'h4', className = '' }) {
  return (
    <Tag className={['text-base font-semibold leading-6', className].join(' ')}>
      {it.title}
      {it.href ? (
        <>
          {' '}
          <a
            href={it.href}
            className="text-sm font-normal underline decoration-dotted underline-offset-4 hover:text-[var(--ifm-color-primary)]"
          >
            Learn more
          </a>
        </>
      ) : null}
    </Tag>
  );
}

function StepBody({ it, dense }) {
  if (!it.body && !it.children?.length) return null;
  return (
    <div className={['prose max-w-none', dense ? 'prose-p:my-1' : ''].join(' ')}>{it.body}</div>
  );
}

function Substeps({ parentAnchor, items = [], dense, variant }) {
  return (
    <ol className={['ml-8 mt-3 list-decimal'].join(' ')}>
      {items.map((c, i) => {
        const cid = c.id || slugify(String(c.title ?? `sub-${i + 1}`));
        const fullAnchor = `${parentAnchor}-${cid}`;
        return (
          <li key={cid} id={fullAnchor}>
            <div className={variant === 'inline' ? '' : 'mt-1'}>
              <div className="text-[0.95rem] font-medium">{c.title}</div>
              {c.body ? (
                <div
                  className={['prose max-w-none', dense ? 'prose-p:my-1' : 'prose-p:my-2'].join(
                    ' ',
                  )}
                >
                  {c.body}
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function slugify(s = '') {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s\-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/\-+/g, '-');
}

function anchorId(sectionId, stepId) {
  return sectionId ? `${sectionId}-${stepId}` : stepId;
}
