import { Redirect } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Toolboxes() {
  return <Redirect to={useBaseUrl('/')} />;
}
