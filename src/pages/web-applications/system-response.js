import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import { useEffect, useState } from 'react';
import ContentBox from '../../components/ContentBox';
import SystemResponseIcon from '../../components/icons/SystemResponseIcon';
import { filterByCategoryAndSoftware } from '../../docConfig';
import '../../css/custom.css';

const systemResponseData = filterByCategoryAndSoftware('web-applications', 'system-response').map((doc) => ({
  ...doc,
  IconComponent: SystemResponseIcon,
}));

export const systemResponseDocs = systemResponseData;

export default function SystemResponse() {
  const latestVersionsUrl = addBaseUrl('versions/latestVersions.json');
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    fetch(latestVersionsUrl)
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error('Error loading latest versions:', error));
  }, [latestVersionsUrl]);

  const systemResponseData = systemResponseDocs.map((doc) => ({
    ...doc,
    doc_location: addBaseUrl(`docs/${doc.doc_location}/${latestVersions[doc.doc_location.replace(/^docs\//, '')]}/preface`),
  }));

  return (
    <Layout title="RMC Software Documentation" description="Documentation for RMC Software Packages">
      <main>
        <div className="title-container">
          <SystemResponseIcon className="h-[80px] w-[80px] text-ifm-primary" />
          <div className="text-container">
            <h1 className="text-title">System Response Library</h1>
            <p className="text-description">System response models for screening-level risk analysis</p>
          </div>
        </div>
        <ContentBox contentData={systemResponseData} />
      </main>
    </Layout>
  );
}
