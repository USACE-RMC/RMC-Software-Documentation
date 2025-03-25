import React from "react";
import Layout from "@theme/Layout";
import "../../css/index.css";
import ContentBox from "../../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl"; // Correct import

export default function BestFit() {
  const bestFitData = [
    {
      icon: addBaseUrl("img/BestFit.png"),
      doc_location: addBaseUrl(
        "docs/desktop-applications/rmc-bestfit/users-guide/users-guide"
      ),
      doc_name: "RMC BestFit Users Guide",
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
          <img src="../img/BestFit.png"></img>
          <div className="text-container">
            <p className="text-title">RMC BestFit</p>
            <p className="text-description">RMC BestFit</p>
          </div>
        </div>
        <ContentBox contentData={bestFitData} />
      </main>
    </Layout>
  );
}
