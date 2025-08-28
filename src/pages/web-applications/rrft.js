import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import { useEffect, useState } from 'react';
import ContentBox from '../../components/ContentBox';
import '../../css/custom.css';

// Create the list of documents dynamically
const rrftData = [
  {
    iconLight: 'img/WebApp.png',
    iconDark: 'img/WebAppDarkMode.png',
    doc_location: 'web-applications/rrft/users-guide',
    doc_name: 'RRFT Users Guide',
    active: false,
    draft: true,
  },
];

export const rrftDocs = rrftData;

export default function RRFT() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    // Fetch the latestVersions JSON file
    fetch('/RMC-Software-Documentation/versions/latestVersions.json')
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error('Error loading latest versions:', error));
  }, []);

  const rrftData = rrftDocs.map((doc) => ({
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
            alt="Rainfall Runoff Frequency Tool"
            sources={{
              light: addBaseUrl('img/WebAppFilled.png'),
              dark: addBaseUrl('img/WebAppFilledDarkMode.png'),
            }}
          />
          <div className="text-container">
            <p className="text-title">Rainfall Runoff Frequency Tool</p>
            <p className="text-description">Rainfall Runoff Frequency Tool</p>
          </div>
        </div>
        <ContentBox contentData={rrftData} />
      </main>
    </Layout>
  );
}
