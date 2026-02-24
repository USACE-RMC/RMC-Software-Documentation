import Layout from '@theme/Layout';
import TableChangelog from '../components/TableChangelog';
import '../css/custom.css';

export default function Changelog() {
  return (
    <Layout title="Changelog" description="Recent changes and updates to the RMC Software Documentation site.">
      <main className="container margin-vert--lg">
        <h1>Changelog</h1>
        <p>
          This page documents changes to the RMC Software Documentation website, including new document additions, version updates, and site
          improvements. For detailed version histories of individual documents, see the Version History page within each document.
        </p>

        <h2>2025</h2>
        <TableChangelog
          dates={[
            'March 2025',
            'March 2025',
            'January 2025',
          ]}
          categories={[
            'Version Update',
            'New Document',
            'Website Update',
          ]}
          documents={[
            'Typical Event Tree Database',
            'Levee Screening Tool User\u2019s Guide',
            'RMC Software Documentation Site',
          ]}
          descriptions={[
            'Published Typical Event Tree Database v1.5.',
            'Published Levee Screening Tool (LST) User\u2019s Guide v1.0.',
            'Launched the RMC Software Documentation website.',
          ]}
        />
      </main>
    </Layout>
  );
}
