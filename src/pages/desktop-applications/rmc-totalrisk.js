import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import "../../css/index.css";
import ContentBox from "../../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

export default function TotalRisk() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    // Fetch the latestVersions JSON file
    fetch("/RMC-Software-Documentation/versions/latestVersions.json")
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error("Error loading latest versions:", error));
  }, []);

  // Create the list of documents dynamically
  const totalRiskData = [
    {
      icon: addBaseUrl("img/TotalRisk.png"),
      doc_location: addBaseUrl(
        `docs/desktop-applications/rmc-totalrisk/users-guide/${latestVersions["desktop-applications/rmc-totalrisk/users-guide"]}/preface`
      ),
      doc_name: "RMC TotalRisk Users Guide",
      active: true,
    },
    {
      icon: addBaseUrl("img/TotalRisk.png"),
      doc_location: addBaseUrl(
        `docs/desktop-applications/rmc-totalrisk/applications-guide/${latestVersions["desktop-applications/rmc-totalrisk/applications-guide"]}/preface`
      ),
      doc_name: "RMC TotalRisk Applications Guide",
      active: true,
    },
    {
      icon: addBaseUrl("img/TotalRisk.png"),
      doc_location: addBaseUrl(
        `docs/desktop-applications/rmc-totalrisk/vertification-report/${latestVersions["desktop-applications/rmc-totalrisk/verification-report"]}/verification-report`
      ),
      doc_name: "RMC TotalRisk Verification Report",
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
          <div className="title-container-nav-link">
            <Link to={`${addBaseUrl("desktop-applications")}`}>
              &larr; Desktop Applications
            </Link>
          </div>
          <img src={addBaseUrl("img/TotalRisk.png")}></img>
          <div className="text-container">
            <p className="text-title">RMC TotalRisk</p>
            <p className="text-description">RMC TotalRisk</p>
          </div>
        </div>
        <ContentBox contentData={totalRiskData} />
      </main>
    </Layout>
  );
}
