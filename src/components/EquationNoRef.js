import 'katex/dist/katex.min.css';
import { useCallback, useEffect, useRef } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import '../css/custom.css';
import '../css/equation.css';

const EquationNoRef = ({ equation, inline = true }) => {
  const containerRef = useRef(null);

  const scaleEquation = useCallback(() => {
    const container = containerRef.current;
    if (!container || inline) return;
    const katexEl = container.querySelector('.katex');
    if (!katexEl) return;
    katexEl.style.transform = '';
    const available = container.clientWidth;
    const natural = katexEl.scrollWidth;
    if (natural > available && available > 0) {
      katexEl.style.transform = `scale(${available / natural})`;
      katexEl.style.transformOrigin = 'center left';
    }
  }, [inline]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || inline) return;
    const raf = requestAnimationFrame(scaleEquation);
    const observer = new ResizeObserver(scaleEquation);
    observer.observe(container);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [inline, scaleEquation]);

  if (inline) {
    return (
      <span className="equation-container">
        <InlineMath math={equation} />
      </span>
    );
  }

  return (
    <div ref={containerRef} className="equation-container equation-math">
      <BlockMath math={equation} />
    </div>
  );
};

export default EquationNoRef;
