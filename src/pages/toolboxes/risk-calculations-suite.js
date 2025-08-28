import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import { useEffect, useState } from 'react';
import ContentBox from '../../components/ContentBox';
import '../../css/custom.css';

// Create the list of documents dynamically
const riskCalculationsSuite = [
  {
    iconLight: 'img/Toolbox.png',
    iconDark: 'img/ToolboxDarkMode.png',
    doc_location: `toolbox-technical-manuals/risk-calculations-suite/sqra-calcs`,
    doc_name: 'SQRAcalcs Toolbox Technical Manual',
    active: false,
    draft: true,
  },
  {
    iconLight: 'img/Toolbox.png',
    iconDark: 'img/ToolboxDarkMode.png',
    doc_location: `toolbox-technical-manuals/risk-calculations-suite/qra-calcs`,
    doc_name: 'QRAcalcs Toolbox Technical Manual',
    active: false,
    draft: true,
  },
  {
    iconLight: 'img/Toolbox.png',
    iconDark: 'img/ToolboxDarkMode.png',
    doc_location: `toolbox-technical-manuals/risk-calculations-suite/event-combination`,
    doc_name: 'Event Combination Toolbox Technical Manual',
    active: false,
    draft: true,
  },
  {
    iconLight: 'img/Toolbox.png',
    iconDark: 'img/ToolboxDarkMode.png',
    doc_location: `toolbox-technical-manuals/risk-calculations-suite/joint-loading-probability-dams`,
    doc_name: 'Joint-Loading Probability (Dams) Toolbox Technical Manual',
    active: false,
    draft: true,
  },
  {
    iconLight: 'img/Toolbox.png',
    iconDark: 'img/ToolboxDarkMode.png',
    doc_location: `toolbox-technical-manuals/risk-calculations-suite/risk-management-plans`,
    doc_name: 'Risk Management Plans Toolbox Technical Manual',
    active: false,
    draft: true,
  },
  {
    iconLight: 'img/Toolbox.png',
    iconDark: 'img/ToolboxDarkMode.png',
    doc_location: `toolbox-technical-manuals/risk-calculations-suite/typical-event-tree-database`,
    doc_name: 'Typical Event Tree Database',
    active: true,
    draft: true,
  },
];

export const riskCalculationsSuiteDocs = riskCalculationsSuite;

export default function RiskCalculationsSuite() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    fetch('/RMC-Software-Documentation/versions/latestVersions.json')
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error('Error loading latest versions:', error));
  }, []);

  const riskCalculationsSuite = riskCalculationsSuiteDocs.map((doc) => ({
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
            alt="Risk Calculations Suite"
            sources={{
              light: addBaseUrl('img/ToolboxFilled.png'),
              dark: addBaseUrl('img/ToolboxFilledDarkMode.png'),
            }}
          />
          <div className="text-container">
            <p className="text-title">Risk Calculations Suite</p>
            <p className="text-description">RMC Toolboxes</p>
          </div>
        </div>
        <ContentBox contentData={riskCalculationsSuite} />
      </main>
    </Layout>
  );
}
