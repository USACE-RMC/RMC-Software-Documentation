import { useEffect, useState } from 'react';
import { useReportId } from '../contexts/ReportIdContext';
import '../css/custom.css';

const Video = ({
  videoKey,
  caption,
  poster,
  src, // optional single source
  sources = [], // optional [{ src, type }]
  width = '80%',
  id,
  controls, // Show/hide browser video controls, default: true (on)
  autoPlay, // Start playback automatically, default: off
  loop, // Replay when finished, default: off
  muted, // default: on if autoPlay is on
  playsInline = true, // Allows autoplay inline on iOS instead of forcing full-screen playback
  preload = 'metadata',
  trackSrc, // optional VTT captions
  trackLang = 'en',
  trackLabel = 'English',
  credit, // optional source/credit line
}) => {
  const [videoInfo, setVideoInfo] = useState(null);
  const reportId = useReportId();

  const figureId = id || videoKey;

  useEffect(() => {
    if (!reportId) return;

    const jsonPath = `/RMC-Software-Documentation/counters/${reportId}.json`;

    const loadCounters = async () => {
      try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error(`Failed to load ${jsonPath}`);
        const data = await response.json();

        let found = null;
        if (data?.videos?.[videoKey]) {
          found = data.videos[videoKey];
        }

        if (found) {
          setVideoInfo(found);
        } else {
          console.warn(`Video key "${videoKey}" not found in ${jsonPath}`);
        }
      } catch (err) {
        console.error('Error loading counters:', err);
      }
    };

    loadCounters();
  }, [reportId, videoKey]);

  if (!videoInfo) return <span>Loading...</span>;

  const resolvedAutoPlay = autoPlay ?? false;
  const resolvedLoop = loop ?? false;
  const resolvedControls = controls ?? true;
  const resolvedMuted = muted ?? (resolvedAutoPlay ? true : false);

  return (
    <figure
      id={figureId}
      className="my-[1em] ml-0 mr-auto w-full justify-items-start border-y border-border-color py-5"
    >
      <video
        className="block h-auto"
        style={{ maxWidth: width }}
        poster={poster ? `/RMC-Software-Documentation/${poster}` : undefined}
        autoPlay={resolvedAutoPlay}
        loop={resolvedLoop}
        controls={resolvedControls}
        muted={resolvedMuted}
        playsInline={playsInline}
        preload={preload}
      >
        {sources.length > 0
          ? sources.map((s, i) => (
              <source key={i} src={`/RMC-Software-Documentation/${s.src}`} type={s.type} />
            ))
          : src && <source src={`/RMC-Software-Documentation/${src}`} />}
        {trackSrc && (
          <track
            src={`/RMC-Software-Documentation/${trackSrc}`}
            kind="captions"
            srcLang={trackLang}
            label={trackLabel}
            default
          />
        )}
        Your browser does not support the video tag.
      </video>

      <figcaption className="mt-[1em] max-w-full text-left font-usace text-caption italic text-gray-500 dark:text-gray-400">
        Video {videoInfo.videoNumber}: {caption}
        {credit ? (
          <span className="block not-italic text-gray-500 dark:text-gray-400">{credit}</span>
        ) : null}
      </figcaption>
    </figure>
  );
};

export default Video;
