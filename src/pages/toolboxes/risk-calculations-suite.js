import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import { useEffect, useState } from 'react';
import ContentBox from '../../components/ContentBox';
import ToolboxIcon from '../../components/icons/ToolboxIcon';
import { filterByCategoryAndSoftware } from '../../docConfig';
import '../../css/custom.css';

const riskCalculationsSuite = filterByCategoryAndSoftware('toolboxes', 'risk-calculations-suite').map((doc) => ({
  ...doc,
  IconComponent: ToolboxIcon,
}));

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
    doc_location: addBaseUrl(`docs/${doc.doc_location}/${latestVersions[doc.doc_location.replace(/^docs\//, '')]}/preface`),
  }));

  return (
    <Layout title="RMC Software Documentation" description="Documentation for RMC Software Packages">
      <main>
        <div className="title-container">
          <ToolboxIcon className="h-[80px] w-[80px] text-ifm-primary" />
          <div className="text-container">
            <h1 className="text-title">Risk Calculations Suite</h1>
            <p className="text-description">Risk computations for dam and levee safety</p>
          </div>
        </div>
        <ContentBox contentData={riskCalculationsSuite} />
      </main>
    </Layout>
  );
}
