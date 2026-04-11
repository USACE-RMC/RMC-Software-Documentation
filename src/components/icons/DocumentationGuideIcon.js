import { useId } from 'react';

// Paths from DocumentationGuide.svg (viewBox 0 0 15.875 21.172221)
// Nested transforms: translate(50.204106,49.996649) + matrix(0.26458333,0,0,0.26458333,-54.966606,-52.107759)
// Combined to single transform for 562 canvas: translate(65.12 65.16) scale(4.498)
const DOCGUIDE_PATH =
  'M 48,20 c 1.933,0 3.5,-1.567 3.5,-3.5 C 51.5,14.567 49.933,13 48,13 h -0.1 c -1.9026,0.034 -3.4212,1.5972 -3.4,3.5 0.0033,1.9316 1.5684,3.4967 3.5,3.5 z M 46.908,15.44 C 47.1778,15.1627 47.5471,15.0043 47.934,15 H 48 c 0.8284,0 1.5,0.6716 1.4999,1.5001 0,0.8284 -0.6716,1.4999 -1.5001,1.4999 -0.8284,0 -1.4999,-0.6716 -1.4999,-1.5001 0,-0.0049 1e-4,-0.0099 1e-4,-0.0149 -0.0091,-0.3878 0.1375,-0.763 0.407,-1.042 z M 32.751,40.583 l -3.293,-3.292 -1.414,1.414 4.707,4.707 8.707,-8.707 -1.414,-1.414 z M 47.001,36.998 h 21 v 2 h -21 z M 32.751,51.586 l -3.293,-3.293 -1.414,1.414 4.707,4.707 8.707,-8.707 -1.414,-1.414 z M 47.001,49 h 21 v 2 h -21 z M 47.001,60.998 h 21 v 2 h -21 z M 47.001,72.998 h 21 v 2 h -21 z M 30,66 h 8 v -8 h -8 z M 32,60 h 4 v 4 h -4 z M 30,78 h 8 v -8 h -8 z M 32,72 h 4 v 4 h -4 z M 78,18.979 c 0,-2.2091 -1.7909,-4 -4,-4 H 59 v -2 c -0.0033,-2.7601 -2.2399,-4.9967 -5,-5 H 42 c -2.7601,0.0033 -4.9967,2.2399 -5,5 v 2 H 22 c -2.2091,0 -4,1.7909 -4,4 V 84 c 0,2.2091 1.7909,4 4,4 h 52 c 2.2091,0 4,-1.7909 4,-4 z M 35,16.979 h 4 v -4 c 0,-1.6569 1.3431,-3 3,-3 h 12 c 1.6569,0 3,1.3431 3,3 v 4 h 4 V 25 H 35 Z M 74,86 H 22 c -1.1046,0 -2,-0.8954 -2,-2 V 18.979 c 0,-1.1046 0.8954,-2 2,-2 H 33 V 27 H 63 V 16.979 h 11 c 1.1046,0 2,0.8954 2,2 V 84 c 0,1.1046 -0.8954,2 -2,2 z';

const PATH_TRANSFORM = 'translate(65.12 65.16) scale(4.498)';

const FILLED_VIEWBOX = '0 0 562.04 562.04';
const ICON_VIEWBOX = '75 75 412 412';

export default function DocumentationGuideIcon({ className = '', color = 'currentColor', size = 48, showBackground = true }) {
  const id = useId();
  const gradientId = `docguide-grad${id}`;
  const filterId = `docguide-shadow${id}`;

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
          <path d={DOCGUIDE_PATH} fill="white" transform={PATH_TRANSFORM} />
        </>
      ) : (
        <path d={DOCGUIDE_PATH} fill={color} transform={PATH_TRANSFORM} />
      )}
    </svg>
  );
}
