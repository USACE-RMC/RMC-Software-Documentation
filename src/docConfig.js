/**
 * Central source of truth for document status flags.
 *
 * This file is consumed by both the React app (landing pages) and the build
 * scripts (sidebars, versions, counters, report-map, docusaurus.config.js).
 * It is therefore written in CommonJS so Node scripts can `require()` it
 * directly without a transpile step.
 *
 * Each entry describes one document tile shown on a landing page. The
 * `category` and `software` fields are used by landing pages to filter the
 * list; the `active` and `draft` flags drive build inclusion, search
 * indexing, landing-page tile state, and the draft watermark.
 *
 * Active flag (controls site presence):
 *   active: true  → doc is built, served, sidebar-registered, and indexed by Algolia.
 *   active: false → doc is NOT included in the prod build (no static HTML, no
 *                   sidebar, no Algolia entry). Landing-page renders a
 *                   "Coming Soon" tile. In dev (DOCS_MODE=dev) the doc is
 *                   built so contributors can work on it freely.
 *
 * Draft flag (controls watermark only):
 *   draft: true   → DRAFT watermark renders on the latest version of the doc.
 *   draft: false  → no watermark.
 *
 * The two flags are orthogonal. A doc may be active+draft (published draft
 * with watermark, fully searchable) or inactive+draft (unpublished, no
 * watermark visible because the doc isn't on the prod site).
 *
 * Download-only entries (downloadUrl, no doc_location) are tiles that link
 * directly to a PDF — they have no associated MDX folder and are unaffected
 * by the active/draft build-inclusion logic.
 */

