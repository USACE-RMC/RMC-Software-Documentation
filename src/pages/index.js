import React from "react";
import Layout from "@theme/Layout";
import "../css/index.css";
import ContentBox from "../components/ContentBox";
import { addBaseUrl } from "@docusaurus/useBaseUrl"; // Correct import

export default function Home() {
  const totalRiskData = [
    {
      icon: "/img/TotalRisk.png",
      doc_location: addBaseUrl("/docs/rmc-totalrisk/user-guide"), // Use addBaseUrl
      doc_name: "RMC-TotalRisk User's Guide",
      active: true,
    },
    {
      icon: "/img/TotalRisk.png",
      doc_location: addBaseUrl("/docs/rmc-totalrisk/applications-guide"), // Use addBaseUrl
      doc_name: "RMC-TotalRisk Applications Guide",
      active: true,
    },
    {
      icon: "/img/TotalRisk.png",
      doc_location: addBaseUrl("/docs/rmc-totalrisk/verification-report"), // Use addBaseUrl
      doc_name: "RMC-TotalRisk Verification Report",
      active: true,
    },
  ];

  const RFAData = [
    {
      icon: "img/RFA.png",
      doc_location: addBaseUrl("/docs/rmc-rfa/user-guide"), // Use addBaseUrl
      doc_name: "RMC-RFA User's Guide",
      active: true,
    },
  ];

  const bestFitData = [
    {
      icon: "img/BestFit.png",
      doc_location: addBaseUrl("/docs/rmc-bestfit/user-guide"), // Use addBaseUrl
      doc_name: "RMC-BestFit User's Guide",
      active: true,
    },
  ];

  const lifeSimData = [
    {
      icon: "img/LifeSim.png",
      doc_location: addBaseUrl("/docs/lifesim/users-guide"), // Use addBaseUrl
      doc_name: "LifeSim User's Guide",
      active: true,
    },
  ];

  const toolboxSuiteData = [
    {
      icon: "img/Toolbox.png",
      doc_location: addBaseUrl("/breach-parameters-suite"), // Use addBaseUrl
      doc_name: "Breach Parameters Suite",
      active: false,
    },
    {
      icon: "img/Toolbox.png",
      doc_location: addBaseUrl("/flood-hazard-suite"), // Use addBaseUrl
      doc_name: "Flood Hazard Suite",
      active: false,
    },
    {
      icon: "img/Toolbox.png",
      doc_location: addBaseUrl("/internal-erosion-suite"), // Use addBaseUrl
      doc_name: "Internal Erosion Suite",
      active: true,
    },
    {
      icon: "img/Toolbox.png",
      doc_location: addBaseUrl("/overtopping-erosion-suite"), // Use addBaseUrl
      doc_name: "Overtopping Erosion Suite",
      active: false,
    },
    {
      icon: "img/Toolbox.png",
      doc_location: addBaseUrl("/risk-calculations-suite"), // Use addBaseUrl
      doc_name: "Risk Calculations Suite",
      active: false,
    },
    {
      icon: "img/Toolbox.png",
      doc_location: addBaseUrl("/riverine-erosion-suite"), // Use addBaseUrl
      doc_name: "Riverine Erosion Toolbox",
      active: false,
    },
    {
      icon: "img/Toolbox.png",
      doc_location: addBaseUrl("/hydraulic-fracture-toolbox"), // Use addBaseUrl
      doc_name: "Hydraulic Fracture Toolbox",
      active: false,
    },
    {
      icon: "img/Toolbox.png",
      doc_location: addBaseUrl("/rmc-qracalcs-suite"), // Use addBaseUrl
      doc_name: "RMC-QRAcalcs",
      active: false,
    },
    {
      icon: "img/Toolbox.png",
      doc_location: addBaseUrl("/seismic-hazard-suite"), // Use addBaseUrl
      doc_name: "Seismic Hazard Suite",
      active: false,
    },
    {
      icon: "img/Toolbox.png",
      doc_location: addBaseUrl("/spillway-erosion-suite"), // Use addBaseUrl
      doc_name: "Spillway Erosion Suite",
      active: false,
    },
    {
      icon: "img/Toolbox.png",
      doc_location: addBaseUrl("/structural-suite"), // Use addBaseUrl
      doc_name: "Structural Suite",
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
        <ContentBox title="LifeSim Documentation" contentData={lifeSimData} />
        <ContentBox
          title="RMC-BestFit Documentation"
          contentData={bestFitData}
        />
        <ContentBox title="RMC-RFA Documentation" contentData={RFAData} />
        <ContentBox
          title="RMC Toolbox Documentation"
          contentData={toolboxSuiteData}
        />
        <ContentBox
          title="RMC-TotalRisk Documentation"
          contentData={totalRiskData}
        />
      </main>
    </Layout>
  );
}
