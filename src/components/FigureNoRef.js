import '../css/custom.css';

const FigureNoRef = ({ src, alt, width = '80%', background = 'filled' }) => {
  const imgBgClass = background === 'transparent' ? '' : 'bg-[#f9f9f9] dark:bg-white';

  return (
    <figure className="my-[1em] ml-0 mr-auto w-full justify-items-start border-y border-border-color py-5">
      <img src={`/RMC-Software-Documentation/${src}`} alt={alt} className={`block h-auto ${imgBgClass}`} style={{ maxWidth: width }} />
    </figure>
  );
};

export default FigureNoRef;
