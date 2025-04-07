import React, { useEffect, useState } from "react";
import "../css/custom.css";
import "../css/equation-reference.css";

const EquationReference = ({ parentDocId, equationKey }) => {
  const [equationNumber, setEquationNumber] = useState(null);
  const jsonPath = `/RMC-Software-Documentation/counters/${parentDocId.replace(
    /\//g,
    "-"
  )}.json`;

  useEffect(() => {
    const loadEquationNumber = async () => {
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

    loadEquationNumber();
  }, [equationKey]);

  if (equationNumber === null) return <span>Loading...</span>;

  return <span className="equation-reference">Equation {equationNumber}</span>;
};

export default EquationReference;
