import { useCallback, useEffect, useRef, useState } from 'react';
import { useTour } from '../contexts/TourContext';

export default function HelpMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { startTour } = useTour();

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) close();
    };
    const handleEsc = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, close]);

  const handleStartTour = () => {
    close();
    // Small delay so the menu closes before the tour overlay appears
    setTimeout(() => startTour(), 200);
  };

  return (
    <div ref={menuRef} className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={toggle}
        className="help-menu-trigger"
        aria-label="Help menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Help"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="help-menu-dropdown" role="menu">
          <button type="button" className="help-menu-item" role="menuitem" onClick={handleStartTour}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 flex-shrink-0">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
            <span>Site Tour</span>
          </button>

          <div className="help-menu-divider" />

          <a href="https://www.rmc.usace.army.mil/About-the-Center/Contact/" target="_blank" rel="noopener noreferrer" className="help-menu-item" role="menuitem">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 flex-shrink-0">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span>Contact RMC</span>
          </a>

          <a href="https://www.rmc.usace.army.mil/" target="_blank" rel="noopener noreferrer" className="help-menu-item" role="menuitem">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 flex-shrink-0">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>RMC Website</span>
          </a>
        </div>
      )}
    </div>
  );
}
