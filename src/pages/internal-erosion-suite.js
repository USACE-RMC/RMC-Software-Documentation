import React from "react";
import Layout from "@theme/Layout";
import "../css/index.css";
import ContentBox from "../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl"; // Correct import

export default function InternalErosionSuite() {
  const internalErosionSuite = [
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl(
        "docs/toolbox-technical-manuals/backward-erosion-piping-initiation/introduction"
      ),
      doc_name: "Backward Erosion Piping (Initiation) Toolbox Technical Manual",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl(
        "docs/toolbox-technical-manuals/backward-erosion-piping-progression/introduction"
      ),
      doc_name:
        "Backward Erosion Piping (Progression) Toolbox Technical Manual",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl(
        "docs/toolbox-technical-manuals/breach/introduction"
      ),
      doc_name: "Breach Toolbox Technical Manual",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl(
        "docs/toolbox-technical-manuals/concentrated-leak-erosion-cracking/introduction"
      ),
      doc_name: "Concentrated Leak Erosion (Cracking) Toolbox Technical Manual",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl(
        "docs/toolbox-technical-manuals/concentrated-leak-erosion-initiation/introduction"
      ),
      doc_name:
        "Concentrated Leak Erosion (Initiation) Toolbox Technical Manual",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl(
        "docs/toolbox-technical-manuals/erodibility-parameters/introduction"
      ),
      doc_name: "Erodibility Parameters Toolbox Technical Manual",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl(
        "docs/toolbox-technical-manuals/filter-evaluation-continuation/introduction"
      ),
      doc_name: "Filter Evaluation (Continuation) Toolbox Technical Manual",
      active: true,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl(
        "docs/toolbox-technical-manuals/internal-instability/introduction"
      ),
      doc_name: "Internal Instability Toolbox Technical Manual",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl(
        "docs/toolbox-technical-manuals/pipe-service-life/introduction"
      ),
      doc_name: "Pipe Service Life (Flaw) Toolbox Technical Manual",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl(
        "docs/toolbox-technical-manuals/soil-classification/introduction"
      ),
      doc_name: "Soil Classification Toolbox Technical Manual",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl(
        "docs/toolbox-technical-manuals/soil-contact-erosion-initiation/introduction"
      ),
      doc_name: "Soil Contact Erosion (Initiation) Toolbox Technical Manual",
      active: false,
    },
  ];

  return (
    <Layout
      title="RMC Software Documentation"
      description="Documentation for RMC Software Packages"
    >
      <main>
        <div className="header-container">
          <h1>RMC Software Documentation</h1>
        </div>
        <ContentBox
          title="Internal Erosion Suite"
          contentData={internalErosionSuite}
        />
      </main>
    </Layout>
  );
}
