import React from "react";
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";
import "../css/custom.css";
import "../css/equation.css";

const EquationNoRef = ({ equation, inline = true }) => {
  const expression = equation;

  return (
    <span className="equation-container">
      {inline ? (
        <InlineMath math={expression} />
      ) : (
        <BlockMath math={expression} />
      )}
    </span>
  );
};

export default EquationNoRef;
