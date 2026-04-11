import { useId } from 'react';

// Source path from RiskCalculationsIcon.svg (viewBox 0 0 14.817 21.167, with translate(79.57 -68.351))
// Scaled via transform to fit 562x562 canvas
const CALC_PATH =
  'm-78.512 68.351c-0.58208 0-1.0583 0.47625-1.0583 1.0583v19.05c0 0.58208 0.47625 1.0583 1.0583 1.0583h12.7c0.58208 0 1.0583-0.47625 1.0583-1.0583v-19.05c0-0.58208-0.47625-1.0583-1.0583-1.0583h-12.7zm1.5875 2.6458h9.525v4.2333h-9.525v-4.2333zm0 6.35h1.5875v1.5875h-1.5875v-1.5875zm2.6458 0h1.5875v1.5875h-1.5875v-1.5875zm2.6458 0h1.5875v1.5875h-1.5875v-1.5875zm2.6458 0h1.5875v1.5875h-1.5875v-1.5875zm-7.9375 2.6458h1.5875v1.5875h-1.5875v-1.5875zm2.6458 0h1.5875v1.5875h-1.5875v-1.5875zm2.6458 0h1.5875v1.5875h-1.5875v-1.5875zm2.6458 0h1.5875v1.5875h-1.5875v-1.5875zm-7.9375 2.6458h1.5875v1.5875h-1.5875v-1.5875zm2.6458 0h1.5875v1.5875h-1.5875v-1.5875zm2.6458 0h1.5875v1.5875h-1.5875v-1.5875zm2.6458 0h1.5875v1.5875h-1.5875v-1.5875zm-7.9375 2.6458h4.2333v1.5875h-4.2333v-1.5875zm5.2917 0h1.5875v1.5875h-1.5875v-1.5875zm2.6458 0h1.5875v1.5875h-1.5875v-1.5875z';

const PATH_TRANSFORM = 'translate(151.37 95.81) scale(17.5) translate(79.57 -68.351)';

const FILLED_VIEWBOX = '0 0 562.04 562.04';
const ICON_VIEWBOX = '75 75 412 412';

export default function RiskCalculationsIcon({ className = '', color = 'currentColor', size = 48, showBackground = true }) {
  const id = useId();
  const gradientId = `riskcalc-grad${id}`;
  const filterId = `riskcalc-shadow${id}`;

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
          <path d={CALC_PATH} fill="white" transform={PATH_TRANSFORM} />
        </>
      ) : (
        <path d={CALC_PATH} fill={color} transform={PATH_TRANSFORM} />
      )}
    </svg>
  );
}
