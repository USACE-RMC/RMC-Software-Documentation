import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * An <img> that opens a full-screen view when the page shows it smaller than its real size.
 * Used by Figure and FigureNoRef. When the image already shows at (nearly) full size, it behaves
 * like a plain image: no zoom cursor, not focusable, nothing happens on click.
 *
 * The enlarged view is a native <dialog>: Escape, the close button, or a click anywhere closes it.
 */
const ZoomableImage = ({ src, alt, className = '', style, width, height, caption, enabled = true }) => {
  const imgRef = useRef(null);
  const dialogRef = useRef(null);
  const [zoomable, setZoomable] = useState(false);

  const measure = useCallback(() => {
    const img = imgRef.current;
    if (!img || !img.naturalWidth || !img.clientWidth) return;
    setZoomable(img.naturalWidth > img.clientWidth * 1.1);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const img = imgRef.current;
    if (!img) return undefined;
    if (img.complete) measure();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(img);
    return () => ro.disconnect();
  }, [enabled, measure]);

  const open = useCallback(() => dialogRef.current?.showModal?.(), []);
  const close = useCallback(() => dialogRef.current?.close?.(), []);

  const active = enabled && zoomable;

  return (
    <>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${className}${active ? 'cursor-zoom-in' : ''}`}
        style={style}
        width={width}
        height={height}
        onLoad={enabled ? measure : undefined}
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
        <dialog ref={dialogRef} className="figure-zoom-dialog" aria-label={alt ? `Enlarged image: ${alt}` : 'Enlarged image'} onClick={close}>
          <button type="button" className="figure-zoom-close" onClick={close} aria-label="Close enlarged image">
            ×
          </button>
          <img src={src} alt={alt} className="figure-zoom-img" />
          {caption ? <div className="figure-zoom-caption">{caption}</div> : null}
        </dialog>
      )}
    </>
  );
};

export default ZoomableImage;
