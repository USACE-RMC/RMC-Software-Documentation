import { useEffect, useState } from 'react';
import { useReportId } from '../contexts/ReportIdContext'; // Import the context hook to retrieve the reportId
import '../css/custom.css';

const Figure = ({ figKey, src, alt, caption, width = '80%', id }) => {
  const [figInfo, setFigInfo] = useState(null);
  const reportId = useReportId(); // Get the reportId from the context

  // If id is not passed, fall back to figKey
  const figureId = id || figKey;

  useEffect(() => {
    if (!reportId) return; // If reportId is not available, don't fetch

    const jsonPath = `/RMC-Software-Documentation/counters/${reportId}.json`; // Use reportId to determine the path

    const loadCounters = async () => {
      try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error(`Failed to load ${jsonPath}`);

        const data = await response.json();

        // Now, find the figure using the figKey in the JSON data
        let foundFig = null;
        if (data?.figures?.[figKey]) {
          foundFig = data.figures[figKey];
        }

        if (foundFig) {
          setFigInfo(foundFig);
        } else {
          console.warn(`Figure key "${figKey}" not found in ${jsonPath}`);
        }
      } catch (error) {
        console.error('Error loading counters:', error);
      }
    };

    loadCounters();
  }, [reportId, figKey]);

  if (!figInfo) return <span>Loading...</span>;

  return (
    <figure id={figureId} className="my-[1em] ml-0 mr-auto w-full justify-items-start border-y border-border-color py-5">
      <img src={`/RMC-Software-Documentation/${src}`} alt={alt} className="block h-auto bg-[#f9f9f9] dark:bg-white" style={{ maxWidth: width }} />
      <figcaption className="mt-[1em] max-w-full text-left font-usace text-caption italic text-gray-500 dark:text-gray-400">
        Figure {figInfo.figNumber}: {caption}
      </figcaption>
    </figure>
  );
};

export default Figure;
