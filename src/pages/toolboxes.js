import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import ContentBox from '../components/ContentBox';
import '../css/custom.css';

export default function Toolboxes() {
  const toolboxSuiteData = [
    {
      iconLight: addBaseUrl('img/Toolbox.png'),
      iconDark: addBaseUrl('img/ToolboxDarkMode.png'),
      doc_location: addBaseUrl('toolboxes/internal-erosion-suite'),
      doc_name: 'Internal Erosion Suite',
      active: true,
    },
    {
      iconLight: addBaseUrl('img/Toolbox.png'),
      iconDark: addBaseUrl('img/ToolboxDarkMode.png'),
      doc_location: addBaseUrl('toolboxes/overtopping-erosion-suite'),
      doc_name: 'Overtopping Erosion Suite',
      active: false,
    },
    {
      iconLight: addBaseUrl('img/Toolbox.png'),
      iconDark: addBaseUrl('img/ToolboxDarkMode.png'),
      doc_location: addBaseUrl('toolboxes/risk-calculations-suite'),
      doc_name: 'Risk Calculations Suite',
      active: true,
    },
    {
      iconLight: addBaseUrl('img/Toolbox.png'),
      iconDark: addBaseUrl('img/ToolboxDarkMode.png'),
      doc_location: addBaseUrl('toolboxes/riverine-erosion-suite'),
      doc_name: 'Riverine Erosion Toolbox',
      active: false,
    },
    {
      iconLight: addBaseUrl('img/Toolbox.png'),
      iconDark: addBaseUrl('img/ToolboxDarkMode.png'),
      doc_location: addBaseUrl('toolboxes/seismic-hazard-suite'),
      doc_name: 'Seismic Hazard Suite',
      active: true,
    },
    {
      iconLight: addBaseUrl('img/Toolbox.png'),
      iconDark: addBaseUrl('img/ToolboxDarkMode.png'),
      doc_location: addBaseUrl('toolboxes/spillway-erosion-suite'),
      doc_name: 'Spillway Erosion Suite',
      active: false,
    },
    {
      iconLight: addBaseUrl('img/Toolbox.png'),
      iconDark: addBaseUrl('img/ToolboxDarkMode.png'),
      doc_location: addBaseUrl('toolboxes/structural-suite'),
      doc_name: 'Structural Suite',
      active: false,
    },
  ];

  return (
    <Layout
      title="RMC Software Documentation"
      description="Documentation for RMC Software Packages"
    >
      <main>
        <div className="title-container">
          <ThemedImage
            alt="Toolboxes"
            className="" // keep any sizing classes you used on <img>
            sources={{
              light: addBaseUrl('img/ToolboxFilled.png'),
              dark: addBaseUrl('img/ToolboxFilledDarkMode.png'),
            }}
          />
          <div className="text-container">
            <p className="text-title">Toolboxes</p>
            <p className="text-description">RMC Toolboxes</p>
          </div>
        </div>
        <ContentBox contentData={toolboxSuiteData} />
      </main>
    </Layout>
  );
}
