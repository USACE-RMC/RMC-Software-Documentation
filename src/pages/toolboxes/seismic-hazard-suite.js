import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import { useEffect, useState } from 'react';
import ContentBox from '../../components/ContentBox';
import '../../css/custom.css';

// Create the list of documents dynamically
const seismicHazardSuite = [
  {
    iconLight: 'img/Toolbox.png',
    iconDark: 'img/ToolboxDarkMode.png',
    doc_location: `toolbox-technical-manuals/seismic-hazard-suite/site-classification`,
    doc_name: 'Site Classification Toolbox Technical Manual',
    active: true,
    draft: true,
  },
  {
    iconLight: 'img/Toolbox.png',
    iconDark: 'img/ToolboxDarkMode.png',
    doc_location: `toolbox-technical-manuals/seismic-hazard-suite/seismic-hazard-curves`,
    doc_name: 'Seismic Hazard Curves Toolbox Technical Manual',
    active: true,
    draft: true,
  },
  {
    iconLight: 'img/Toolbox.png',
    iconDark: 'img/ToolboxDarkMode.png',
    doc_location: `toolbox-technical-manuals/seismic-hazard-suite/liquefaction`,
    doc_name: 'Liquefaction Toolbox Technical Manual',
    active: false,
    draft: true,
  },
  {
    iconLight: 'img/Toolbox.png',
    iconDark: 'img/ToolboxDarkMode.png',
    doc_location: `toolbox-technical-manuals/seismic-hazard-suite/empirical-crest-deformation`,
    doc_name: 'Empirical Crest Deformation Toolbox Technical Manual',
    active: false,
    draft: true,
  },
];

export const seismicHazardSuiteDocs = seismicHazardSuite;

export default function SeismicHazardSuite() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    fetch('/RMC-Software-Documentation/versions/latestVersions.json')
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error('Error loading latest versions:', error));
  }, []);

  const seismicHazardSuite = seismicHazardSuiteDocs.map((doc) => ({
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
            alt="Seismic Hazard Suite"
            sources={{
              light: addBaseUrl('img/ToolboxFilled.png'),
              dark: addBaseUrl('img/ToolboxFilledDarkMode.png'),
            }}
          />
          <div className="text-container">
            <p className="text-title">Seismic Hazard Suite</p>
            <p className="text-description">RMC Toolboxes</p>
          </div>
        </div>
        <ContentBox contentData={seismicHazardSuite} />
      </main>
    </Layout>
  );
}
