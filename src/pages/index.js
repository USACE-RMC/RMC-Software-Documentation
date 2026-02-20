import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import { Hero } from '@usace/groundwork';
import ContentBoxLarge from '../components/ContentBoxLarge';
import DesktopAppIcon from '../components/icons/DesktopAppIcon';
import ToolboxIcon from '../components/icons/ToolboxIcon';
import WebAppIcon from '../components/icons/WebAppIcon';
import '../css/custom.css';

export default function Home() {
  const homepageData = [
    {
      IconComponent: DesktopAppIcon,
      doc_name: 'Desktop Applications',
      contentCardData: [
        { iconLight: addBaseUrl('img/TotalRisk.png'), title: 'RMC-TotalRisk', description: 'Portfolio risk analysis', href: addBaseUrl('desktop-applications/rmc-totalrisk'), active: true, preserveIconColor: true },
        { iconLight: addBaseUrl('img/RFA.png'), title: 'RMC-RFA', description: 'Flood frequency analysis', href: addBaseUrl('desktop-applications/rmc-rfa'), active: true, preserveIconColor: true },
        { iconLight: addBaseUrl('img/BestFit.png'), title: 'RMC-BestFit', description: 'Bayesian flood frequency estimation', href: addBaseUrl('desktop-applications/rmc-bestfit'), active: true, preserveIconColor: true },
        { iconLight: addBaseUrl('img/LifeSim.png'), title: 'LifeSim', description: 'Life loss estimation', href: addBaseUrl('desktop-applications/lifesim'), active: true, preserveIconColor: true },
      ],
    },
    {
      IconComponent: ToolboxIcon,
      doc_name: 'Toolboxes',
      contentCardData: [
        { IconComponent: ToolboxIcon, title: 'Internal Erosion Suite', description: 'Internal erosion failure mode assessment', href: addBaseUrl('toolboxes/internal-erosion-suite'), active: true },
        { IconComponent: ToolboxIcon, title: 'Overtopping Suite', description: 'Overtopping erosion failure mode assessment', href: addBaseUrl('toolboxes/overtopping-suite'), active: true },
        { IconComponent: ToolboxIcon, title: 'Risk Calculations Suite', description: 'Risk computations for dam and levee safety', href: addBaseUrl('toolboxes/risk-calculations-suite'), active: true },
        { IconComponent: ToolboxIcon, title: 'Seismic Hazard Suite', description: 'Seismic hazard and failure mode assessment', href: addBaseUrl('toolboxes/seismic-hazard-suite'), active: true },
        { IconComponent: ToolboxIcon, title: 'Riverine Erosion Toolbox', description: 'Breach risk from waterside surface erosion', href: addBaseUrl('toolboxes/riverine-erosion-suite'), active: false },
        { IconComponent: ToolboxIcon, title: 'Spillway Erosion Suite', description: 'Spillway erosion failure mode assessment', href: addBaseUrl('toolboxes/spillway-erosion-suite'), active: false },
        { IconComponent: ToolboxIcon, title: 'Structural Suite', description: 'Seismic sliding and structural reliability', href: addBaseUrl('toolboxes/structural-suite'), active: false },
      ],
    },
    {
      IconComponent: WebAppIcon,
      doc_name: 'Web Applications',
      contentCardData: [
        { IconComponent: WebAppIcon, title: 'RRFT', description: 'Rapid risk framework', href: addBaseUrl('web-applications/rrft'), active: false },
        { IconComponent: WebAppIcon, title: 'Levee Screening Tool', description: 'Levee risk screening and assessment', href: addBaseUrl('web-applications/lst'), active: true },
        { IconComponent: WebAppIcon, title: 'Dam Screening Tool', description: 'Dam risk screening', href: addBaseUrl('web-applications/dst'), active: false },
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
