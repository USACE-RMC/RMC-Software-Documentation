import Layout from '@theme/Layout';
import TableChangelog from '../components/TableChangelog';
import '../css/custom.css';

export default function Changelog() {
  return (
    <Layout title="Change Log" description="Recent changes and updates to the RMC Software Documentation site.">
      <main className="margin-vert--lg container">
        <div className="markdown">
          <h1>Change Log</h1>
          <TableChangelog
            dates={['February 2026']}
            categories={['Website Update']}
            documents={['-']}
            versions={['-']}
            descriptions={['Initial launch of the RMC Software Documentation website.']}
          />
        </div>
      </main>
    </Layout>
  );
}
