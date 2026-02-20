import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import { useEffect, useState } from 'react';
import ContentBox from '../../components/ContentBox';
import ToolboxIcon from '../../components/icons/ToolboxIcon';
import '../../css/custom.css';

// Create the list of documents dynamically
const overtoppingSuite = [
  {
    IconComponent: ToolboxIcon,
    doc_location: `toolbox-technical-manuals/overtopping-suite/overtopping-erosion-toolbox-notes`,
    doc_name: 'Overtopping Toolbox User Notes',
    active: true,
    draft: true,
  },
];

export const overtoppingSuiteDocs = overtoppingSuite;

export default function OvertoppingSuite() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    fetch('/RMC-Software-Documentation/versions/latestVersions.json')
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error('Error loading latest versions:', error));
  }, []);

  const overtoppingSuite = overtoppingSuiteDocs.map((doc) => ({
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
            <h1 className="text-title">Overtopping Erosion Suite</h1>
            <p className="text-description">Assessing overtopping erosion failure modes for dam and levee safety</p>
          </div>
        </div>
        <ContentBox contentData={overtoppingSuite} />
      </main>
    </Layout>
  );
}
