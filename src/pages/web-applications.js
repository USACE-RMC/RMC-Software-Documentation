import { Redirect } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function WebApps() {
  return <Redirect to={useBaseUrl('/')} />;
}
