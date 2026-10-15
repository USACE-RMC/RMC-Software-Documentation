import { ChartSpline } from 'lucide-react';
import { useId } from 'react';

const FILLED_VIEWBOX = '0 0 562.04 562.04';
const GLYPH_SIZE = 300;
const GLYPH_OFFSET = (562.04 - GLYPH_SIZE) / 2;

export default function SystemResponseIcon({ className = '', color = 'currentColor', size = 48, showBackground = true }) {
  const id = useId();
  const gradientId = `system-response-grad${id}`;
  const filterId = `system-response-shadow${id}`;

  if (!showBackground) {
    return <ChartSpline className={className} color={color} size={size} aria-hidden="true" />;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={FILLED_VIEWBOX}
      width={size}
      height={size}
      className={className}
      overflow="visible"
      aria-hidden="true"
    >
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
      <ChartSpline x={GLYPH_OFFSET} y={GLYPH_OFFSET} size={GLYPH_SIZE} color="white" />
    </svg>
  );
}
