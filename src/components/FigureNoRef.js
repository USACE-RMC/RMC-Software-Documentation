import imageDimensions from '../imageDimensions';
import '../css/custom.css';

const FigureNoRef = ({ src, alt, width = '80%', background = 'filled' }) => {
  const imgBgClass = background === 'transparent' ? '' : 'bg-[#f9f9f9] dark:bg-white';

  const normalizedSrc = src.replace(/^\//, '');
  const dims = imageDimensions[normalizedSrc];

  return (
    <figure className="my-[1em] ml-0 mr-auto w-full justify-items-start border-y border-border-color py-5">
      <img
        src={`/RMC-Software-Documentation/${src}`}
        alt={alt}
        className={`block h-auto ${imgBgClass}`}
        style={{ maxWidth: width }}
        width={dims?.width}
        height={dims?.height}
      />
    </figure>
  );
};

export default FigureNoRef;
