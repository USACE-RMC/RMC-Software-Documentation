import '../css/custom.css';

/**
 * EquationChip.js
 * Renders a subtle inline chip styled from project variables.
 *
 * Props:
 * - children: React.ReactNode (short text/equation)
 */
export default function EquationChip({ children }) {
  return (
    <span className="inline-flex items-center rounded-md border border-[var(--border-color)] bg-[var(--ifm-background-color-theme)] px-2 py-0.5 text-[0.9rem] font-medium text-[var(--font-color)]">
      {children}
    </span>
  );
}
