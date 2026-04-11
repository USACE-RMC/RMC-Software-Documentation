import { Redirect } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function DesktopApps() {
  return <Redirect to={useBaseUrl('/')} />;
}
