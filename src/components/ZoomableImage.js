import { useCallback, useRef, useState } from 'react';
import useScrollLock from './scrollLock';

/**
 * An <img> that opens an enlarged view when selected (click, tap, Enter or Space).
 * Used by Figure, FigureNoRef and AnnotatedFigure. Every image with `enabled` (the default) can be
 * enlarged; `enabled={false}` makes it a plain image. The enlarged view shows the image at its real
 * size, or scaled down to fit the window if it is larger; it is never scaled up.
 *
 * The enlarged view is a native <dialog>: Escape, the close button, or a click anywhere closes it.
 * While it is open the page behind it does not scroll, and closing it leaves the page where it was.
 * `overlay` (optional) is drawn over the enlarged image, e.g. AnnotatedFigure's numbered markers.
 */
const ZoomableImage = ({ src, alt, className = '', style, width, height, caption, enabled = true, overlay }) => {
  const dialogRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useScrollLock(isOpen);

  const open = useCallback(() => {
    const d = dialogRef.current;
    if (!d?.showModal || d.open) return;
    d.showModal();
    setIsOpen(true);
  }, []);
  const close = useCallback(() => dialogRef.current?.close?.(), []);

  const active = enabled;

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={[className, active && 'cursor-zoom-in'].filter(Boolean).join(' ')}
        style={style}
        width={width}
        height={height}
        onClick={active ? open : undefined}
        onKeyDown={
          active
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  open();
                }
              }
            : undefined
        }
        role={active ? 'button' : undefined}
        tabIndex={active ? 0 : undefined}
        aria-haspopup={active ? 'dialog' : undefined}
        title={active ? 'Select to enlarge' : undefined}
      />
      {enabled && (
        <dialog
          ref={dialogRef}
          className="figure-zoom-dialog"
          aria-label={alt ? `Enlarged image: ${alt}` : 'Enlarged image'}
          onClick={close}
          onClose={() => setIsOpen(false)}
        >
          <button type="button" className="figure-zoom-close" onClick={close} aria-label="Close enlarged image">
            ×
          </button>
          {overlay ? (
            <div className="figure-zoom-frame" onClick={(e) => e.stopPropagation()}>
              <img src={src} alt={alt} className="figure-zoom-img" />
              {overlay}
            </div>
          ) : (
            <img src={src} alt={alt} className="figure-zoom-img" />
          )}
          {caption ? <div className="figure-zoom-caption">{caption}</div> : null}
        </dialog>
      )}
    </>
  );
};

export default ZoomableImage;
