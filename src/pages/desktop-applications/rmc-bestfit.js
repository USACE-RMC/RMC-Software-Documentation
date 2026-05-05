import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import { useEffect, useState } from 'react';
import ContentBox from '../../components/ContentBox';
import { filterByCategoryAndSoftware } from '../../docConfig';
import '../../css/custom.css';

const ICON = 'img/BestFit.png';

const bestFitData = filterByCategoryAndSoftware('desktop-applications', 'rmc-bestfit').map((doc) => ({
  ...doc,
  icon: ICON,
  preserveIconColor: true,
}));

export const bestFitDocs = bestFitData;

export default function BestFit() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    fetch('/RMC-Software-Documentation/versions/latestVersions.json')
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error('Error loading latest versions:', error));
  }, []);

  const bestFitData = bestFitDocs.map((doc) => ({
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
            alt="BestFit"
            sources={{
              light: addBaseUrl('img/BestFit.png'),
              dark: addBaseUrl('img/BestFit.png'),
            }}
          />
          <div className="text-container">
            <h1 className="text-title">RMC BestFit</h1>
            <p className="text-description">Bayesian flood frequency estimation and hazard analysis</p>
          </div>
        </div>
        <ContentBox contentData={bestFitData} />
      </main>
    </Layout>
  );
}
