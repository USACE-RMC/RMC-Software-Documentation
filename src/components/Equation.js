import React, { useEffect, useState } from "react";
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";
import "../css/custom.css";
import "../css/equation.css";

const Equation = ({ parentDocId, equationKey, equation, inline = false }) => {
  const [equationNumber, setEquationNumber] = useState(null);
  const jsonPath = `/RMC-Software-Documentation/counters/${parentDocId.replace(
    /\//g,
    "-"
  )}.json`;

  useEffect(() => {
    try {
      const loadCounters = async () => {
        try {
          const response = await fetch(jsonPath);
          if (!response.ok) throw new Error(`Failed to load ${jsonPath}`);

          const data = await response.json();
          let foundEquation = null;

          Object.keys(data).forEach((docId) => {
            if (data[docId]?.equations?.[equationKey]) {
              foundEquation = data[docId].equations[equationKey];
            }
          });

          if (foundEquation) {
            setEquationNumber(foundEquation.equationNumber);
          } else {
            console.warn(`Equation key "${equationKey}" not found`);
          }
        } catch (error) {
          console.error("Error loading counters:", error);
        }
      };

      loadCounters();
    } catch (error) {
      console.error("Critical error in useEffect:", error);
    }
  }, [parentDocId, equationKey]);

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
