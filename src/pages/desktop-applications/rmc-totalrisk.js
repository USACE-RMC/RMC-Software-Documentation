import React from "react";
import Layout from "@theme/Layout";
import "../../css/index.css";
import ContentBox from "../../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl"; // Correct import

export default function TotalRisk() {
  const totalRiskData = [
    {
      icon: addBaseUrl("img/TotalRisk.png"),
      doc_location: addBaseUrl(
        "docs/desktop-applications/rmc-totalrisk/users-guide"
      ),
      doc_name: "RMC TotalRisk Users Guide",
      active: true,
    },
    {
      icon: addBaseUrl("img/TotalRisk.png"),
      doc_location: addBaseUrl(
        "docs/desktop-applications/rmc-totalrisk/applications-guide/applications-guide"
      ),
      doc_name: "RMC TotalRisk Applications Guide",
      active: true,
    },
    {
      icon: addBaseUrl("img/TotalRisk.png"),
      doc_location: addBaseUrl(
        "docs/desktop-applications/rmc-totalrisk/vertification-report/verification-report"
      ),
      doc_name: "RMC TotalRisk Verification Report",
      active: true,
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
          <img src="../img/TotalRisk.png"></img>
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
