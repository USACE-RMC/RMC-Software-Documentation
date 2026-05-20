import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import { useEffect, useState } from 'react';
import ContentBox from '../../components/ContentBox';
import RRFTIcon from '../../components/icons/RRFTIcon';
import { filterByCategoryAndSoftware } from '../../docConfig';
import '../../css/custom.css';

const rrftData = filterByCategoryAndSoftware('web-applications', 'rrft').map((doc) => ({
  ...doc,
  IconComponent: RRFTIcon,
}));

export const rrftDocs = rrftData;

export default function RRFT() {
  const latestVersionsUrl = addBaseUrl('versions/latestVersions.json');
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    fetch(latestVersionsUrl)
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error('Error loading latest versions:', error));
  }, [latestVersionsUrl]);

  const rrftData = rrftDocs.map((doc) => ({
    ...doc,
    doc_location: addBaseUrl(`docs/${doc.doc_location}/${latestVersions[doc.doc_location.replace(/^docs\//, '')]}/preface`),
  }));

  return (
    <Layout title="RMC Software Documentation" description="Documentation for RMC Software Packages">
      <main>
        <div className="title-container">
          <RRFTIcon className="h-[80px] w-[80px] text-ifm-primary" />
          <div className="text-container">
            <h1 className="text-title">Rainfall Runoff Frequency Tool</h1>
            <p className="text-description">Rainfall Runoff Frequency Tool</p>
          </div>
        </div>
        <ContentBox contentData={rrftData} />
      </main>
    </Layout>
  );
}
