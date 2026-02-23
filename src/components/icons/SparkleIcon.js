import { useId } from 'react';

const ICON_PATH =
  'M 240 120 L 261 279 L 420 300 L 261 321 L 240 470 L 219 321 L 90 300 L 219 279 Z M 400 95 L 409 146 L 460 155 L 409 164 L 400 215 L 391 164 L 340 155 L 391 146 Z M 370 395 L 374 416 L 395 420 L 374 424 L 370 445 L 366 424 L 345 420 L 366 416 Z';

const FILLED_VIEWBOX = '0 0 562.04 562.04';
const ICON_VIEWBOX = '75 75 412 412';

export default function SparkleIcon({ className = '', color = 'currentColor', size = 48, showBackground = true }) {
  const id = useId();
  const gradientId = `sparkle-grad${id}`;
  const filterId = `sparkle-shadow${id}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={showBackground ? FILLED_VIEWBOX : ICON_VIEWBOX}
      width={size}
      height={size}
      className={className}
      overflow={showBackground ? 'visible' : undefined}
      aria-hidden="true"
    >
      {showBackground ? (
        <>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2a5068" />
              <stop offset="50%" stopColor="#4a7c9b" />
              <stop offset="100%" stopColor="#7fb5d0" />
            </linearGradient>
            <filter id={filterId}>
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#1E3A4F" floodOpacity="0.3" />
            </filter>
          </defs>
          <circle cx="281.02" cy="281.02" r="281.02" fill={`url(#${gradientId})`} filter={`url(#${filterId})`} />
          <path d={ICON_PATH} fill="white" />
        </>
      ) : (
        <path d={ICON_PATH} fill={color} />
      )}
    </svg>
  );
}
