import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import ContentBox from '../components/ContentBox';
import '../css/custom.css';

export default function WebApps() {
  const webAppData = [
    {
      iconLight: addBaseUrl('img/WebApp.png'),
      iconDark: addBaseUrl('img/WebAppDarkMode.png'),
      doc_location: addBaseUrl('web-applications/rrft'),
      doc_name: 'Rainfall Runoff Frequency Tool',
      active: false,
    },
    {
      iconLight: addBaseUrl('img/WebApp.png'),
      iconDark: addBaseUrl('img/WebAppDarkMode.png'),
      doc_location: addBaseUrl('web-applications/lst'),
      doc_name: 'Levee Screening Tool',
      active: true,
    },
    {
      iconLight: addBaseUrl('img/WebApp.png'),
      iconDark: addBaseUrl('img/WebAppDarkMode.png'),
      doc_location: addBaseUrl('web-applications/dst'),
      doc_name: 'Dam Screening Tool',
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
            alt="Web Applications"
            className=""
            sources={{
              light: addBaseUrl('img/WebAppFilled.png'),
              dark: addBaseUrl('img/WebAppFilledDarkMode.png'),
            }}
          />
          <div className="text-container">
            <p className="text-title">Web Applications</p>
            <p className="text-description">RMC Web Applications</p>
          </div>
        </div>
        <ContentBox contentData={webAppData} />
      </main>
    </Layout>
  );
}
