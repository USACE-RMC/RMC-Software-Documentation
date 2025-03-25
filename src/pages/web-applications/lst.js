import React from "react";
import Layout from "@theme/Layout";
import "../../css/index.css";
import ContentBox from "../../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl"; // Correct import

export default function LST() {
  const lstData = [
    {
      icon: addBaseUrl("img/WebApp.png"),
      doc_location: addBaseUrl(
        "docs/web-applications/lst/users-guide/users-guide"
      ),
      doc_name: "Levee Screening Tool Users Guide",
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
            <p className="text-title">Levee Screening Tool</p>
            <p className="text-description">Levee Screening Tool</p>
          </div>
        </div>
        <ContentBox contentData={lstData} />
      </main>
    </Layout>
  );
}
