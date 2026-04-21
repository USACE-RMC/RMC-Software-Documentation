import { useId } from 'react';

// Official Python logo two-snakes mark
// Source: https://www.python.org/community/logos/
// Python and the Python logos are trademarks or registered trademarks of the Python Software Foundation.

const FILLED_VIEWBOX = '0 0 562.04 562.04';
const ICON_VIEWBOX = '75 75 412 412';

export default function PythonIcon({ className = '', color = 'currentColor', size = 48, showBackground = true }) {
  const id = useId();
  const gradientId = `python-grad${id}`;
  const filterId = `python-shadow${id}`;
  const blueGradId = `python-blue${id}`;
  const yellowGradId = `python-yellow${id}`;

  const pythonMark = (
    <g transform="translate(131, 131) scale(0.585)">
      <defs>
        <linearGradient id={blueGradId} x1="0.12" y1="0.09" x2="0.85" y2="0.78">
          <stop offset="0%" stopColor="#5A9FD4" />
          <stop offset="100%" stopColor="#306998" />
        </linearGradient>
        <linearGradient id={yellowGradId} x1="0.15" y1="0.22" x2="0.88" y2="0.91">
          <stop offset="0%" stopColor="#FFD43B" />
          <stop offset="100%" stopColor="#FFE873" />
        </linearGradient>
      </defs>
      <path
        fill={showBackground ? `url(#${blueGradId})` : color}
        d="M254.776 4.486c-25.693 0-50.186 2.216-71.49 6.109-62.78 11.443-74.165 35.39-74.165 79.546v58.314h148.33v19.438H109.117c-43.114 0-80.885 25.916-92.712 75.188-13.637 56.425-14.24 91.64 0 150.567 10.553 43.82 35.748 75.188 78.862 75.188h51.04v-67.771c0-48.936 42.345-92.125 92.712-92.125h148.169c41.243 0 74.165-33.987 74.165-75.317V90.14c0-40.042-33.773-70.137-74.165-79.546C361.9 4.02 335.27 4.486 254.776 4.486zm-80.193 47.088c15.3 0 27.804 12.71 27.804 28.31 0 15.542-12.504 28.125-27.804 28.125-15.36 0-27.804-12.583-27.804-28.125 0-15.6 12.444-28.31 27.804-28.31z"
      />
      <path
        fill={showBackground ? `url(#${yellowGradId})` : color}
        d="M386.087 167.893v65.873c0 51.068-43.34 93.973-92.712 93.973H145.206c-40.562 0-74.165 34.72-74.165 75.317v141.197c0 40.042 34.827 63.593 74.165 75.317 47.08 14.03 92.203 16.568 148.169 0 37.186-10.97 74.165-33.066 74.165-75.317v-56.466H219.371v-19.438h222.334c43.114 0 59.185-30.078 74.165-75.188 15.474-46.398 14.815-90.96 0-150.567-10.63-42.83-30.927-75.188-74.165-75.188h-55.618v0.487zm-84.131 326.37c15.36 0 27.804 12.583 27.804 28.125 0 15.6-12.444 28.31-27.804 28.31-15.3 0-27.804-12.71-27.804-28.31 0-15.542 12.504-28.125 27.804-28.125z"
      />
    </g>
  );

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
          {pythonMark}
        </>
      ) : (
        pythonMark
      )}
    </svg>
  );
}
