import { useId } from 'react';

// Source path from StructuralIcon.svg (viewBox 0 0 37.622 45.244, with translate(18.136 20.252))
// Scaled via transform to fit 562x562 canvas
const STRUCTURAL_PATH =
  'm-18.136-20.252v45.244h37.623l-30.194-38.205v-7.0383h-7.4285zm1.5875 1.5875h4.2535v6.0022l28.504 36.067h-32.757v-42.069z';

const PATH_TRANSFORM = 'translate(122.99 90.98) scale(8.4) translate(18.136 20.252)';

const FILLED_VIEWBOX = '0 0 562.04 562.04';
const ICON_VIEWBOX = '75 75 412 412';

export default function StructuralIcon({ className = '', color = 'currentColor', size = 48, showBackground = true }) {
  const id = useId();
  const gradientId = `structural-grad${id}`;
  const filterId = `structural-shadow${id}`;

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
          <path d={STRUCTURAL_PATH} fill="white" transform={PATH_TRANSFORM} />
        </>
      ) : (
        <path d={STRUCTURAL_PATH} fill={color} transform={PATH_TRANSFORM} />
      )}
    </svg>
  );
}
