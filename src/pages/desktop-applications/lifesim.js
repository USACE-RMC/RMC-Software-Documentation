import React from "react";
import Layout from "@theme/Layout";
import "../../css/index.css";
import ContentBox from "../../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl"; // Correct import

export default function LifeSim() {
  const lifeSimData = [
    {
      icon: addBaseUrl("img/LifeSim.png"),
      doc_location: addBaseUrl(
        "docs/desktop-applications/lifesim/users-guide/users-guide"
      ),
      doc_name: "LifeSim Users Guide",
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
          <img src="../img/LifeSim.png"></img>
          <div className="text-container">
            <p className="text-title">LifeSim</p>
            <p className="text-description">LifeSim</p>
          </div>
        </div>
        <ContentBox contentData={lifeSimData} />
      </main>
    </Layout>
  );
}
