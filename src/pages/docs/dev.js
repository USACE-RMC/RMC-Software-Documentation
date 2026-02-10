import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import { useEffect, useState } from 'react';
import ContentBox from '../../components/ContentBox';
import '../../css/custom.css';

const devData = [
  {
    iconLight: 'img/Toolbox.png',
    iconDark: 'img/ToolboxDarkMode.png',
    doc_location: 'docs/dev/github-workflows/introduction',
    doc_name: 'GitHub Workflows SOP',
    active: true,
    versioned: false,
  },
  {
    iconLight: 'img/Toolbox.png',
    iconDark: 'img/ToolboxDarkMode.png',
    doc_location: 'docs/dev/ai-development/ai-assisted-development',
    doc_name: 'AI Assistant Guidance',
    active: true,
    versioned: false,
  },
  {
    iconLight: 'img/Toolbox.png',
    iconDark: 'img/ToolboxDarkMode.png',
    doc_location: 'docs/dev/architecture/web-app-architecture',
    doc_name: 'Web Application Architecture',
    active: true,
    versioned: false,
  },
  {
    iconLight: 'img/WebApp.png',
    iconDark: 'img/WebAppDarkMode.png',
    doc_location: 'dev/dst/database-schema',
    doc_name: 'DST Database Schema Reference',
    active: true,
    versioned: true,
  },
];

export default function Dev() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    fetch('/RMC-Software-Documentation/versions/latestVersions.json')
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error('Error loading latest versions:', error));
  }, []);

  const contentData = devData.map((doc) => ({
    ...doc,
    iconLight: addBaseUrl(doc.iconLight),
    iconDark: addBaseUrl(doc.iconDark),
    doc_location: doc.versioned
      ? addBaseUrl(`docs/${doc.doc_location}/${latestVersions[doc.doc_location] || 'v1.0'}/preface`)
      : addBaseUrl(doc.doc_location),
  }));

  return (
    <Layout title="Developer Resources" description="Developer documentation and references for RMC software">
      <main>
        <div className="title-container">
          <ThemedImage
            alt="Developer Resources"
            sources={{
              light: addBaseUrl('img/ToolboxFilled.png'),
              dark: addBaseUrl('img/ToolboxFilledDarkMode.png'),
            }}
          />
          <div className="text-container">
            <p className="text-title">Developer Resources</p>
            <p className="text-description">Internal development guides and technical references</p>
          </div>
        </div>
        <ContentBox contentData={contentData} />
      </main>
    </Layout>
  );
}
