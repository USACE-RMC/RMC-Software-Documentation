import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import { useEffect, useState } from 'react';
import ContentBox from '../../components/ContentBox';
import ToolboxIcon from '../../components/icons/ToolboxIcon';
import '../../css/custom.css';

// Create the list of documents dynamically
const seismicHazardSuite = [
  {
    IconComponent: ToolboxIcon,
    doc_location: `toolbox-technical-manuals/seismic-hazard-suite/site-classification`,
    doc_name: 'Site Classification Toolbox Technical Manual',
    active: true,
    draft: false,
  },
  {
    IconComponent: ToolboxIcon,
    doc_location: `toolbox-technical-manuals/seismic-hazard-suite/seismic-hazard-curves`,
    doc_name: 'Seismic Hazard Curves Toolbox Technical Manual',
    active: true,
    draft: false,
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
    doc_location: addBaseUrl(`docs/${doc.doc_location}/${latestVersions[doc.doc_location.replace(/^docs\//, '')]}/preface`),
  }));

  return (
    <Layout title="RMC Software Documentation" description="Documentation for RMC Software Packages">
      <main>
        <div className="title-container">
          <ToolboxIcon className="h-[80px] w-[80px] text-ifm-primary" />
          <div className="text-container">
            <h1 className="text-title">Seismic Hazard Suite</h1>
            <p className="text-description">Assessing seismic hazard and failure modes for dam and levee safety</p>
          </div>
        </div>
        <ContentBox contentData={seismicHazardSuite} />
      </main>
    </Layout>
  );
}
