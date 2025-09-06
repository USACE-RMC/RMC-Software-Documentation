/**
 * Build the nested "links" structure for <SiteWrapper>.
 * Pass in useBaseUrl (hook result) and the latestVersions object.
 */
export default function buildNavLinks(useBaseUrl, latestVersions = {}) {
  const homeHref = useBaseUrl('/');
  const desktopAppHref = useBaseUrl('/desktop-applications');
  const toolboxAppHref = useBaseUrl('/toolboxes');
  const webAppHref = useBaseUrl('/web-applications');

  const totalRiskHref = useBaseUrl('/desktop-applications/rmc-totalrisk');
  const bestFitHref = useBaseUrl('/desktop-applications/rmc-bestfit');
  const rfaHref = useBaseUrl('/desktop-applications/rmc-rfa');
  const lifeSimHref = useBaseUrl('/desktop-applications/lifesim');

  const trUserGuideHref = useBaseUrl(
    `/docs/desktop-applications/rmc-totalrisk/users-guide/${latestVersions['desktop-applications/rmc-totalrisk/users-guide'] || 'v1.0'}/preface`,
  );
  const trAppHref = useBaseUrl(
    `/docs/desktop-applications/rmc-totalrisk/applications-guide/${latestVersions['desktop-applications/rmc-totalrisk/applications-guide'] || 'v1.0'}/preface`,
  );
  const trVerifHref = useBaseUrl(
    `/docs/desktop-applications/rmc-totalrisk/verification-report/${latestVersions['desktop-applications/rmc-totalrisk/verification-report'] || 'v1.0'}/preface`,
  );

  const bestFitUserGuideHref = useBaseUrl(
    `/docs/desktop-applications/rmc-bestfit/users-guide/${latestVersions['desktop-applications/rmc-bestfit/users-guide'] || 'v1.0'}/preface`,
  );

  const rfaUserGuideHref = useBaseUrl(
    `/docs/desktop-applications/rmc-rfa/users-guide/${latestVersions['desktop-applications/rmc-rfa/users-guide'] || 'v1.0'}/preface`,
  );

  const lifeSimUserGuideHref = useBaseUrl(
    `/docs/desktop-applications/lifesim/users-guide/${latestVersions['desktop-applications/lifesim/users-guide'] || 'v1.0'}/preface`,
  );
  const lifeSimValStudiesHref = useBaseUrl(
    `/docs/desktop-applications/lifesim/validation-studies/${latestVersions['desktop-applications/lifesim/validation-studies'] || 'v1.0'}/preface`,
  );

  const internalErosionHref = useBaseUrl('/toolboxes/internal-erosion-suite');
  const overtoppingHref = useBaseUrl('/toolboxes/overtopping-erosion-suite');
  const riskCalcHref = useBaseUrl('/toolboxes/risk-calculations-suite');
  const riverineHref = useBaseUrl('/toolboxes/rivering-erosion-toolbox');
  const seismicHref = useBaseUrl('/toolboxes/seismic-hazard-suite');
  const spillwayHref = useBaseUrl('/toolboxes/spillway-erosion-suite');
  const structuralHref = useBaseUrl('/toolboxes/structural-suite');

  const bepInitiationHref = useBaseUrl(
    `/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-initiation/${
      latestVersions[
        'toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-initiation'
      ] || 'v1.0'
    }/preface`,
  );
  const bepProgressionHref = useBaseUrl(
    `/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/${
      latestVersions[
        'toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression'
      ] || 'v1.0'
    }/preface`,
  );
  const cleInitiationHref = useBaseUrl(
    `/docs/toolbox-technical-manuals/internal-erosion-suite/concentrated-leak-erosion-initiation/${
      latestVersions[
        'toolbox-technical-manuals/internal-erosion-suite/concentrated-leak-erosion-initiation'
      ] || 'v1.0'
    }/preface`,
  );
  const continuationHref = useBaseUrl(
    `/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/${
      latestVersions[
        'toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation'
      ] || 'v1.0'
    }/preface`,
  );
  const internalInstabilityHref = useBaseUrl(
    `/docs/toolbox-technical-manuals/internal-erosion-suite/internal-instability/${
      latestVersions['toolbox-technical-manuals/internal-erosion-suite/internal-instability'] ||
      'v1.0'
    }/preface`,
  );
  const SCEHref = useBaseUrl(
    `/docs/toolbox-technical-manuals/internal-erosion-suite/soil-contact-erosion-initiation/${
      latestVersions[
        'toolbox-technical-manuals/internal-erosion-suite/soil-contact-erosion-initiation'
      ] || 'v1.0'
    }/preface`,
  );

  const etDatabaseHref = useBaseUrl(
    `/docs/toolbox-technical-manuals/risk-calculations-suite/typical-event-tree-database/${
      latestVersions[
        'toolbox-technical-manuals/risk-calculations-suite/typical-event-tree-database'
      ] || 'v1.0'
    }/preface`,
  );

  const siteClassHref = useBaseUrl(
    `/docs/toolbox-technical-manuals/seismic-hazard-suite/site-classification/${latestVersions['toolbox-technical-manuals/seismic-hazzard-suite/site-classification'] || 'v1.0'}/preface`,
  );
  const seismicHazardCurvesHref = useBaseUrl(
    `/docs/toolbox-technical-manuals/seismic-hazard-suite/seismic-hazard-curves/${latestVersions['toolbox-technical-manuals/seismic-hazzard-suite/seismic-hazard-curve'] || 'v1.0'}/preface`,
  );

  const rrftHref = useBaseUrl('/web-applications/rrft');
  const lstHref = useBaseUrl('/web-applications/lst');
  const dstHref = useBaseUrl('/web-applications/dst');

  return [
    { id: 'home', text: 'Home', href: homeHref },
    {
      id: 'desktop-applications',
      text: 'Desktop Applications',
      href: desktopAppHref,
      children: [
        {
          id: 'rmc-totalrisk',
          text: 'RMC-TotalRisk',
          href: totalRiskHref,
          children: [
            { id: 'tr-users-guide', text: "RMC-TotalRisk User's Guide", href: trUserGuideHref },
            // Optionally add trAppHref/trVerifHref if needed in the menu
          ],
        },
        {
          id: 'rmc-bestfit',
          text: 'RMC-BestFit',
          href: bestFitHref,
          children: [
            {
              id: 'bestfit-users-guide',
              text: "RMC-BestFit User's Guide",
              href: bestFitUserGuideHref,
            },
          ],
        },
        { id: 'rmc-rfa', text: 'RMC-RFA', href: rfaHref },
        {
          id: 'lifesim',
          text: 'LifeSim',
          href: lifeSimHref,
          children: [
            { id: 'lifesim-users-guide', text: "LifeSim User's Guide", href: lifeSimUserGuideHref },
            {
              id: 'lifesim-validation-studies',
              text: 'LifeSim Validation Studies',
              href: lifeSimValStudiesHref,
            },
          ],
        },
      ],
    },
    {
      id: 'toolboxes',
      text: 'Toolbox Technical Manuals',
      href: toolboxAppHref,
      children: [
        {
          id: 'internal-erosion-suite',
          text: 'Internal Erosion Suite',
          href: internalErosionHref,
          children: [
            {
              id: 'bep-initiation',
              text: 'Backward Erosion Piping (Initiation) Toolbox Technical Manual',
              href: bepInitiationHref,
            },
            {
              id: 'bep-progression',
              text: 'Backward Erosion Piping (Progression) Toolbox Technical Manual',
              href: bepProgressionHref,
            },
            {
              id: 'cle-initiation',
              text: 'Concentrated Leak Erosion (Initiation) Toolbox Technical Manual',
              href: cleInitiationHref,
            },
            {
              id: 'continuation',
              text: 'Filter Evaluation (Continuation) Toolbox Technical Manual',
              href: continuationHref,
            },
            {
              id: 'internal-instability',
              text: 'Internal Instability Toolbox Technical Manual',
              href: internalInstabilityHref,
            },
            {
              id: 'soil-contact-erosion',
              text: 'Soil Contact Erosion (Continuation) Toolbox Technical Manual',
              href: SCEHref,
            },
          ],
        },
        {
          id: 'risk-calculations-suite',
          text: 'Risk Calculations Suite',
          href: riskCalcHref,
          children: [
            { id: 'et-database', text: 'Typical Event Tree Database', href: etDatabaseHref },
          ],
        },
        {
          id: 'seismic-hazard-suite',
          text: 'Seismic Hazard Suite',
          href: seismicHref,
          children: [
            {
              id: 'site-classification',
              text: 'Site Classification Toolbox Technical Manual',
              href: siteClassHref,
            },
            {
              id: 'seismic-hazard-curves',
              text: 'Seismic Hazard Curves Toolbox Technical Manual',
              href: seismicHazardCurvesHref,
            },
          ],
        },
      ],
    },
    { id: 'web-applications', text: 'Web Applications', href: webAppHref },
  ];
}
