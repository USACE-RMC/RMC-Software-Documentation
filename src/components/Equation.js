import 'katex/dist/katex.min.css';
import { useEffect, useState } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import { useReportId } from '../contexts/ReportIdContext';
import '../css/custom.css';
import '../css/equation.css';

const Equation = ({ equationKey, equation, inline = false, id }) => {
  const [equationNum, setEquationNum] = useState(null);
  const reportId = useReportId();
  const equationId = id || equationKey;

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

  if (equationNum === null) return <span>Loading...</span>;

  const equationWithTag = `${equation} \\tag{${equationNum}}`;

  return (
    <span
      id={equationId}
      className="equation-container scroll-mt-[var(--ifm-navbar-height)]"
      data-anchor="true"
    >
      {inline ? <InlineMath math={equation} /> : <BlockMath math={equationWithTag} />}
    </span>
  );
};

export default Equation;
