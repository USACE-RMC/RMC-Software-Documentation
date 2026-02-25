import Layout from '@theme/Layout';
import TableChangelog from '../components/TableChangelog';

export default function Changelog() {
  return (
    <Layout title="Change Log" description="Recent changes and updates to the RMC Software Documentation site.">
      <main>
        <div className="border-b border-border-color bg-ifm-primary-lightest px-6 py-10 text-center dark:bg-surface-card">
          <div className="mx-auto max-w-[600px]">
            <h1 className="m-0 mb-3 font-usace text-h1 font-bold text-font-color">Change Log</h1>
            <p className="m-0 font-usace text-base leading-relaxed text-font-color-description">
              Recent changes and updates to the RMC Software Documentation site.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-[1600px] px-6 pb-16 pt-8 lg:px-12">
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
