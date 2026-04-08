import { useId } from 'react';

// Lucide "Atom" icon paths, scaled and centered to fit 562x562 canvas
// Original viewBox: 0 0 24 24, scaled 15x and offset to center (101, 101)
const PATH_TRANSFORM = 'translate(101, 101) scale(15)';

const FILLED_VIEWBOX = '0 0 562.04 562.04';
const ICON_VIEWBOX = '75 75 412 412';

export default function AtomIcon({ className = '', color = 'currentColor', size = 48, showBackground = true }) {
  const id = useId();
  const gradientId = `atom-grad${id}`;
  const filterId = `atom-shadow${id}`;

  const strokeProps = {
    fill: 'none',
    stroke: showBackground ? 'white' : color,
    strokeWidth: 1.35,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

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
      {showBackground && (
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
      )}
      {showBackground && (
        <circle cx="281.02" cy="281.02" r="281.02" fill={`url(#${gradientId})`} filter={`url(#${filterId})`} />
      )}
      <g transform={PATH_TRANSFORM}>
        {/* Three orbital ellipses */}
        <ellipse cx="12" cy="12" rx="10" ry="4" {...strokeProps} />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" {...strokeProps} />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" {...strokeProps} />
        {/* Center nucleus dot */}
        <circle cx="12" cy="12" r="1" fill={showBackground ? 'white' : color} />
      </g>
    </svg>
  );
}
