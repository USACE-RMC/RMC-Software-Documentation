import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import { useEffect, useState } from 'react';
import ContentBox from '../../components/ContentBox';
import ToolboxIcon from '../../components/icons/ToolboxIcon';
import '../../css/custom.css';

// Create the list of documents dynamically
const riskCalculationsSuite = [
  {
    IconComponent: ToolboxIcon,
    doc_location: `toolbox-technical-manuals/risk-calculations-suite/sqra-calcs`,
    doc_name: 'SQRAcalcs Toolbox Technical Manual',
    active: false,
    draft: true,
  },
  {
    IconComponent: ToolboxIcon,
    doc_location: `toolbox-technical-manuals/risk-calculations-suite/qra-calcs`,
    doc_name: 'QRAcalcs Toolbox Technical Manual',
    active: false,
    draft: true,
  },
  {
    IconComponent: ToolboxIcon,
    doc_location: `toolbox-technical-manuals/risk-calculations-suite/event-combination`,
    doc_name: 'Event Combination Toolbox Technical Manual',
    active: false,
    draft: true,
  },
  {
    IconComponent: ToolboxIcon,
    doc_location: `toolbox-technical-manuals/risk-calculations-suite/joint-loading-probability-dams`,
    doc_name: 'Joint-Loading Probability (Dams) Toolbox Technical Manual',
    active: false,
    draft: true,
  },
  {
    IconComponent: ToolboxIcon,
    doc_location: `toolbox-technical-manuals/risk-calculations-suite/risk-management-plans`,
    doc_name: 'Risk Management Plans Toolbox Technical Manual',
    active: false,
    draft: true,
  },
  {
    IconComponent: ToolboxIcon,
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
          <ToolboxIcon className="h-[80px] w-[80px] text-ifm-primary" />
          <div className="text-container">
            <p className="text-title">Risk Calculations Suite</p>
            <p className="text-description">Risk computations for dam and levee safety</p>
          </div>
        </div>
        <ContentBox contentData={riskCalculationsSuite} />
      </main>
    </Layout>
  );
}
