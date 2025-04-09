import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import "../../css/index.css";
import ContentBox from "../../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl";

export default function InternalErosionSuite() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    // Fetch the latestVersions JSON file
    fetch("/RMC-Software-Documentation/versions/latestVersions.json")
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error("Error loading latest versions:", error));
  }, []);

  // Create the list of documents dynamically
  const internalErosionSuite = [
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl(
        `docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-initiation/${latestVersions["toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-initiation"]}/introduction`
      ),
      doc_name: "Backward Erosion Piping (Initiation) Toolbox Technical Manual",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl(
        `docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/${latestVersions["toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression"]}/introduction`
      ),
      doc_name:
        "Backward Erosion Piping (Progression) Toolbox Technical Manual",
      active: true,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl(
        `docs/toolbox-technical-manuals/internal-erosion-suite/breach/${latestVersions["toolbox-technical-manuals/internal-erosion-suite/breach"]}/introduction`
      ),
      doc_name: "Breach Toolbox Technical Manual",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl(
        `docs/toolbox-technical-manuals/internal-erosion-suite/concentrated-leak-erosion-cracking/${latestVersions["toolbox-technical-manuals/internal-erosion-suite/concentrated-leak-erosion-cracking"]}/introduction`
      ),
      doc_name: "Concentrated Leak Erosion (Cracking) Toolbox Technical Manual",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl(
        `docs/toolbox-technical-manuals/internal-erosion-suite/concentrated-leak-erosion-initiation/${latestVersions["toolbox-technical-manuals/internal-erosion-suite/concentrated-leak-erosion-initiation"]}/introduction`
      ),
      doc_name:
        "Concentrated Leak Erosion (Initiation) Toolbox Technical Manual",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl(
        `docs/toolbox-technical-manuals/internal-erosion-suite/erodibility-parameters/${latestVersions["toolbox-technical-manuals/internal-erosion-suite/erodibility-parameters"]}/introduction`
      ),
      doc_name: "Erodibility Parameters Toolbox Technical Manual",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl(
        `docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/${latestVersions["toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation"]}/introduction`
      ),
      doc_name: "Filter Evaluation (Continuation) Toolbox Technical Manual",
      active: true,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl(
        `docs/toolbox-technical-manuals/internal-erosion-suite/internal-instability/${latestVersions["toolbox-technical-manuals/internal-erosion-suite/internal-instability"]}/introduction`
      ),
      doc_name: "Internal Instability Toolbox Technical Manual",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl(
        `docs/toolbox-technical-manuals/internal-erosion-suite/pipe-service-life/${latestVersions["toolbox-technical-manuals/internal-erosion-suite/pipe-service-life"]}/introduction`
      ),
      doc_name: "Pipe Service Life (Flaw) Toolbox Technical Manual",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl(
        `docs/toolbox-technical-manuals/internal-erosion-suite/soil-classification/${latestVersions["toolbox-technical-manuals/internal-erosion-suite/soil-classification"]}/introduction`
      ),
      doc_name: "Soil Classification Toolbox Technical Manual",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl(
        `docs/toolbox-technical-manuals/internal-erosion-suite/soil-contact-erosion-initiation/${latestVersions["toolbox-technical-manuals/internal-erosion-suite/soil-contact-erosion-initiation"]}/introduction`
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
        <div className="title-container">
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
