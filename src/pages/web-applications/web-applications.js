import React from "react";
import Layout from "@theme/Layout";
import "../../css/index.css";
import ContentBox from "../../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl";

export default function WebApps() {
  const webAppData = [
    {
      icon: "../img/WebApp.png",
      doc_location: addBaseUrl("web-applications/rrft"),
      doc_name: "Rainfall Runoff Frequency Tool",
      active: true,
    },
    {
      icon: "../img/WebApp.png",
      doc_location: addBaseUrl("web-applications/lst"),
      doc_name: "Levee Screening Tool",
      active: true,
    },
    {
      icon: "../img/WebApp.png",
      doc_location: addBaseUrl("web-applications/dst"),
      doc_name: "Dam Screening Tool",
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
            <p className="text-title">Web Applications</p>
            <p className="text-description">RMC Web Applications</p>
          </div>
        </div>
        <ContentBox contentData={webAppData} />
      </main>
    </Layout>
  );
}
