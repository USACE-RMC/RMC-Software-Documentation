import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import { useEffect, useState } from 'react';
import ContentBox from '../../components/ContentBox';
import '../../css/custom.css';

// Create the list of documents dynamically
const bestFitData = [
  {
    icon: 'img/BestFit.png',
    doc_location: 'desktop-applications/rmc-bestfit/users-guide',
    doc_name: 'RMC BestFit Users Guide',
    active: true,
    draft: true,
  },
];

export const bestFitDocs = bestFitData;

export default function BestFit() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    // Fetch the latestVersions JSON file
    fetch('/RMC-Software-Documentation/versions/latestVersions.json')
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error('Error loading latest versions:', error));
  }, []);

  const bestFitData = bestFitDocs.map((doc) => ({
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
            alt="BestFit"
            sources={{
              light: addBaseUrl('img/BestFit.png'),
              dark: addBaseUrl('img/BestFit.png'),
            }}
          />
          <div className="text-container">
            <p className="text-title">RMC BestFit</p>
            <p className="text-description">RMC BestFit</p>
          </div>
        </div>
        <ContentBox contentData={bestFitData} />
      </main>
    </Layout>
  );
}