const docs = [
  // --- Desktop Applications: LifeSim ---
  {
    category: 'desktop-applications',
    software: 'lifesim',
    doc_location: 'desktop-applications/lifesim/users-guide',
    doc_name: "LifeSim User's Guide",
    active: true,
    draft: false,
  },
  {
    category: 'desktop-applications',
    software: 'lifesim',
    doc_location: 'desktop-applications/lifesim/technical-reference-manual',
    doc_name: 'LifeSim Technical Reference Manual',
    active: true,
    draft: false,
  },
  {
    category: 'desktop-applications',
    software: 'lifesim',
    doc_location: 'desktop-applications/lifesim/applications-guide',
    doc_name: 'LifeSim Applications Guide',
    active: true,
    draft: true,
  },
  {
    category: 'desktop-applications',
    software: 'lifesim',
    doc_location: 'desktop-applications/lifesim/validation-studies',
    doc_name: 'LifeSim Validation Studies',
    active: true,
    draft: false,
  },

  // --- Desktop Applications: RMC TotalRisk ---
  {
    category: 'desktop-applications',
    software: 'rmc-totalrisk',
    doc_location: 'desktop-applications/rmc-totalrisk/users-guide',
    doc_name: 'RMC TotalRisk Users Guide',
    active: true,
    draft: false,
  },
  {
    category: 'desktop-applications',
    software: 'rmc-totalrisk',
    doc_location: 'desktop-applications/rmc-totalrisk/verification-report',
    doc_name: 'RMC TotalRisk Verification Report',
    active: true,
    draft: true,
    downloadUrl: '/source-documents/desktop-applications/rmc-totalrisk/verification-report/RMC-TotalRisk-Verification-Report.pdf',
  },
  {
    category: 'desktop-applications',
    software: 'rmc-totalrisk',
    doc_name: 'RMC TotalRisk Technical Reference Manual',
    active: true,
    draft: true,
    downloadUrl: '/source-documents/desktop-applications/rmc-totalrisk/technical-reference-manual/RMC-TotalRisk-Technical-Reference-Manual.pdf',
  },
  {
    category: 'desktop-applications',
    software: 'rmc-totalrisk',
    doc_location: 'desktop-applications/rmc-totalrisk/applications-guide',
    doc_name: 'RMC TotalRisk Applications Guide',
    active: false,
    draft: true,
  },

  // --- Desktop Applications: RMC RFA ---
  {
    category: 'desktop-applications',
    software: 'rmc-rfa',
    doc_location: 'desktop-applications/rmc-rfa/users-guide',
    doc_name: 'RMC RFA Users Guide',
    active: true,
    draft: false,
  },

  // --- Desktop Applications: RMC BestFit ---
  {
    category: 'desktop-applications',
    software: 'rmc-bestfit',
    doc_location: 'desktop-applications/rmc-bestfit/users-guide',
    doc_name: 'RMC BestFit Users Guide',
    active: true,
    draft: false,
  },
  {
    category: 'desktop-applications',
    software: 'rmc-bestfit',
    doc_name: 'RMC-BestFit Verification Report',
    active: true,
    draft: false,
    downloadUrl: '/source-documents/desktop-applications/rmc-bestfit/verification-report/RMC-BestFit-Verification-Report.pdf',
  },

  // --- Toolboxes: Internal Erosion Suite ---
  {
    category: 'toolboxes',
    software: 'internal-erosion-suite',
    doc_location: 'toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-initiation',
    doc_name: 'Backward Erosion Piping (Initiation) Toolbox Technical Manual',
    active: true,
    draft: false,
  },
  {
    category: 'toolboxes',
    software: 'internal-erosion-suite',
    doc_location: 'toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression',
    doc_name: 'Backward Erosion Piping (Progression) Toolbox Technical Manual',
    active: true,
    draft: false,
  },
  {
    category: 'toolboxes',
    software: 'internal-erosion-suite',
    doc_location: 'toolbox-technical-manuals/internal-erosion-suite/breach',
    doc_name: 'Breach Toolbox Technical Manual',
    active: true,
    draft: false,
  },
  {
    category: 'toolboxes',
    software: 'internal-erosion-suite',
    doc_location: 'toolbox-technical-manuals/internal-erosion-suite/concentrated-leak-erosion-cracking',
    doc_name: 'Concentrated Leak Erosion (Cracking) Toolbox Technical Manual',
    active: false,
    draft: true,
  },
  {
    category: 'toolboxes',
    software: 'internal-erosion-suite',
    doc_location: 'toolbox-technical-manuals/internal-erosion-suite/concentrated-leak-erosion-initiation',
    doc_name: 'Concentrated Leak Erosion (Initiation) Toolbox Technical Manual',
    active: true,
    draft: false,
  },
  {
    category: 'toolboxes',
    software: 'internal-erosion-suite',
    doc_location: 'toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation',
    doc_name: 'Filter Evaluation (Continuation) Toolbox Technical Manual',
    active: true,
    draft: false,
  },
  {
    category: 'toolboxes',
    software: 'internal-erosion-suite',
    doc_location: 'toolbox-technical-manuals/internal-erosion-suite/internal-instability',
    doc_name: 'Internal Instability Toolbox Technical Manual',
    active: true,
    draft: false,
  },
  {
    category: 'toolboxes',
    software: 'internal-erosion-suite',
    doc_location: 'toolbox-technical-manuals/internal-erosion-suite/pipe-service-life',
    doc_name: 'Pipe Service Life (Flaw) Toolbox Technical Manual',
    active: true,
    draft: false,
  },
  {
    category: 'toolboxes',
    software: 'internal-erosion-suite',
    doc_location: 'toolbox-technical-manuals/internal-erosion-suite/soil-contact-erosion-initiation',
    doc_name: 'Soil Contact Erosion (Initiation) Toolbox Technical Manual',
    active: true,
    draft: false,
  },

  // --- Toolboxes: Overtopping Suite ---
  {
    category: 'toolboxes',
    software: 'overtopping-suite',
    doc_location: 'toolbox-technical-manuals/overtopping-suite/riprap-stability',
    doc_name: 'Riprap Stability Toolbox Technical Manual',
    active: false,
    draft: true,
  },
  {
    category: 'toolboxes',
    software: 'overtopping-suite',
    doc_location: 'toolbox-technical-manuals/overtopping-suite/wave-overtopping',
    doc_name: 'Wave Overtopping Toolbox Technical Manual',
    active: false,
    draft: true,
  },
  {
    category: 'toolboxes',
    software: 'overtopping-suite',
    doc_location: 'toolbox-technical-manuals/overtopping-suite/scour-behind-floodwalls',
    doc_name: 'Scour Behind Floodwalls Toolbox Technical Manual',
    active: false,
    draft: true,
  },
  {
    category: 'toolboxes',
    software: 'overtopping-suite',
    doc_location: 'toolbox-technical-manuals/overtopping-suite/overtopping-erosion-toolbox-notes',
    doc_name: 'Overtopping Erosion Toolbox User Notes',
    active: true,
    draft: false,
  },

  // --- Toolboxes: Risk Calculations Suite ---
  {
    category: 'toolboxes',
    software: 'risk-calculations-suite',
    doc_location: 'toolbox-technical-manuals/risk-calculations-suite/typical-event-tree-database',
    doc_name: 'Typical Event Tree Database',
    active: true,
    draft: false,
  },
  {
    category: 'toolboxes',
    software: 'risk-calculations-suite',
    doc_location: 'toolbox-technical-manuals/risk-calculations-suite/sqra-calcs',
    doc_name: 'SQRAcalcs Toolbox Technical Manual',
    active: false,
    draft: true,
  },
  {
    category: 'toolboxes',
    software: 'risk-calculations-suite',
    doc_location: 'toolbox-technical-manuals/risk-calculations-suite/event-combination',
    doc_name: 'Event Combination Toolbox Technical Manual',
    active: false,
    draft: true,
  },
  {
    category: 'toolboxes',
    software: 'risk-calculations-suite',
    doc_location: 'toolbox-technical-manuals/risk-calculations-suite/risk-management-plans',
    doc_name: 'Risk Management Plans Toolbox Technical Manual',
    active: false,
    draft: true,
  },

  // --- Toolboxes: Seismic Hazard Suite ---
  {
    category: 'toolboxes',
    software: 'seismic-hazard-suite',
    doc_location: 'toolbox-technical-manuals/seismic-hazard-suite/site-classification',
    doc_name: 'Site Classification Toolbox Technical Manual',
    active: true,
    draft: false,
  },
  {
    category: 'toolboxes',
    software: 'seismic-hazard-suite',
    doc_location: 'toolbox-technical-manuals/seismic-hazard-suite/seismic-hazard-curves',
    doc_name: 'Seismic Hazard Curves Toolbox Technical Manual',
    active: true,
    draft: false,
  },

  // --- Web Applications and Services: DST ---
  {
    category: 'web-applications',
    software: 'dst',
    doc_location: 'web-applications/dst/users-guide',
    doc_name: "Dam Screening Tool User's Guide",
    active: false,
    draft: true,
  },
  {
    category: 'web-applications',
    software: 'dst',
    doc_location: 'web-applications/dst/technical-reference-manual',
    doc_name: 'Dam Screening Tool Technical Reference Manual',
    active: false,
    draft: true,
  },
  {
    category: 'web-applications',
    software: 'dst',
    doc_location: 'web-applications/dst/applications-guide',
    doc_name: 'Dam Screening Tool Applications Guide',
    active: false,
    draft: true,
  },

  // --- Web Applications and Services: System Response Library ---
  {
    category: 'web-applications',
    software: 'system-response',
    doc_location: 'web-applications/system-response/overtopping-erosion-screening',
    doc_name: 'Overtopping Erosion Screening Technical Reference Manual',
    active: false,
    draft: true,
  },
  {
    category: 'web-applications',
    software: 'system-response',
    doc_location: 'web-applications/system-response/backward-erosion-piping-screening',
    doc_name: 'Backward Erosion Piping Screening Technical Reference Manual',
    active: false,
    draft: true,
  },
  {
    category: 'web-applications',
    software: 'system-response',
    doc_location: 'web-applications/system-response/continuation-screening',
    doc_name: 'Continuation (Filter Evaluation) Screening Technical Reference Manual',
    active: false,
    draft: true,
  },
  {
    category: 'web-applications',
    software: 'system-response',
    doc_location: 'web-applications/system-response/cle-common-methods-screening',
    doc_name: 'Concentrated Leak Erosion Common Methods Screening Technical Reference Manual',
    active: false,
    draft: true,
  },
  {
    category: 'web-applications',
    software: 'system-response',
    doc_location: 'web-applications/system-response/cle-cross-valley-settlement-screening',
    doc_name: 'CLE Cross-Valley Settlement Screening Technical Reference Manual',
    active: false,
    draft: true,
  },
  {
    category: 'web-applications',
    software: 'system-response',
    doc_location: 'web-applications/system-response/cle-wall-cliff-settlement-screening',
    doc_name: 'CLE Wall/Cliff Settlement Screening Technical Reference Manual',
    active: false,
    draft: true,
  },
  {
    category: 'web-applications',
    software: 'system-response',
    doc_location: 'web-applications/system-response/cle-core-compaction-screening',
    doc_name: 'Concentrated Leak Erosion Core Compaction Screening Technical Reference Manual',
    sidebar_label: 'Concentrated Leak Erosion Core Compaction Screening',
    active: true,
    draft: true,
  },
  {
    category: 'web-applications',
    software: 'system-response',
    doc_location: 'web-applications/system-response/cle-conduit-compaction-screening',
    doc_name: 'CLE Conduit Compaction Screening Technical Reference Manual',
    active: false,
    draft: true,
  },
  {
    category: 'web-applications',
    software: 'system-response',
    doc_location: 'web-applications/system-response/cle-wall-cliff-compaction-screening',
    doc_name: 'CLE Wall/Cliff Compaction Screening Technical Reference Manual',
    active: false,
    draft: true,
  },
  {
    category: 'web-applications',
    software: 'system-response',
    doc_location: 'web-applications/system-response/cle-foundation-abutment-compaction-screening',
    doc_name: 'CLE Foundation/Abutment Compaction Screening Technical Reference Manual',
    active: false,
    draft: true,
  },
  {
    category: 'web-applications',
    software: 'system-response',
    doc_location: 'web-applications/system-response/cle-desiccation-screening',
    doc_name: 'CLE Desiccation Screening Technical Reference Manual',
    active: false,
    draft: true,
  },
  {
    category: 'web-applications',
    software: 'system-response',
    doc_location: 'web-applications/system-response/cle-freezing-screening',
    doc_name: 'CLE Freezing Screening Technical Reference Manual',
    active: false,
    draft: true,
  },
  {
    category: 'web-applications',
    software: 'system-response',
    doc_location: 'web-applications/system-response/gravity-dam-stability-screening',
    doc_name: 'Gravity Dam Stability Screening Technical Reference Manual',
    active: false,
    draft: true,
  },
  {
    category: 'web-applications',
    software: 'system-response',
    doc_location: 'web-applications/system-response/verification-report',
    doc_name: 'System Response Library Verification Report',
    active: false,
    draft: true,
  },
  {
    category: 'web-applications',
    software: 'system-response',
    doc_location: 'web-applications/system-response/integration-guide',
    doc_name: 'System Response Library Integration Guide',
    active: false,
    draft: true,
  },

  // --- Web Applications and Services: LST ---
  {
    category: 'web-applications',
    software: 'lst',
    doc_location: 'web-applications/lst/users-guide',
    doc_name: 'Levee Screening Tool Users Guide',
    active: false,
    draft: true,
  },

  // --- Web Applications and Services: RRFT ---
  {
    category: 'web-applications',
    software: 'rrft',
    doc_location: 'web-applications/rrft/users-guide',
    doc_name: 'RRFT Users Guide',
    active: false,
    draft: true,
  },
];

