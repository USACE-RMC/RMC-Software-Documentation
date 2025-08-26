import { useEffect, useState } from 'react';
import { useReportId } from '../contexts/ReportIdContext';
import '../css/custom.css';

const VideoReference = ({ videoKey }) => {
  const [videoInfo, setVideoInfo] = useState(null);
  const reportId = useReportId(); // Get the reportId from the context

  useEffect(() => {
    if (!reportId) return; // If reportId is not available, don't fetch

    const jsonPath = `/RMC-Software-Documentation/counters/${reportId}.json`; // Use reportId to determine the path

    const loadCounters = async () => {
      try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error(`Failed to load ${jsonPath}`);

        const data = await response.json();

        // Now we need to find the figure with the matching videoKey
        let foundVideo = null;
        if (data?.videos?.[videoKey]) {
          foundVideo = data.videos[videoKey];
        }

        if (foundVideo) {
          setVideoInfo(foundVideo);
        } else {
          console.warn(`Video key "${videoKey}" not found in ${jsonPath}`);
        }
      } catch (error) {
        console.error('Error loading counters:', error);
      }
    };

    loadCounters();
  }, [videoKey]); // Re-fetch if figKey changes

  if (!videoInfo) return <span>Loading...</span>;

  return <span className="font-usace text-normal">Video {videoInfo.videoNumber}</span>;
};

export default VideoReference;
