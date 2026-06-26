import useBaseUrl from '@docusaurus/useBaseUrl';
import { useEffect, useRef, useState } from 'react';
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
  autoPlay, // Auto-start when scrolled into view (muted); paused when scrolled away. Honors prefers-reduced-motion. Default: off
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
  const videoRef = useRef(null);
  const reportId = useReportId();
  const countersBase = useBaseUrl('counters/');
  const assetsBase = useBaseUrl('/');

  const figureId = id || videoKey;

  const resolveAsset = (p) => (p ? `${assetsBase}${String(p).replace(/^\//, '')}` : undefined);

  const resolvedAutoPlay = autoPlay ?? false;
  const resolvedLoop = loop ?? false;
  const resolvedControls = controls ?? true;
  const resolvedMuted = muted ?? (resolvedAutoPlay ? true : false);

  useEffect(() => {
    if (!reportId) return;

    const jsonPath = `${countersBase}${reportId}.json`;

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
  }, [reportId, videoKey, countersBase]);

  // Managed autoplay: play only while the video is in the viewport, pause when it
  // leaves, and never autoplay for users who prefer reduced motion. We drive this
  // from JS (rather than the native `autoplay` attribute) so the behavior is
  // consistent across browsers and satisfies WCAG 2.2.2. `videoInfo` is a
  // dependency because the <video> element isn't rendered until counters load.
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !resolvedAutoPlay || typeof window === 'undefined') return;

    const motionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    const prefersReduced = () => !!(motionQuery && motionQuery.matches);

    // Older browsers without IntersectionObserver: best-effort play unless reduced motion.
    if (typeof IntersectionObserver === 'undefined') {
      if (!prefersReduced()) el.play?.().catch(() => {});
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !prefersReduced()) {
            el.play?.().catch(() => {});
          } else {
            el.pause?.();
          }
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [resolvedAutoPlay, videoInfo]);

  if (!videoInfo) return <span>Loading...</span>;

  return (
    <figure
      id={figureId}
      className="my-[1em] ml-0 mr-auto w-full justify-items-start border-y border-border-color py-5"
    >
      <video
        ref={videoRef}
        className="block h-auto"
        style={{ maxWidth: width }}
        poster={resolveAsset(poster)}
        autoPlay={false} // playback is managed by the IntersectionObserver above
        loop={resolvedLoop}
        controls={resolvedControls}
        muted={resolvedMuted}
        playsInline={playsInline}
        preload={preload}
      >
        {sources.length > 0
          ? sources.map((s, i) => (
              <source key={i} src={resolveAsset(s.src)} type={s.type} />
            ))
          : src && <source src={resolveAsset(src)} />}
        {trackSrc && (
          <track
            src={resolveAsset(trackSrc)}
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
