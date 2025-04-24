import React, { useEffect, useState } from "react";
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";
import "../css/custom.css";
import "../css/equation.css";
import { useReportId } from "../contexts/ReportIdContext"; // Import the context hook to retrieve the reportId

const Equation = ({ equationKey, equation, inline = false }) => {
  const [equationNumber, setEquationNumber] = useState(null);
  const reportId = useReportId(); // Get the reportId from the context

  useEffect(() => {
    if (!reportId) return; // If reportId is not available, don't fetch

    const jsonPath = `/RMC-Software-Documentation/counters/${reportId}.json`; // Use reportId to determine the path

    const loadCounters = async () => {
      try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error(`Failed to load ${jsonPath}`);

        const data = await response.json();
        let foundEquation = null;
        if (data?.equations?.[equationKey]) {
          foundEquation = data.equations[equationKey];
        }

        if (foundEquation) {
          setEquationNumber(foundEquation.equationNumber);
        } else {
          console.warn(
            `Equation key "${equationKey}" not found in ${jsonPath}`
          );
        }
      } catch (error) {
        console.error("Error loading counters:", error);
      }
    };

    loadCounters();
  }, [reportId, equationKey]);

  if (equationNumber === null) return <span>Loading...</span>;

  const equationWithoutTag = equation;
  const equationWithTag = `${equation} \\tag{${equationNumber}}`;

  return (
    <span className="equation-container">
      {inline ? (
        <InlineMath math={equationWithoutTag} />
      ) : (
        <BlockMath math={equationWithTag} />
      )}
    </span>
  );
};

export default Equation;
