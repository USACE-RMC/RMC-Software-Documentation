import { useId } from 'react';

// Source path from InternalErosionIcon.svg (viewBox 0 0 137.56 141.11, with translate(76.73 120.04))
// Scaled via transform to fit 562x562 canvas
const EROSION_PATH =
  'm-18.752-120.04-37.068 90.575h96.008l-37.068-90.575h-21.872zm2.3678 3.5274h17.136l34.18 83.52h-85.497l34.18-83.52zm-47.987 107.6-12.358 29.986h137.56l-12.358-29.986h-112.84zm2.3621 3.5274h108.12l9.4506 22.931h-127.02l9.4506-22.931z';

const PATH_TRANSFORM = 'translate(95.98 91.21) scale(2.69) translate(76.73 120.04)';

const FILLED_VIEWBOX = '0 0 562.04 562.04';
const ICON_VIEWBOX = '75 75 412 412';

export default function InternalErosionIcon({ className = '', color = 'currentColor', size = 48, showBackground = true }) {
  const id = useId();
  const gradientId = `erosion-grad${id}`;
  const filterId = `erosion-shadow${id}`;

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
          <path d={EROSION_PATH} fill="white" transform={PATH_TRANSFORM} />
        </>
      ) : (
        <path d={EROSION_PATH} fill={color} transform={PATH_TRANSFORM} />
      )}
    </svg>
  );
}
