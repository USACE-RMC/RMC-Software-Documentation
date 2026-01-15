import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import { useEffect, useState } from 'react';
import ContentBox from '../../components/ContentBox';
import '../../css/custom.css';

// Create the list of documents dynamically
const lstData = [
  {
    iconLight: 'img/WebApp.png',
    iconDark: 'img/WebAppDarkMode.png',
    doc_location: 'web-applications/lst/users-guide',
    doc_name: 'Levee Screening Tool Users Guide',
    active: false,
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
    icon: addBaseUrl(doc.icon),
    iconLight: addBaseUrl(doc.iconLight),
    iconDark: addBaseUrl(doc.iconDark),
    doc_location: addBaseUrl(`docs/${doc.doc_location}/${latestVersions[doc.doc_location.replace(/^docs\//, '')]}/preface`),
  }));

  return (
    <Layout title="RMC Software Documentation" description="Documentation for RMC Software Packages">
      <main>
        <div className="title-container">
          <ThemedImage
            alt="Levee Screening Tool"
            sources={{
              light: addBaseUrl('img/WebAppFilled.png'),
              dark: addBaseUrl('img/WebAppFilledDarkMode.png'),
            }}
          />
          <div className="text-container">
            <p className="text-title">Levee Screening Tool</p>
            <p className="text-description">Levee Screening Tool</p>
          </div>
        </div>
        <ContentBox contentData={lstData} />
      </main>
    </Layout>
  );
}
