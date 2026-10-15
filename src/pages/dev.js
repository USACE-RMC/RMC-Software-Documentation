import addBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import { Hero } from '@usace/groundwork';
import ContentBoxLarge from '../components/ContentBoxLarge';
import CodeIcon from '../components/icons/CodeIcon';
import DocumentationGuideIcon from '../components/icons/DocumentationGuideIcon';
import GitHubIcon from '../components/icons/GitHubIcon';
import PythonIcon from '../components/icons/PythonIcon';
import SparkleIcon from '../components/icons/SparkleIcon';
import WebAppIcon from '../components/icons/WebAppIcon';
import '../css/custom.css';

export default function Dev() {
  const devData = [
    {
      IconComponent: CodeIcon,
      doc_name: 'RMC Development Resources',
      contentCardData: [
        {
          IconComponent: PythonIcon,
          title: 'Python Quick Start Guide',
          description: 'Python environment setup, VS Code, virtual environments, and Jupyter notebooks',
          href: addBaseUrl('docs/dev/python-quickstart-guide/introduction'),
          active: true,
        },
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
  ];

  return (
    <Layout title="Developer Resources" description="Developer documentation and references for RMC software">
      <Hero
        image={[addBaseUrl('nww-lucky-peak-dam.jpg'), addBaseUrl('taylorsville-SPPRu4Rw.jpg')]}
        alt={['Lucky Peak Dam', 'Taylorsville Dam']}
        title="RMC Software Developer Resources"
        subtitle="Internal development guides and technical references"
        imgHeight="18vh"
      />
      <main className="main-content-container">
        <ContentBoxLarge contentData={devData} />
      </main>
    </Layout>
  );
}
