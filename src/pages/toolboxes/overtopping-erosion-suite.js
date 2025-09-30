import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import { useEffect, useState } from 'react';
import ContentBox from '../../components/ContentBox';
import '../../css/custom.css';

// Create the list of documents dynamically
const overtoppingErosionSuite = [
  {
    iconLight: 'img/Toolbox.png',
    iconDark: 'img/ToolboxDarkMode.png',
    doc_location: `toolbox-technical-manuals/overtopping-erosion-suite/overtopping-toolbox-notes`,
    doc_name: 'Overtopping Toolbox User Notes',
    active: true,
    draft: true,
  }
];

export const overtoppingErosionSuiteDocs = overtoppingErosionSuite;

export default function OvertoppingErosionSuite() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    fetch('/RMC-Software-Documentation/versions/latestVersions.json')
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error('Error loading latest versions:', error));
  }, []);

  const overtoppingErosionSuite = overtoppingErosionSuiteDocs.map((doc) => ({
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
            alt="Overtopping Erosion Suite"
            sources={{
              light: addBaseUrl('img/ToolboxFilled.png'),
              dark: addBaseUrl('img/ToolboxFilledDarkMode.png'),
            }}
          />
          <div className="text-container">
            <p className="text-title">Overtopping Erosion Suite</p>
            <p className="text-description">RMC Toolboxes</p>
          </div>
        </div>
        <ContentBox contentData={overtoppingErosionSuite} />
      </main>
    </Layout>
  );
}