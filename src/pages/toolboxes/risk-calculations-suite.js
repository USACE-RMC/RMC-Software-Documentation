import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import "../../css/custom.css";
import ContentBox from "../../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

// Create the list of documents dynamically
const riskCalculationsSuite = [
  {
    icon: "img/Toolbox.png",
    doc_location: `toolbox-technical-manuals/risk-calculations-suite/sqra-calcs`,
    doc_name: "SQRAcalcs Toolbox Technical Manual",
    active: false,
    draft: true,
  },
  {
    icon: "img/Toolbox.png",
    doc_location: `toolbox-technical-manuals/risk-calculations-suite/event-combination`,
    doc_name: "Event Combination Toolbox Technical Manual",
    active: false,
    draft: true,
  },
  {
    icon: "img/Toolbox.png",
    doc_location: `toolbox-technical-manuals/risk-calculations-suite/joint-loading-probability-dams`,
    doc_name: "Joint-Loading Probability (Dams) Toolbox Technical Manual",
    active: false,
    draft: true,
  },
  {
    icon: "img/Toolbox.png",
    doc_location: `toolbox-technical-manuals/risk-calculations-suite/risk-management-plans`,
    doc_name: "Risk Management Plans Toolbox Technical Manual",
    active: false,
    draft: true,
  },
  {
    icon: "img/Toolbox.png",
    doc_location: `toolbox-technical-manuals/risk-calculations-suite/typical-event-tree-database`,
    doc_name: "Typical Event Tree Database",
    active: true,
    draft: true,
  },
];

export const riskCalculationsSuiteDocs = riskCalculationsSuite;

export default function RiskCalculationsSuite() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    fetch("/RMC-Software-Documentation/versions/latestVersions.json")
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error("Error loading latest versions:", error));
  }, []);

  const riskCalculationsSuite = riskCalculationsSuiteDocs.map((doc) => ({
    ...doc,
    icon: addBaseUrl(doc.icon),
    doc_location: addBaseUrl(`docs/${doc.doc_location}/${latestVersions[doc.doc_location.replace(/^docs\//, "")]}/preface`),
  }));

  return (
    <Layout title="RMC Software Documentation" description="Documentation for RMC Software Packages">
      <main>
        <div className="header-container">
          <h1>RMC Software Documentation</h1>
        </div>
        <div className="title-container">
          <div className="title-container-nav-link">
            <Link to={`${addBaseUrl("toolboxes")}`}>&larr; Toolbox Suites</Link>
          </div>
          <img src={addBaseUrl("img/ToolboxFilled.png")} />
          <div className="text-container">
            <p className="text-title">Risk Calculations Suite</p>
            <p className="text-description">RMC Toolboxes</p>
          </div>
        </div>
        <ContentBox contentData={riskCalculationsSuite} />
      </main>
    </Layout>
  );
}
