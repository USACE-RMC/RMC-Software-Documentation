import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import { useEffect, useState } from 'react';
import ContentBox from '../../components/ContentBox';
import '../../css/custom.css';

// Create the list of documents dynamically
const RFAData = [
  {
    icon: 'img/RFA.png',
    doc_location: 'desktop-applications/rmc-rfa/users-guide',
    doc_name: 'RMC RFA Users Guide',
    active: false,
    draft: true,
  },
];

export const RFADocs = RFAData;

export default function RFA() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    // Fetch the latestVersions JSON file
    fetch('/RMC-Software-Documentation/versions/latestVersions.json')
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error('Error loading latest versions:', error));
  }, []);

  const RFAData = RFADocs.map((doc) => ({
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
            alt="RFA"
            sources={{
              light: addBaseUrl('img/RFA.png'),
              dark: addBaseUrl('img/RFA.png'),
            }}
          />
          <div className="text-container">
            <p className="text-title">RMC Reservoir Frequency Analysis</p>
            <p className="text-description">RMC Reservoir Frequency Analysis</p>
          </div>
        </div>
        <ContentBox contentData={RFAData} />
      </main>
    </Layout>
  );
}
