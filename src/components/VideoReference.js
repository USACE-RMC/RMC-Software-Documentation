import useBaseUrl from '@docusaurus/useBaseUrl';
import { useEffect, useMemo, useState } from 'react';
import { useReportId } from '../contexts/ReportIdContext';
import '../css/custom.css';

// strip ".mdx" and any leading "digits-" prefix (e.g., "040-working-in-dst" -> "working-in-dst")
const toDocSlug = (docId = '') => docId.replace(/\.mdx$/i, '').replace(/^\d{1,3}-/, '');

// "Video N" as a link to the video, on the same page or another page of the same document.
const VideoReference = ({ videoKey, suffix }) => {
  const [videoInfo, setVideoInfo] = useState(null);
  const reportId = useReportId();
  const countersBase = useBaseUrl('counters/');
  const docsRouteBase = useBaseUrl('docs');

  useEffect(() => {
    if (!reportId) return;
    const jsonPath = `${countersBase}${reportId}.json`;
    (async () => {
      try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error(`Failed to load ${jsonPath}`);
        const data = await response.json();
        const found = data?.videos?.[videoKey] ?? null;
        if (found) setVideoInfo(found);
        else console.warn(`Video key "${videoKey}" not found in ${jsonPath}`);
      } catch (error) {
        console.error('Error loading counters:', error);
      }
    })();
  }, [reportId, videoKey, countersBase]);

  const docSlug = useMemo(() => toDocSlug(videoInfo?.docId), [videoInfo?.docId]);

  const targetDocPath = useMemo(() => {
    if (!videoInfo?.parentDocPath || !docSlug) return '';
    return `${docsRouteBase}/${videoInfo.parentDocPath}/${docSlug}`;
  }, [videoInfo?.parentDocPath, docSlug, docsRouteBase]);

  const isSamePage = useMemo(() => {
    const normalize = (p) => (p?.endsWith('/') ? p.slice(0, -1) : p || '');
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    return targetDocPath && normalize(currentPath) === normalize(targetDocPath);
  }, [targetDocPath]);

  if (!videoInfo) return <span className="whitespace-nowrap font-usace text-normal">Video</span>;

  const href = isSamePage || !targetDocPath ? `#${videoKey}` : `${targetDocPath}#${videoKey}`;

  return (
    <a href={href} className="whitespace-nowrap font-usace text-normal" title={`Jump to Video ${videoInfo.videoNumber}`}>
      Video {videoInfo.videoNumber}
      {suffix ? ` ${suffix}` : ''}
    </a>
  );
};

export default VideoReference;
