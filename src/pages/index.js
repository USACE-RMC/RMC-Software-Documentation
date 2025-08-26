import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import { Hero } from '@usace/groundwork';
import ContentBoxLarge from '../components/ContentBoxLarge';
import '../css/custom.css';

export default function Home() {
  const desktopAppCardData = [
    {
      iconLight: addBaseUrl('img/TotalRisk.png'),
      title: 'RMC-TotalRisk',
    },
    {
      iconLight: addBaseUrl('img/RFA.png'),
      title: 'RMC-RFA',
    },
    {
      iconLight: addBaseUrl('img/BestFit.png'),
      title: 'RMC-BestFit',
    },
    {
      iconLight: addBaseUrl('img/LifeSim.png'),
      title: 'LifeSim',
    },
  ];

  const toolboxCardData = [
    {
      iconLight: addBaseUrl('img/Toolbox.png'),
      iconDark: addBaseUrl('img/ToolboxDarkMode.png'),
      title: 'RMC Toolboxes',
    },
  ];

  const webAppCardData = [
    {
      iconLight: addBaseUrl('img/WebApp.png'),
      title: 'RRFT',
    },
    {
      iconLight: addBaseUrl('img/WebApp.png'),
      title: 'Levee Screening Tool',
    },
    {
      iconLight: addBaseUrl('img/WebApp.png'),
      title: 'Dam Screening Tool',
    },
  ];

  const homepageData = [
    {
      iconLight: addBaseUrl('img/DesktopApp.png'),
      doc_location: addBaseUrl('desktop-applications'),
      doc_name: 'Desktop Applications',
      contentCardData: desktopAppCardData,
      active: true,
    },
    {
      iconLight: addBaseUrl('img/ToolboxFilled.png'),
      iconDark: addBaseUrl('img/ToolboxFilledDarkMode.png'),
      doc_location: addBaseUrl('toolboxes'),
      doc_name: 'Toolboxes',
      contentCardData: toolboxCardData,
      active: true,
    },
    {
      iconLight: addBaseUrl('img/WebAppFilled.png'),
      doc_location: addBaseUrl('web-applications'),
      doc_name: 'Web Applications',
      contentCardData: webAppCardData,
      active: true,
    },
  ];

  return (
    <Layout
      title="RMC Software Documentation"
      description="Documentation for RMC Software Packages"
    >
      <Hero
        image={[addBaseUrl('nww-lucky-peak-dam.jpg'), addBaseUrl('taylorsville-SPPRu4Rw.jpg')]}
        alt={['Lucky Peak Dam', 'Taylorsville Dam']}
        title="RMC Software Documentation"
        subtitle="Your hub for comprehensive guides, resources, and support to navigate our powerful tools."
      />
      <main className="main-content-container">
        <ContentBoxLarge contentData={homepageData} />
      </main>
    </Layout>
  );
}
