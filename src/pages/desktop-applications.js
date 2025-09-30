import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import ContentBox from '../components/ContentBox';
import '../css/custom.css';

export default function DesktopApps() {
  const desktopAppData = [
    {
      iconLight: addBaseUrl('img/TotalRisk.png'),
      doc_location: addBaseUrl('desktop-applications/rmc-totalrisk'),
      doc_name: 'RMC TotalRisk',
      active: true,
    },
    {
      iconLight: addBaseUrl('img/BestFit.png'),
      doc_location: addBaseUrl('desktop-applications/rmc-bestfit'),
      doc_name: 'RMC BestFit',
      active: true,
    },
    {
      iconLight: addBaseUrl('img/RFA.png'),
      doc_location: addBaseUrl('desktop-applications/rmc-rfa'),
      doc_name: 'RMC RFA',
      active: true,
    },
    {
      iconLight: addBaseUrl('img/LifeSim.png'),
      doc_location: addBaseUrl('desktop-applications/lifesim'),
      doc_name: 'LifeSim',
      active: true,
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
            alt="Desktop Applications"
            className=""
            sources={{
              light: addBaseUrl('img/DesktopAppFilled.png'),
              dark: addBaseUrl('img/DesktopAppFilledDarkMode.png'),
            }}
          />
          <div className="text-container">
            <p className="text-title">Desktop Applications</p>
            <p className="text-description">RMC Desktop Applications</p>
          </div>
        </div>
        <ContentBox contentData={desktopAppData} />
      </main>
    </Layout>
  );
}
