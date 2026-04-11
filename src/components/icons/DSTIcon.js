import { useId } from 'react';

const FILLED_VIEWBOX = '0 0 562.04 562.04';
const ICON_VIEWBOX = '75 75 412 412';

export default function DSTIcon({ className = '', color = 'currentColor', size = 48, showBackground = true }) {
  const id = useId();
  const gradientId = `dst-grad${id}`;
  const filterId = `dst-shadow${id}`;

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
          <text
            x="281.02" y="290"
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="Roboto, sans-serif"
            fontWeight="bold"
            fontSize="155"
            fill="white"
          >DST</text>
        </>
      ) : (
        <text
          x="281.02" y="290"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="Roboto, sans-serif"
          fontWeight="bold"
          fontSize="155"
          fill={color}
        >DST</text>
      )}
    </svg>
  );
}
