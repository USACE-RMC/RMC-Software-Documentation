import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Admonition from '@theme/Admonition';

const VersionNotice = ({ documentLabel, currentVersion, latestVersion, latestPath, fallbackPath }) => {
  const history = useHistory();
  const latestHref = useBaseUrl(latestPath || '');
  const fallbackHref = useBaseUrl(fallbackPath || '');
  if (!latestVersion || !latestPath) {
    return null;
  }

  const title = documentLabel || 'this document';
  const versionText = currentVersion ? `${currentVersion}` : '';
  const handleLatestClick = async (event) => {
    event.preventDefault();
    if (!latestHref) {
      return;
    }
    try {
      const response = await fetch(latestHref, { method: 'GET' });
      if (response.ok) {
        history.push(latestPath);
      } else if (fallbackPath) {
        history.push(fallbackPath);
      }
    } catch (error) {
      if (fallbackPath) {
        history.push(fallbackPath);
      }
    }
  };

  return (
    <div className="mb-[var(--ifm-leading)]">
      <Admonition type="danger" title="Warning">
        <p className="m-0">
          This is an old version ({versionText}) of {title}. Refer to the{' '}
          <Link to={latestPath} onClick={handleLatestClick} className="text-ifm-link no-underline hover:text-ifm-link-hover hover:underline">
            latest version ({latestVersion})
          </Link>{' '}
          for the latest documentation.
        </p>
      </Admonition>
    </div>
  );
};

export default VersionNotice;
