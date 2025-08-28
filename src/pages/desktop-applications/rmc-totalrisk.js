import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import { useEffect, useState } from 'react';
import ContentBox from '../../components/ContentBox';
import '../../css/custom.css';

// Create the list of documents dynamically
const totalRiskData = [
  {
    icon: 'img/TotalRisk.png',
    doc_location: 'desktop-applications/rmc-totalrisk/users-guide',
    doc_name: 'RMC TotalRisk Users Guide',
    active: true,
    draft: true,
  },
  {
    icon: 'img/TotalRisk.png',
    doc_location: 'desktop-applications/rmc-totalrisk/applications-guide',
    doc_name: 'RMC TotalRisk Applications Guide',
    active: false,
    draft: true,
  },
  {
    icon: 'img/TotalRisk.png',
    doc_location: 'desktop-applications/rmc-totalrisk/vertification-report',
    doc_name: 'RMC TotalRisk Verification Report',
    active: false,
    draft: true,
  },
];

export const totalRiskDocs = totalRiskData;

export default function TotalRisk() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    // Fetch the latestVersions JSON file
    fetch('/RMC-Software-Documentation/versions/latestVersions.json')
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error('Error loading latest versions:', error));
  }, []);

  const totalRiskData = totalRiskDocs.map((doc) => ({
    ...doc,
    icon: addBaseUrl(doc.icon),
    iconLight: addBaseUrl(doc.iconLight),
    iconDark: addBaseUrl(doc.iconDark),
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
          <ThemedImage
            alt="TotalRisk"
            sources={{
              light: addBaseUrl('img/TotalRisk.png'),
              dark: addBaseUrl('img/TotalRisk.png'),
            }}
          />
          <div className="text-container">
            <p className="text-title">RMC TotalRisk</p>
            <p className="text-description">RMC TotalRisk</p>
          </div>
        </div>
        <ContentBox contentData={totalRiskData} />
      </main>
    </Layout>
  );
}
