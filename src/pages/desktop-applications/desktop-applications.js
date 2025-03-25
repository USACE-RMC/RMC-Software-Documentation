import React from "react";
import Layout from "@theme/Layout";
import "../../css/index.css";
import ContentBox from "../../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl";

export default function DesktopApps() {
  const desktopAppData = [
    {
      icon: "../img/TotalRisk.png",
      doc_location: addBaseUrl("totalrisk"),
      doc_name: "RMC TotalRisk",
      active: false,
    },
    {
      icon: "../img/BestFit.png",
      doc_location: addBaseUrl("best-fit"),
      doc_name: "RMC BestFit",
      active: false,
    },
    {
      icon: "../img/RFA.png",
      doc_location: addBaseUrl("rfa"),
      doc_name: "RMC RFA",
      active: false,
    },
    {
      icon: "../img/LifeSim.png",
      doc_location: addBaseUrl("lifesim"),
      doc_name: "LifeSim",
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
          <img src="../img/DesktopApp.png"></img>
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