function filterByCategoryAndSoftware(category, software) {
  return docs.filter((doc) => doc.category === category && doc.software === software);
}

function hasActiveDocs(category, software) {
  return docs.some((doc) => doc.category === category && doc.software === software && doc.active === true);
}

function getInactiveDocLocations() {
  return docs.filter((doc) => doc.active === false && doc.doc_location).map((doc) => doc.doc_location);
}

function getDraftDocLocations() {
  return docs.filter((doc) => doc.draft === true && doc.doc_location).map((doc) => doc.doc_location);
}

// Used by build scripts to decide whether a docs-relative path (e.g.
// "web-applications/lst/users-guide" or any nested file under it) should be
// excluded from the prod build. In dev (DOCS_MODE !== 'prod'), nothing is
// excluded — contributors can work on inactive docs freely.
function shouldExcludeFromBuild(docsRelativePath) {
  if (process.env.DOCS_MODE !== 'prod') return false;
  const normalized = String(docsRelativePath).replace(/\\/g, '/').replace(/^\/+/, '');
  return getInactiveDocLocations().some((loc) => normalized === loc || normalized.startsWith(loc + '/'));
}

module.exports = {
  docs,
  filterByCategoryAndSoftware,
  hasActiveDocs,
  getInactiveDocLocations,
  getDraftDocLocations,
  shouldExcludeFromBuild,
};
