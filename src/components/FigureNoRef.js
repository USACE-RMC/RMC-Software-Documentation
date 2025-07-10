import "../css/custom.css";
import "../css/figure-no-ref.css";

const FigureNoRef = ({ src, alt }) => {
  return (
    <figure className="figure-no-ref-container">
      <img src={`/RMC-Software-Documentation/${src}`} alt={alt} className="figure-no-ref-image" />
    </figure>
  );
};

export default FigureNoRef;
