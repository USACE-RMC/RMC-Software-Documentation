import "../css/custom.css";

const FigureNoRef = ({ src, alt, width = "80%" }) => {
  return (
    <figure className="w-full ml-0 mr-auto my-[1em] py-5 justify-items-start border-y border-border-color">
      <img src={`/RMC-Software-Documentation/${src}`} alt={alt} className="h-auto block" style={{ maxWidth: width }} />
    </figure>
  );
};

export default FigureNoRef;
