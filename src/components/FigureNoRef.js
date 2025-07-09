import "../css/custom.css";
import "../css/figure.css";

const FigureNoRef = ({ src, alt }) => {
  return (
    <figure className="figure-container">
      <img src={`/RMC-Software-Documentation/${src}`} alt={alt} className="figure-image" />
    </figure>
  );
};

export default FigureNoRef;
