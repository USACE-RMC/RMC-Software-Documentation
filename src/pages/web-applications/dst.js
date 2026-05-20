import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import { useEffect, useState } from 'react';
import ContentBox from '../../components/ContentBox';
import DSTIcon from '../../components/icons/DSTIcon';
import { filterByCategoryAndSoftware } from '../../docConfig';
import '../../css/custom.css';

const dstData = filterByCategoryAndSoftware('web-applications', 'dst').map((doc) => ({
  ...doc,
  IconComponent: DSTIcon,
}));

export const dstDocs = dstData;

export default function DST() {
  const latestVersionsUrl = addBaseUrl('versions/latestVersions.json');
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    fetch(latestVersionsUrl)
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error('Error loading latest versions:', error));
  }, [latestVersionsUrl]);

  const dstData = dstDocs.map((doc) => ({
    ...doc,
    doc_location: addBaseUrl(`docs/${doc.doc_location}/${latestVersions[doc.doc_location.replace(/^docs\//, '')]}/preface`),
  }));

  return (
    <Layout title="RMC Software Documentation" description="Documentation for RMC Software Packages">
      <main>
        <div className="title-container">
          <DSTIcon className="h-[80px] w-[80px] text-ifm-primary" />
          <div className="text-container">
            <h1 className="text-title">Dam Screening Tool</h1>
            <p className="text-description">Dam Screening Tool</p>
          </div>
        </div>
        <ContentBox contentData={dstData} />
      </main>
    </Layout>
  );
}
