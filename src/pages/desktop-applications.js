import React from "react";
import Layout from "@theme/Layout";
import "../css/index.css";
import ContentBox from "../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

export default function DesktopApps() {
  const desktopAppData = [
    {
      icon: addBaseUrl("img/TotalRisk.png"),
      doc_location: addBaseUrl("desktop-applications/rmc-totalrisk"),
      doc_name: "RMC TotalRisk",
      active: true,
    },
    {
      icon: addBaseUrl("img/BestFit.png"),
      doc_location: addBaseUrl("desktop-applications/rmc-bestfit"),
      doc_name: "RMC BestFit",
      active: true,
    },
    {
      icon: addBaseUrl("img/RFA.png"),
      doc_location: addBaseUrl("desktop-applications/rmc-rfa"),
      doc_name: "RMC RFA",
      active: true,
    },
    {
      icon: addBaseUrl("img/LifeSim.png"),
      doc_location: addBaseUrl("desktop-applications/lifesim"),
      doc_name: "LifeSim",
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
          <div className="title-container-nav-link">
            <Link to={addBaseUrl("/")}>&larr; Home</Link>
          </div>
          <img src={addBaseUrl("img/DesktopApp.png")}></img>
          <div className="text-container">
            <p className="text-title">Desktop Applications</p>
            <p className="text-description">RMC Desktop Applications</p>
          </div>
        </div>
        <ContentBox contentData={desktopAppData} />
      </main>
    </Layout>
  );
}
