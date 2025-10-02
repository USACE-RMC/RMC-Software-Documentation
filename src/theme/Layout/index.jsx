import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme-original/Layout';
import SearchBar from '@theme/SearchBar';
import { SiteWrapper } from '@usace/groundwork';
import '@usace/groundwork/dist/style.css';
import { useEffect } from 'react';
import '../../css/custom.css';

import buildNavLinks from './buildNavLinks';
import externalLinks from './externalLinks';
import ThemeToggle from './ThemeToggle';
import USACELinks from './usaceLinks';
import useHeaderOffsets from './useHeaderOffsets';
import useLatestVersions from './useLatestVersions';

export default function LayoutWrapper({ children, ...rest }) {
  // Keep sticky offsets correct as the Groundwork header wraps
  useHeaderOffsets('header.gw-sticky.gw-top-0');

  // Latest versions for link building
  const latestVersions = useLatestVersions();

  // Build menu links
  const links = buildNavLinks(useBaseUrl, latestVersions);

  const homeHref = useBaseUrl('/');

  // Ensure Groundwork logo returns to base URL
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const logoAnchor = document
      .querySelector('header a[href="/"] img[alt="U.S. Army Corps of Engineers"]')
      ?.closest('a');
    if (logoAnchor && logoAnchor.getAttribute('href') !== homeHref) {
      logoAnchor.setAttribute('href', homeHref);
    }
  }, [homeHref]);

  return (
    <Layout {...rest} noNavbar noFooter>
      <SiteWrapper
        usaBanner={false}
        fluidNav={true}
        subtitle="Institute for Water Resources, Risk Management Center Website"
        links={links}
        navRight={
          <div className="ml-[20px] flex items-center gap-2">
            <ThemeToggle />
            <SearchBar />
          </div>
        }
        missionText="Deliver vital engineering solutions, in collaboration with our partners, to secure our Nation, energize our economy, and reduce disaster risk."
        aboutText="The official website of the Institute for Water Resources, Risk Management Center"
        usaceLinks={USACELinks}
        externalLinks={externalLinks}
        usaceLogo={false}
        usace250Logo={true}
      >
        {children}
      </SiteWrapper>
    </Layout>
  );
}
