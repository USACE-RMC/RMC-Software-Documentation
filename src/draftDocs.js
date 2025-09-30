import { lifeSimDocs } from './pages/desktop-applications/lifesim';
import { bestFitDocs } from './pages/desktop-applications/rmc-bestfit';
import { RFADocs } from './pages/desktop-applications/rmc-rfa';
import { totalRiskDocs } from './pages/desktop-applications/rmc-totalrisk';
import { internalErosionSuiteDocs } from './pages/toolboxes/internal-erosion-suite';
import { overtoppingSuiteDocs } from './pages/toolboxes/overtopping-suite';
import { riskCalculationsSuiteDocs } from './pages/toolboxes/risk-calculations-suite';
import { seismicHazardSuiteDocs } from './pages/toolboxes/seismic-hazard-suite';
import { dstDocs } from './pages/web-applications/dst';
import { lstDocs } from './pages/web-applications/lst';
import { rrftDocs } from './pages/web-applications/rrft';
// import { otherCategoryDocs } from "./pages/toolboxes/other-category"; // Add more as needed

const allDocs = [
  ...internalErosionSuiteDocs,
  ...riskCalculationsSuiteDocs,
  ...seismicHazardSuiteDocs,
  ...overtoppingSuiteDocs,
  ...lifeSimDocs,
  ...bestFitDocs,
  ...RFADocs,
  ...totalRiskDocs,
  ...dstDocs,
  ...lstDocs,
  ...rrftDocs,
  // ...otherCategoryDocs,
];

export const draftDocs = allDocs
  .filter((doc) => doc.draft)
  .map((doc) => doc.doc_location)
  .filter(Boolean);
