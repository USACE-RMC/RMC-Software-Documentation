import React from "react";
import Layout from "@theme/Layout";
import "../../css/index.css";
import ContentBox from "../../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl"; // Correct import

export default function DST() {
  const dstData = [
    {
      icon: addBaseUrl("img/WebApp.png"),
      doc_location: addBaseUrl(
        "docs/web-applications/dst/users-guide/users-guide"
      ),
      doc_name: "Dam Screening Tool Users Guide",
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
          <img src={addBaseUrl("img/WebAppFilled.png")}></img>
          <div className="text-container">
            <p className="text-title">Dam Screening Tool</p>
            <p className="text-description">Dam Screening Tool</p>
          </div>
        </div>
        <ContentBox contentData={dstData} />
      </main>
    </Layout>
  );
}
