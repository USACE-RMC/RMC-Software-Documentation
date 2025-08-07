import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import "../../css/custom.css";
import ContentBox from "../../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

// Create the list of documents dynamically
const internalErosionSuite = [
  {
    icon: "img/Toolbox.png",
    doc_location: `toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-initiation`,
    doc_name: "Backward Erosion Piping (Initiation) Toolbox Technical Manual",
    active: false,
    draft: true,
  },
  {
    icon: "img/Toolbox.png",
    doc_location:
      "toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression",
    doc_name: "Backward Erosion Piping (Progression) Toolbox Technical Manual",
    active: true,
    draft: true,
  },
  {
    icon: "img/Toolbox.png",
    doc_location: `toolbox-technical-manuals/internal-erosion-suite/breach`,
    doc_name: "Breach Toolbox Technical Manual",
    active: false,
    draft: true,
  },
  {
    icon: "img/Toolbox.png",
    doc_location: `toolbox-technical-manuals/internal-erosion-suite/concentrated-leak-erosion-cracking`,
    doc_name: "Concentrated Leak Erosion (Cracking) Toolbox Technical Manual",
    active: false,
    draft: true,
  },
  {
    icon: "img/Toolbox.png",
    doc_location: `toolbox-technical-manuals/internal-erosion-suite/concentrated-leak-erosion-initiation`,
    doc_name: "Concentrated Leak Erosion (Initiation) Toolbox Technical Manual",
    active: false,
    draft: true,
  },
  {
    icon: "img/Toolbox.png",
    doc_location: `toolbox-technical-manuals/internal-erosion-suite/erodibility-parameters`,
    doc_name: "Erodibility Parameters Toolbox Technical Manual",
    active: false,
    draft: true,
  },
  {
    icon: "img/Toolbox.png",
    doc_location: `toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation`,
    doc_name: "Filter Evaluation (Continuation) Toolbox Technical Manual",
    active: true,
    draft: true,
  },
  {
    icon: "img/Toolbox.png",
    doc_location: `toolbox-technical-manuals/internal-erosion-suite/hydraulic-fracture`,
    doc_name: "Hydraulic Fracture Toolbox Technical Manual",
    active: false,
    draft: true,
  },
  {
    icon: "img/Toolbox.png",
    doc_location: `toolbox-technical-manuals/internal-erosion-suite/internal-instability`,
    doc_name: "Internal Instability Toolbox Technical Manual",
    active: false,
    draft: true,
  },
  {
    icon: "img/Toolbox.png",
    doc_location: `toolbox-technical-manuals/internal-erosion-suite/pipe-service-life`,
    doc_name: "Pipe Service Life (Flaw) Toolbox Technical Manual",
    active: false,
    draft: true,
  },
  {
    icon: "img/Toolbox.png",
    doc_location: `toolbox-technical-manuals/internal-erosion-suite/soil-classification`,
    doc_name: "Soil Classification Toolbox Technical Manual",
    active: false,
    draft: true,
  },
  {
    icon: "img/Toolbox.png",
    doc_location: `toolbox-technical-manuals/internal-erosion-suite/soil-contact-erosion-initiation`,
    doc_name: "Soil Contact Erosion (Initiation) Toolbox Technical Manual",
    active: true,
    draft: true,
  },
];

export const internalErosionSuiteDocs = internalErosionSuite;

export default function InternalErosionSuite() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    fetch("/RMC-Software-Documentation/versions/latestVersions.json")
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error("Error loading latest versions:", error));
  }, []);

  const internalErosionSuite = internalErosionSuiteDocs.map((doc) => ({
    ...doc,
    icon: addBaseUrl(doc.icon),
    doc_location: addBaseUrl(
      `docs/${doc.doc_location}/${
        latestVersions[doc.doc_location.replace(/^docs\//, "")]
      }/preface`
    ),
  }));

  return (
    <Layout
      title="RMC Software Documentation"
      description="Documentation for RMC Software Packages"
    >
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
            <p className="text-title">Internal Erosion Suite</p>
            <p className="text-description">RMC Toolboxes</p>
          </div>
        </div>
        <ContentBox contentData={internalErosionSuite} />
      </main>
    </Layout>
  );
}
