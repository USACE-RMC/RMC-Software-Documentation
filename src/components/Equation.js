import 'katex/dist/katex.min.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import { useReportId } from '../contexts/ReportIdContext';
import '../css/custom.css';
import '../css/equation.css';

const Equation = ({ equationKey, equation, inline = false, id }) => {
  const [equationNum, setEquationNum] = useState(null);
  const reportId = useReportId();
  const equationId = id || equationKey;
  const mathRef = useRef(null);

  useEffect(() => {
    if (!reportId) return;
    const jsonPath = `/RMC-Software-Documentation/counters/${reportId}.json`;
    (async () => {
      try {
        const res = await fetch(jsonPath);
        if (!res.ok) throw new Error(`Failed to load ${jsonPath}`);
        const data = await res.json();
        const found = data?.equations?.[equationKey] ?? null;
        if (found) setEquationNum(found.equationNumber);
        else console.warn(`Equation key "${equationKey}" not found in ${jsonPath}`);
      } catch (e) {
        console.error('Error loading counters:', e);
      }
    })();
  }, [reportId, equationKey]);

  const scaleEquation = useCallback(() => {
    const wrapper = mathRef.current;
    if (!wrapper || inline) return;
    const katexEl = wrapper.querySelector('.katex');
    if (!katexEl) return;
    // Reset scale to measure natural width
    katexEl.style.transform = '';
    // wrapper.clientWidth = available space (clamped by overflow:hidden)
    // katexEl.scrollWidth = natural equation width (unclamped)
    const available = wrapper.clientWidth;
    const natural = katexEl.scrollWidth;
    if (natural > available && available > 0) {
      katexEl.style.transform = `scale(${available / natural})`;
    }
  }, [inline]);

  useEffect(() => {
    const wrapper = mathRef.current;
    if (!wrapper || inline) return;
    const raf = requestAnimationFrame(scaleEquation);
    const observer = new ResizeObserver(scaleEquation);
    observer.observe(wrapper);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [equationNum, inline, scaleEquation]);

  if (inline) {
    return (
      <span id={equationId} className="equation-container" data-anchor="true">
        <InlineMath math={equation} />
      </span>
    );
  }

  return (
    <div id={equationId} className="equation-container" data-anchor="true">
      <div className="equation-row">
        <div className="equation-math" ref={mathRef}>
          <BlockMath math={equation} />
        </div>
        {equationNum !== null && <span className="equation-tag">({equationNum})</span>}
      </div>
    </div>
  );
};

export default Equation;
