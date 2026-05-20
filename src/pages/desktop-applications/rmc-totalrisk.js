import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import { useEffect, useState } from 'react';
import ContentBox from '../../components/ContentBox';
import { filterByCategoryAndSoftware } from '../../docConfig';
import '../../css/custom.css';

const ICON = 'img/TotalRisk.png';

const totalRiskData = filterByCategoryAndSoftware('desktop-applications', 'rmc-totalrisk').map((doc) => ({
  ...doc,
  icon: ICON,
  preserveIconColor: true,
}));

export const totalRiskDocs = totalRiskData;

export default function TotalRisk() {
  const latestVersionsUrl = addBaseUrl('versions/latestVersions.json');
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    fetch(latestVersionsUrl)
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error('Error loading latest versions:', error));
  }, [latestVersionsUrl]);

  const totalRiskData = totalRiskDocs.map((doc) => ({
    ...doc,
    icon: addBaseUrl(doc.icon),
    iconLight: addBaseUrl(doc.iconLight),
    iconDark: addBaseUrl(doc.iconDark),
    doc_location: doc.downloadUrl
      ? undefined
      : addBaseUrl(`docs/${doc.doc_location}/${latestVersions[doc.doc_location.replace(/^docs\//, '')]}/preface`),
    downloadUrl: doc.downloadUrl ? addBaseUrl(doc.downloadUrl) : undefined,
  }));

  return (
    <Layout title="RMC Software Documentation" description="Documentation for RMC Software Packages">
      <main>
        <div className="title-container">
          <ThemedImage
            alt="TotalRisk"
            sources={{
              light: addBaseUrl('img/TotalRisk.png'),
              dark: addBaseUrl('img/TotalRisk.png'),
            }}
          />
          <div className="text-container">
            <h1 className="text-title">RMC TotalRisk</h1>
            <p className="text-description">Quantitative risk analysis for dam and levee safety</p>
          </div>
        </div>
        <ContentBox contentData={totalRiskData} />
      </main>
    </Layout>
  );
}
