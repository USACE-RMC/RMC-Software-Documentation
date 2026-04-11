import { useId } from 'react';

// Paths from DSTDatabase.svg (viewBox 0 0 15.345833 20.637498)
// Nested transforms: translate(45.177023,37.561233) + matrix(0.26458333,0,0,0.26458333,-50.204106,-40.207066)
// Combined to single transform for 562 canvas: translate(65.12 60.62) scale(4.498)
const DATABASE_PATH =
  'M 77,79 V 19 C 77,13.154 62.059,10 48,10 33.941,10 19,13.154 19,19 v 60 c 0,5.846 14.941,9 29,9 14.059,0 29,-3.154 29,-9 z M 48,12 c 15.453,0 27,3.7 27,7 0,3.3 -11.547,7 -27,7 -15.453,0 -27,-3.7 -27,-7 0,-3.3 11.547,-7 27,-7 z M 21,22.46 C 25.529,26.08 37.033,28 48,28 58.967,28 70.471,26.08 75,22.46 V 39 c 0,3.3 -11.547,7 -27,7 -15.453,0 -27,-3.7 -27,-7 z M 21,42.46 C 25.529,46.08 37.033,48 48,48 58.967,48 70.471,46.08 75,42.46 V 59 C 75,62.3 63.453,66 48,66 32.547,66 21,62.3 21,59 Z M 21,79 V 62.46 C 25.529,66.08 37.033,68 48,68 58.967,68 70.471,66.08 75,62.46 V 79 c 0,3.3 -11.547,7 -27,7 -15.453,0 -27,-3.7 -27,-7 z M 70,36 a 2,2 0 0 1 -2,2 2,2 0 0 1 -2,-2 2,2 0 0 1 2,-2 2,2 0 0 1 2,2 z M 70,56 a 2,2 0 0 1 -2,2 2,2 0 0 1 -2,-2 2,2 0 0 1 2,-2 2,2 0 0 1 2,2 z M 70,76 a 2,2 0 0 1 -2,2 2,2 0 0 1 -2,-2 2,2 0 0 1 2,-2 2,2 0 0 1 2,2 z';

const PATH_TRANSFORM = 'translate(65.12 60.62) scale(4.498)';

const FILLED_VIEWBOX = '0 0 562.04 562.04';
const ICON_VIEWBOX = '75 75 412 412';

export default function DSTDatabaseIcon({ className = '', color = 'currentColor', size = 48, showBackground = true }) {
  const id = useId();
  const gradientId = `dstdb-grad${id}`;
  const filterId = `dstdb-shadow${id}`;

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
          <path d={DATABASE_PATH} fill="white" transform={PATH_TRANSFORM} />
        </>
      ) : (
        <path d={DATABASE_PATH} fill={color} transform={PATH_TRANSFORM} />
      )}
    </svg>
  );
}
