import { useId } from 'react';

// Source path from SeismicHazardIcon.svg (viewBox 0 0 57.15 42.333, with translate(67.134 -90.841))
// Scaled via transform to fit 562x562 canvas
const SEISMIC_PATH =
  'm-36.446 90.841c-0.2467 0.012801-0.45512 0.19639-0.49506 0.44493l-4.0499 25.286-2.5528-12.017c-0.052123-0.24527-0.26879-0.41989-0.51935-0.41909-0.25056 7.9e-4-0.46623 0.17692-0.51676 0.42219l-2.9605 14.39-3.5791-19.546c-0.042862-0.23389-0.23655-0.41033-0.47336-0.4315-0.2368-0.021431-0.45848 0.11803-0.54209 0.34055l-4.0752 10.819-7.8362-0.04238c-0.21461-0.61772-0.80035-1.0627-1.4914-1.0666-0.87683-0.00477-1.5915 0.70215-1.5963 1.5787-0.004763 0.87683 0.70215 1.5913 1.5787 1.5963 0.69096 0.00375 1.2812-0.43465 1.5028-1.0496l8.2047 0.04445c0.22146 0.00132 0.42011-0.13546 0.49816-0.34262l3.5331-9.3803 3.7254 20.348c0.045772 0.24897 0.26174 0.43056 0.51521 0.43356 0.25321 0.00291 0.47294-0.17453 0.524-0.42271l2.9988-14.577 2.6179 12.32c0.052917 0.2495 0.27592 0.42509 0.53072 0.41909 0.25479-0.00635 0.46853-0.19384 0.50901-0.44545l3.7905-23.663 2.8029 36.803c0.020373 0.26696 0.23687 0.47674 0.50436 0.48834 0.26776 0.01164 0.50153-0.17856 0.54519-0.44287l4.5811-27.885 2.9611 10.987c0.057414 0.21273 0.24083 0.36741 0.46044 0.38861 0.21934 0.02117 0.42897-0.09586 0.52607-0.29404l2.3957-4.8989 8.7571 0.04393c0.21473 0.61789 0.80045 1.0629 1.4919 1.0661 0.87683 0.00449 1.5908-0.70267 1.5953-1.5792 0.0042334-0.87683-0.70292-1.5918-1.5797-1.5958-0.69109-0.00355-1.2811 0.4353-1.5022 1.0506l-9.0894-0.04547c-0.20294-7.9e-4-0.38858 0.11458-0.47801 0.29714l-1.9224 3.9305-3.2303-11.987c-0.064823-0.24051-0.28873-0.40307-0.53744-0.39067-0.24897 0.0127-0.45561 0.19681-0.49609 0.44287l-4.2623 25.946-2.8086-36.877c-0.020373-0.26749-0.23789-0.47723-0.50591-0.48834-0.016752-6.95e-4-0.033163-8.54e-4-0.04961 0z';

const PATH_TRANSFORM = 'translate(90.98 140.24) scale(6.65) translate(67.134 -90.841)';

const FILLED_VIEWBOX = '0 0 562.04 562.04';
const ICON_VIEWBOX = '75 75 412 412';

export default function SeismicHazardIcon({ className = '', color = 'currentColor', size = 48, showBackground = true }) {
  const id = useId();
  const gradientId = `seismic-grad${id}`;
  const filterId = `seismic-shadow${id}`;

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
          <path d={SEISMIC_PATH} fill="white" transform={PATH_TRANSFORM} />
        </>
      ) : (
        <path d={SEISMIC_PATH} fill={color} transform={PATH_TRANSFORM} />
      )}
    </svg>
  );
}
