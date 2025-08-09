import React from "react";
import Layout from "@theme/Layout";
import "../css/custom.css";
import ContentBox from "../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

export default function WebApps() {
  const webAppData = [
    {
      icon: addBaseUrl("img/WebApp.png"),
      doc_location: addBaseUrl("web-applications/rrft"),
      doc_name: "Rainfall Runoff Frequency Tool",
      active: false,
    },
    {
      icon: addBaseUrl("img/WebApp.png"),
      doc_location: addBaseUrl("web-applications/lst"),
      doc_name: "Levee Screening Tool",
      active: false,
    },
    {
      icon: addBaseUrl("img/WebApp.png"),
      doc_location: addBaseUrl("web-applications/dst"),
      doc_name: "Dam Screening Tool",
      active: false,
    },
  ];

  return (
    <Layout title="RMC Software Documentation" description="Documentation for RMC Software Packages">
      <main>
        <div className="header-container">
          <div className="header-title">RMC Software Documentation</div>
        </div>
        <div className="title-container">
          <div className="title-container-nav-link">
            <Link to={addBaseUrl("/")}>&larr; Home</Link>
          </div>
          <img src={addBaseUrl("img/WebAppFilled.png")}></img>
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
