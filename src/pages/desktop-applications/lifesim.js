import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import { useEffect, useState } from 'react';
import ContentBox from '../../components/ContentBox';
import { filterByCategoryAndSoftware } from '../../docConfig';
import '../../css/custom.css';

const ICON = 'img/LifeSim.png';

const lifeSimData = filterByCategoryAndSoftware('desktop-applications', 'lifesim').map((doc) => ({
  ...doc,
  icon: ICON,
  preserveIconColor: true,
}));

export const lifeSimDocs = lifeSimData;

export default function LifeSim() {
  const latestVersionsUrl = addBaseUrl('versions/latestVersions.json');
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    fetch(latestVersionsUrl)
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error('Error loading latest versions:', error));
  }, [latestVersionsUrl]);

  const lifeSimData = lifeSimDocs.map((doc) => ({
    ...doc,
    icon: addBaseUrl(doc.icon),
    iconLight: addBaseUrl(doc.iconLight),
    iconDark: addBaseUrl(doc.iconDark),
    doc_location: doc.downloadUrl ? undefined : addBaseUrl(`docs/${doc.doc_location}/${latestVersions[doc.doc_location.replace(/^docs\//, '')]}/preface`),
    downloadUrl: doc.downloadUrl ? addBaseUrl(doc.downloadUrl) : undefined,
  }));

  return (
    <Layout title="RMC Software Documentation" description="Documentation for RMC Software Packages">
      <main>
        <div className="title-container">
          <ThemedImage
            alt="LifeSim"
            sources={{
              light: addBaseUrl('img/LifeSim.png'),
              dark: addBaseUrl('img/LifeSim.png'),
            }}
          />
          <div className="text-container">
            <h1 className="text-title">LifeSim</h1>
            <p className="text-description">Agent-based life loss and damage estimation for flood events</p>
          </div>
        </div>
        <ContentBox contentData={lifeSimData} />
      </main>
    </Layout>
  );
}
