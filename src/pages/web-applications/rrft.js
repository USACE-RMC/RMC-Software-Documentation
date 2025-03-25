import React from "react";
import Layout from "@theme/Layout";
import "../../css/index.css";
import ContentBox from "../../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl"; // Correct import

export default function RRFT() {
  const rrftData = [
    {
      icon: addBaseUrl("img/WebApp.png"),
      doc_location: addBaseUrl(
        "docs/web-applications/rrft/users-guide/users-guide"
      ),
      doc_name: "RRFT Users Guide",
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
          <img src="../img/WebAppFilled.png"></img>
          <div className="text-container">
            <p className="text-title">Rainfall Runoff Frequency Tool</p>
            <p className="text-description">Rainfall Runoff Frequency Tool</p>
          </div>
        </div>
        <ContentBox contentData={rrftData} />
      </main>
    </Layout>
  );
}
