import React from "react";
import Layout from "@theme/Layout";
import "../../css/index.css";
import ContentBox from "../../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl"; // Correct import

export default function RFA() {
  const RFAData = [
    {
      icon: addBaseUrl("img/RFA.png"),
      doc_location: addBaseUrl(
        "docs/desktop-applications/rmc-rfa/users-guide/users-guide"
      ),
      doc_name: "RMC RFA Users Guide",
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
          <img src="../img/RFA.png"></img>
          <div className="text-container">
            <p className="text-title">RMC Reservoir Frequency Analysis</p>
            <p className="text-description">RMC Reservoir Frequency Analysis</p>
          </div>
        </div>
        <ContentBox contentData={RFAData} />
      </main>
    </Layout>
  );
}
