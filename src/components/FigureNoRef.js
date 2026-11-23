import useBaseUrl from '@docusaurus/useBaseUrl';
import imageDimensions from '../imageDimensions';
import ZoomableImage from './ZoomableImage';
import '../css/custom.css';

const FigureNoRef = ({ src, alt, width = '80%', background = 'filled', zoom = true }) => {
  const imgBgClass = background === 'transparent' ? '' : 'bg-surface-page dark:bg-white';

  const normalizedSrc = src.replace(/^\//, '');
  const dims = imageDimensions[normalizedSrc];
  const imgUrl = useBaseUrl(src);

  return (
    <figure className="my-[1em] ml-0 mr-auto w-full justify-items-start border-y border-border-color py-5">
      <ZoomableImage
        src={imgUrl}
        alt={alt}
        className={`block h-auto ${imgBgClass}`}
        style={{ maxWidth: width }}
        width={dims?.width}
        height={dims?.height}
        enabled={zoom}
      />
    </figure>
  );
};

export default FigureNoRef;
