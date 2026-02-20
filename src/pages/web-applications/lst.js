import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import { useEffect, useState } from 'react';
import ContentBox from '../../components/ContentBox';
import WebAppIcon from '../../components/icons/WebAppIcon';
import '../../css/custom.css';

// Create the list of documents dynamically
const lstData = [
  {
    IconComponent: WebAppIcon,
    doc_location: 'web-applications/lst/users-guide',
    doc_name: 'Levee Screening Tool Users Guide',
    active: true,
    draft: true,
  },
];

export const lstDocs = lstData;

export default function LST() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    // Fetch the latestVersions JSON file
    fetch('/RMC-Software-Documentation/versions/latestVersions.json')
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error('Error loading latest versions:', error));
  }, []);

  const lstData = lstDocs.map((doc) => ({
    ...doc,
    doc_location: addBaseUrl(`docs/${doc.doc_location}/${latestVersions[doc.doc_location.replace(/^docs\//, '')]}/preface`),
  }));

  return (
    <Layout title="RMC Software Documentation" description="Documentation for RMC Software Packages">
      <main>
        <div className="title-container">
          <WebAppIcon className="h-[80px] w-[80px] text-ifm-primary" />
          <div className="text-container">
            <h1 className="text-title">Levee Screening Tool</h1>
            <p className="text-description">Risk screening for levee hazard exposure, performance, and consequences</p>
          </div>
        </div>
        <ContentBox contentData={lstData} />
      </main>
    </Layout>
  );
}
