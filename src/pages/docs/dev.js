import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import { Hero } from '@usace/groundwork';
import { useEffect, useState } from 'react';
import ContentBoxLarge from '../../components/ContentBoxLarge';
import CodeIcon from '../../components/icons/CodeIcon';
import DocumentationGuideIcon from '../../components/icons/DocumentationGuideIcon';
import DSTDatabaseIcon from '../../components/icons/DSTDatabaseIcon';
import GitHubIcon from '../../components/icons/GitHubIcon';
import SparkleIcon from '../../components/icons/SparkleIcon';
import WebAppIcon from '../../components/icons/WebAppIcon';
import '../../css/custom.css';

export default function Dev() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    fetch('/RMC-Software-Documentation/versions/latestVersions.json')
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error('Error loading latest versions:', error));
  }, []);

  const dstVersion = latestVersions['dev/dst/database-schema'] || 'v1.0';

  const devData = [
    {
      IconComponent: CodeIcon,
      doc_name: 'RMC Software Documentation Website Documentation Guide',
      contentCardData: [
        {
          IconComponent: DocumentationGuideIcon,
          title: 'Documentation Guide',
          description: 'Contributor guide for the RMC documentation website',
          href: addBaseUrl('docs/dev/documentation-guide/introduction'),
          active: true,
        },
      ],
    },
    {
      IconComponent: CodeIcon,
      doc_name: 'RMC Development Resources',
      contentCardData: [
        {
          IconComponent: GitHubIcon,
          title: 'GitHub Workflows SOP',
          description: 'Git branching, commits, pull requests, and code review',
          href: addBaseUrl('docs/dev/github-workflows/introduction'),
          active: true,
        },
        {
          IconComponent: SparkleIcon,
          title: 'AI Assistant Guidance',
          description: 'Guidelines for AI-assisted development workflows',
          href: addBaseUrl('docs/dev/ai-development/ai-assisted-development'),
          active: true,
        },
      ],
    },
    {
      IconComponent: CodeIcon,
      doc_name: 'RMC Web Development',
      contentCardData: [
        {
          IconComponent: WebAppIcon,
          title: 'Web Application Architecture',
          description: 'Architecture overview for RMC web applications',
          href: addBaseUrl('docs/dev/architecture/web-app-architecture'),
          active: true,
        },
      ],
    },
    {
      IconComponent: CodeIcon,
      doc_name: 'Dam Screening Tool Documents',
      contentCardData: [
        {
          IconComponent: DSTDatabaseIcon,
          title: 'DST Database Schema Reference',
          description: 'Database schema documentation for the Dam Screening Tool',
          href: addBaseUrl(`docs/dev/dst/database-schema/${dstVersion}/preface`),
          active: true,
        },
      ],
    },
  ];

  return (
    <Layout title="Developer Resources" description="Developer documentation and references for RMC software">
      <Hero
        image={[addBaseUrl('nww-lucky-peak-dam.jpg'), addBaseUrl('taylorsville-SPPRu4Rw.jpg')]}
        alt={['Lucky Peak Dam', 'Taylorsville Dam']}
        title="RMC SoftwareDeveloper Resources"
        subtitle="Internal development guides and technical references"
        imgHeight="18vh"
      />
      <main className="main-content-container">
        <ContentBoxLarge contentData={devData} />
      </main>
    </Layout>
  );
}
