import { useTour } from '../contexts/TourContext';

export default function TourButton() {
  const { startTour } = useTour();

  return (
    <div className="mx-auto flex w-[94%] max-w-[1600px] justify-end pt-4 pr-1">
      <button
        type="button"
        onClick={() => startTour()}
        className="tour-start-btn"
        aria-label="Take a guided tour of this site"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
        <span>Take a tour</span>
      </button>
    </div>
  );
}
