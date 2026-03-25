import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import { useEffect, useState } from 'react';
import ContentBox from '../../components/ContentBox';
import '../../css/custom.css';

// Create the list of documents dynamically
const lifeSimData = [
  {
    icon: 'img/LifeSim.png',
    preserveIconColor: true,
    doc_location: 'desktop-applications/lifesim/users-guide',
    doc_name: 'LifeSim Users Guide',
    active: true,
    draft: false,
  },
  {
    icon: 'img/LifeSim.png',
    preserveIconColor: true,
    doc_location: 'desktop-applications/lifesim/validation-studies',
    doc_name: 'LifeSim Validation Studies',
    active: true,
    draft: false,
  },
  {
    icon: 'img/LifeSim.png',
    preserveIconColor: true,
    doc_name: 'LifeSim Technical Reference Manual',
    active: true,
    draft: false,
    downloadUrl: '/source-documents/desktop-applications/lifesim/technical-reference-manual/LifeSim-Technical-Reference-Manual.pdf',
  },
  {
    icon: 'img/LifeSim.png',
    preserveIconColor: true,
    doc_location: 'desktop-applications/lifesim/applications-guide',
    doc_name: 'LifeSim Applications Guide',
    active: false,
    draft: false,
  },
];

export const lifeSimDocs = lifeSimData;

export default function LifeSim() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    fetch('/RMC-Software-Documentation/versions/latestVersions.json')
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error('Error loading latest versions:', error));
  }, []);

  const lifeSimData = lifeSimDocs.map((doc) => ({
    ...doc,
    icon: addBaseUrl(doc.icon),
    iconLight: addBaseUrl(doc.iconLight),
    iconDark: addBaseUrl(doc.iconDark),
    doc_location: doc.downloadUrl ? undefined : addBaseUrl(`docs/${doc.doc_location}/${latestVersions[doc.doc_location.replace(/^docs\//, '')]}/preface`),
    downloadUrl: doc.downloadUrl ? addBaseUrl(doc.downloadUrl) : undefined,
  }));

  return (
    <Layout title="RMC Software Documentation" description="Documentation for RMC Software Packages">
      <main>
        <div className="title-container">
          <ThemedImage
            alt="LifeSim"
            sources={{
              light: addBaseUrl('img/LifeSim.png'),
              dark: addBaseUrl('img/LifeSim.png'),
            }}
          />
          <div className="text-container">
            <h1 className="text-title">LifeSim</h1>
            <p className="text-description">Agent-based life loss and damage estimation for flood events</p>
          </div>
        </div>
        <ContentBox contentData={lifeSimData} />
      </main>
    </Layout>
  );
}
