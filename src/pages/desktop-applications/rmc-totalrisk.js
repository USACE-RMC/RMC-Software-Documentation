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
    preserveIconColor: true,
    doc_location: 'desktop-applications/rmc-totalrisk/users-guide',
    doc_name: 'RMC TotalRisk Users Guide',
    active: true,
    draft: false,
  },
  {
    icon: 'img/TotalRisk.png',
    preserveIconColor: true,
    doc_name: 'RMC TotalRisk Verification Report',
    active: true,
    draft: true,
    downloadUrl:
      '/RMC-Software-Documentation/source-documents/desktop-applications/rmc-totalrisk/verification-report/RMC-TotalRisk Verification Report.pdf',
  },
  {
    icon: 'img/TotalRisk.png',
    preserveIconColor: true,
    doc_name: 'RMC TotalRisk Technical Reference Manual',
    active: true,
    draft: true,
    downloadUrl:
      '/RMC-Software-Documentation/source-documents/desktop-applications/rmc-totalrisk/technical-reference-manual/RMC-TotalRisk Technical Reference Manual.pdf',
  },
  {
    icon: 'img/TotalRisk.png',
    preserveIconColor: true,
    doc_location: 'desktop-applications/rmc-totalrisk/applications-guide',
    doc_name: 'RMC TotalRisk Applications Guide',
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
    doc_location: doc.downloadUrl
      ? undefined
      : addBaseUrl(`docs/${doc.doc_location}/${latestVersions[doc.doc_location.replace(/^docs\//, '')]}/preface`),
  }));

  return (
    <Layout title="RMC Software Documentation" description="Documentation for RMC Software Packages">
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
            <h1 className="text-title">RMC TotalRisk</h1>
            <p className="text-description">Quantitative risk analysis for dam and levee safety</p>
          </div>
        </div>
        <ContentBox contentData={totalRiskData} />
      </main>
    </Layout>
  );
}
