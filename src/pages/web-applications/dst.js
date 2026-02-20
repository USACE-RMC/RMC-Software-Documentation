import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import { useEffect, useState } from 'react';
import ContentBox from '../../components/ContentBox';
import WebAppIcon from '../../components/icons/WebAppIcon';
import '../../css/custom.css';

// Create the list of documents dynamically
const dstData = [
  {
    IconComponent: WebAppIcon,
    doc_location: 'web-applications/dst/users-guide',
    doc_name: 'Dam Screening Tool Users Guide',
    active: false,
    draft: true,
  },
];

export const dstDocs = dstData;

export default function DST() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    // Fetch the latestVersions JSON file
    fetch('/RMC-Software-Documentation/versions/latestVersions.json')
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error('Error loading latest versions:', error));
  }, []);

  const dstData = dstDocs.map((doc) => ({
    ...doc,
    doc_location: addBaseUrl(
      `docs/${doc.doc_location}/${latestVersions[doc.doc_location.replace(/^docs\//, '')]}/preface`,
    ),
  }));

  return (
    <Layout
      title="RMC Software Documentation"
      description="Documentation for RMC Software Packages"
    >
      <main>
        <div className="title-container">
          <WebAppIcon className="h-[80px] w-[80px] text-ifm-primary" />
          <div className="text-container">
            <h1 className="text-title">Dam Screening Tool</h1>
            <p className="text-description">Dam Screening Tool</p>
          </div>
        </div>
        <ContentBox contentData={dstData} />
      </main>
    </Layout>
  );
}
