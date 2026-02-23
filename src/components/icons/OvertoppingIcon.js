import { useId } from 'react';

// Source path from Overtopping.svg (viewBox 0 0 170.06391 155.13399, with translate(73.146114 125.22325))
// Scaled via transform to fit 562x562 canvas
const OVERTOPPING_PATH =
  'M-59.929866-125.22325L-59.929866-121.69582L11.617188-121.69582C15.697598-120.97948 18.878129-120.60078 23.562712-113.34646 27.625665-105.5455 34.446926-85.764011 41.145618-65.715254 47.861552-45.614885 54.508037-25.18503 58.666512-15.376725L58.672197-15.364323 58.677881-15.351403C68.116839 5.9745126 69.574758 5.2703751 74.125517 11.178243 76.870294 14.741558 81.767539 17.391162 86.144938 19.505384 88.333638 20.562495 90.39459 21.457087 91.95492 22.15225 92.735086 22.499831 93.392309 22.798938 93.852478 23.028683 94.17963 23.192018 94.448482 23.401574 94.474146 23.402303L94.474662 23.402303 94.475179 23.401787 94.475696 23.401787 94.475696 23.40127 94.475696 23.400753 94.475696 23.400236 94.475696 23.39972C94.473249 23.390218 94.441309 23.354306 94.372343 23.282414L96.917924 20.840186C96.34322 20.24112 95.988158 20.151909 95.428093 19.872286 94.868026 19.592664 94.184353 19.283162 93.391008 18.929708 91.80432 18.222802 89.788404 17.347545 87.679212 16.328833 83.460827 14.291414 78.87678 11.565496 76.920178 9.0254032 72.070387 2.7293253 71.279945 4.4018821 61.914893-16.753902L61.914376-16.755452C57.918337-26.180991 51.212906-46.716775 44.491667-66.833016 37.770144-86.950107 31.08929-106.57572 26.654513-115.05281L26.617822-115.12257 26.575448-115.18924C21.377552-123.27251 16.247681-124.45906 12.079692-125.19638L11.942749-124.42278 11.942749-125.22325-59.929866-125.22325zM-15.109863-111.20033L-73.146114 29.910433 64.411381 29.910433 6.3751303-111.20033-15.109863-111.20033zM-12.746183-107.6729L4.0114503-107.6729 59.145553 26.383-67.880286 26.383-12.746183-107.6729z';

const PATH_TRANSFORM = 'translate(90.96 107.64) scale(2.235) translate(73.146114 125.22325)';

const FILLED_VIEWBOX = '0 0 562.04 562.04';
const ICON_VIEWBOX = '75 75 412 412';

export default function OvertoppingIcon({ className = '', color = 'currentColor', size = 48, showBackground = true }) {
  const id = useId();
  const gradientId = `overtopping-grad${id}`;
  const filterId = `overtopping-shadow${id}`;

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
          <path d={OVERTOPPING_PATH} fill="white" transform={PATH_TRANSFORM} />
        </>
      ) : (
        <path d={OVERTOPPING_PATH} fill={color} transform={PATH_TRANSFORM} />
      )}
    </svg>
  );
}
