import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import { useEffect, useState } from 'react';
import ContentBox from '../../components/ContentBox';
import ToolboxIcon from '../../components/icons/ToolboxIcon';
import '../../css/custom.css';

// Create the list of documents dynamically
const internalErosionSuite = [
  {
    IconComponent: ToolboxIcon,
    doc_location: `toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-initiation`,
    doc_name: 'Backward Erosion Piping (Initiation) Toolbox Technical Manual',
    active: true,
    draft: true,
  },
  {
    IconComponent: ToolboxIcon,
    doc_location:
      'toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression',
    doc_name: 'Backward Erosion Piping (Progression) Toolbox Technical Manual',
    active: true,
    draft: true,
  },
  {
    IconComponent: ToolboxIcon,
    doc_location: `toolbox-technical-manuals/internal-erosion-suite/breach`,
    doc_name: 'Breach Toolbox Technical Manual',
    active: true,
    draft: true,
  },
  {
    IconComponent: ToolboxIcon,
    doc_location: `toolbox-technical-manuals/internal-erosion-suite/concentrated-leak-erosion-cracking`,
    doc_name: 'Concentrated Leak Erosion (Cracking) Toolbox Technical Manual',
    active: false,
    draft: true,
  },
  {
    IconComponent: ToolboxIcon,
    doc_location: `toolbox-technical-manuals/internal-erosion-suite/concentrated-leak-erosion-initiation`,
    doc_name: 'Concentrated Leak Erosion (Initiation) Toolbox Technical Manual',
    active: true,
    draft: true,
  },
  {
    IconComponent: ToolboxIcon,
    doc_location: `toolbox-technical-manuals/internal-erosion-suite/erodibility-parameters`,
    doc_name: 'Erodibility Parameters Toolbox Technical Manual',
    active: false,
    draft: true,
  },
  {
    IconComponent: ToolboxIcon,
    doc_location: `toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation`,
    doc_name: 'Filter Evaluation (Continuation) Toolbox Technical Manual',
    active: true,
    draft: true,
  },
  {
    IconComponent: ToolboxIcon,
    doc_location: `toolbox-technical-manuals/internal-erosion-suite/hydraulic-fracture`,
    doc_name: 'Hydraulic Fracture Toolbox Technical Manual',
    active: false,
    draft: true,
  },
  {
    IconComponent: ToolboxIcon,
    doc_location: `toolbox-technical-manuals/internal-erosion-suite/internal-instability`,
    doc_name: 'Internal Instability Toolbox Technical Manual',
    active: true,
    draft: true,
  },
  {
    IconComponent: ToolboxIcon,
    doc_location: `toolbox-technical-manuals/internal-erosion-suite/pipe-service-life`,
    doc_name: 'Pipe Service Life (Flaw) Toolbox Technical Manual',
    active: true,
    draft: true,
  },
  {
    IconComponent: ToolboxIcon,
    doc_location: `toolbox-technical-manuals/internal-erosion-suite/soil-classification`,
    doc_name: 'Soil Classification Toolbox Technical Manual',
    active: false,
    draft: true,
  },
  {
    IconComponent: ToolboxIcon,
    doc_location: `toolbox-technical-manuals/internal-erosion-suite/soil-contact-erosion-initiation`,
    doc_name: 'Soil Contact Erosion (Initiation) Toolbox Technical Manual',
    active: true,
    draft: true,
  },
];

export const internalErosionSuiteDocs = internalErosionSuite;

export default function InternalErosionSuite() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    fetch('/RMC-Software-Documentation/versions/latestVersions.json')
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error('Error loading latest versions:', error));
  }, []);

  const internalErosionSuite = internalErosionSuiteDocs.map((doc) => ({
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
            <p className="text-title">Internal Erosion Suite</p>
            <p className="text-description">Assessing internal erosion failure modes for dam and levee safety</p>
          </div>
        </div>
        <ContentBox contentData={internalErosionSuite} />
      </main>
    </Layout>
  );
}
