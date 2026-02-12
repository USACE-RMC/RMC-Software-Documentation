import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import { Hero } from '@usace/groundwork';
import ContentBoxLarge from '../components/ContentBoxLarge';
import '../css/custom.css';

export default function Home() {
  const homepageData = [
    {
      iconLight: addBaseUrl('img/DesktopAppFilled.png'),
      iconDark: addBaseUrl('img/DesktopAppFilledDarkMode.png'),
      doc_name: 'Desktop Applications',
      contentCardData: [
        { iconLight: addBaseUrl('img/TotalRisk.png'), title: 'RMC-TotalRisk', description: 'Portfolio risk analysis', href: addBaseUrl('desktop-applications/rmc-totalrisk'), active: true, preserveIconColor: true },
        { iconLight: addBaseUrl('img/RFA.png'), title: 'RMC-RFA', description: 'Flood frequency analysis', href: addBaseUrl('desktop-applications/rmc-rfa'), active: true, preserveIconColor: true },
        { iconLight: addBaseUrl('img/BestFit.png'), title: 'RMC-BestFit', description: 'Distribution fitting', href: addBaseUrl('desktop-applications/rmc-bestfit'), active: true, preserveIconColor: true },
        { iconLight: addBaseUrl('img/LifeSim.png'), title: 'LifeSim', description: 'Life loss estimation', href: addBaseUrl('desktop-applications/lifesim'), active: true, preserveIconColor: true },
      ],
    },
    {
      iconLight: addBaseUrl('img/ToolboxFilled.png'),
      iconDark: addBaseUrl('img/ToolboxFilledDarkMode.png'),
      doc_name: 'Toolboxes',
      contentCardData: [
        { iconLight: addBaseUrl('img/Toolbox.png'), iconDark: addBaseUrl('img/ToolboxDarkMode.png'), title: 'Internal Erosion Suite', description: 'Piping and erosion analysis', href: addBaseUrl('toolboxes/internal-erosion-suite'), active: true },
        { iconLight: addBaseUrl('img/Toolbox.png'), iconDark: addBaseUrl('img/ToolboxDarkMode.png'), title: 'Overtopping Suite', description: 'Overtopping failure analysis', href: addBaseUrl('toolboxes/overtopping-suite'), active: true },
        { iconLight: addBaseUrl('img/Toolbox.png'), iconDark: addBaseUrl('img/ToolboxDarkMode.png'), title: 'Risk Calculations Suite', description: 'Risk quantification tools', href: addBaseUrl('toolboxes/risk-calculations-suite'), active: true },
        { iconLight: addBaseUrl('img/Toolbox.png'), iconDark: addBaseUrl('img/ToolboxDarkMode.png'), title: 'Seismic Hazard Suite', description: 'Earthquake hazard analysis', href: addBaseUrl('toolboxes/seismic-hazard-suite'), active: true },
        { iconLight: addBaseUrl('img/Toolbox.png'), iconDark: addBaseUrl('img/ToolboxDarkMode.png'), title: 'Riverine Erosion Toolbox', description: 'Streambank erosion tools', href: addBaseUrl('toolboxes/riverine-erosion-suite'), active: false },
        { iconLight: addBaseUrl('img/Toolbox.png'), iconDark: addBaseUrl('img/ToolboxDarkMode.png'), title: 'Spillway Erosion Suite', description: 'Spillway erosion analysis', href: addBaseUrl('toolboxes/spillway-erosion-suite'), active: false },
        { iconLight: addBaseUrl('img/Toolbox.png'), iconDark: addBaseUrl('img/ToolboxDarkMode.png'), title: 'Structural Suite', description: 'Structural reliability tools', href: addBaseUrl('toolboxes/structural-suite'), active: false },
      ],
    },
    {
      iconLight: addBaseUrl('img/WebAppFilled.png'),
      iconDark: addBaseUrl('img/WebAppFilledDarkMode.png'),
      doc_name: 'Web Applications',
      contentCardData: [
        { iconLight: addBaseUrl('img/WebApp.png'), iconDark: addBaseUrl('img/WebAppDarkMode.png'), title: 'RRFT', description: 'Rapid risk framework', href: addBaseUrl('web-applications/rrft'), active: false },
        { iconLight: addBaseUrl('img/WebApp.png'), iconDark: addBaseUrl('img/WebAppDarkMode.png'), title: 'Levee Screening Tool', description: 'Levee risk screening', href: addBaseUrl('web-applications/lst'), active: true },
        { iconLight: addBaseUrl('img/WebApp.png'), iconDark: addBaseUrl('img/WebAppDarkMode.png'), title: 'Dam Screening Tool', description: 'Dam risk screening', href: addBaseUrl('web-applications/dst'), active: false },
      ],
    },
  ];

  return (
    <Layout title="RMC Software Documentation" description="Documentation for RMC Software Packages">
      <Hero
        image={[addBaseUrl('nww-lucky-peak-dam.jpg'), addBaseUrl('taylorsville-SPPRu4Rw.jpg')]}
        alt={['Lucky Peak Dam', 'Taylorsville Dam']}
        title="RMC Software Documentation"
        subtitle="Your hub for comprehensive guides, resources, and support to navigate our powerful tools."
        imgHeight="18vh"
      />
      <main className="main-content-container">
        <ContentBoxLarge contentData={homepageData} />
      </main>
    </Layout>
  );
}
