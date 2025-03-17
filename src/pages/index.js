import React from "react";
import Layout from "@theme/Layout";
import "../css/index.css";
import ContentBox from "../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl";

export default function Home() {
  const totalRiskData = [
    {
      icon: "img/TotalRisk.png",
      doc_location: addBaseUrl("docs/rmc-totalrisk/user-guide"),
      doc_name: "RMC-TotalRisk User's Guide",
      active: false,
    },
    {
      icon: "img/TotalRisk.png",
      doc_location: addBaseUrl("docs/rmc-totalrisk/applications-guide"),
      doc_name: "RMC-TotalRisk Applications Guide",
      active: false,
    },
    {
      icon: "img/TotalRisk.png",
      doc_location: addBaseUrl("docs/rmc-totalrisk/verification-report"),
      doc_name: "RMC-TotalRisk Verification Report",
      active: false,
    },
  ];

  const RFAData = [
    {
      icon: "img/RFA.png",
      doc_location: addBaseUrl("docs/rmc-rfa/user-guide"),
      doc_name: "RMC-RFA User's Guide",
      active: false,
    },
  ];

  const bestFitData = [
    {
      icon: "img/BestFit.png",
      doc_location: addBaseUrl("docs/rmc-bestfit/user-guide"),
      doc_name: "RMC-BestFit User's Guide",
      active: false,
    },
  ];

  const lifeSimData = [
    {
      icon: "img/LifeSim.png",
      doc_location: addBaseUrl("docs/lifesim/users-guide"),
      doc_name: "LifeSim User's Guide",
      active: false,
    },
  ];

  const toolboxSuiteData = [
    {
      icon: "img/Toolbox.png",
      doc_location: addBaseUrl("breach-parameters-suite"),
      doc_name: "Breach Parameters Suite",
      active: false,
    },
    {
      icon: "img/Toolbox.png",
      doc_location: addBaseUrl("flood-hazard-suite"),
      doc_name: "Flood Hazard Suite",
      active: false,
    },
    {
      icon: "img/Toolbox.png",
      doc_location: addBaseUrl("internal-erosion-suite"),
      doc_name: "Internal Erosion Suite",
      active: true,
    },
    {
      icon: "img/Toolbox.png",
      doc_location: addBaseUrl("overtopping-erosion-suite"),
      doc_name: "Overtopping Erosion Suite",
      active: false,
    },
    {
      icon: "img/Toolbox.png",
      doc_location: addBaseUrl("risk-calculations-suite"),
      doc_name: "Risk Calculations Suite",
      active: false,
    },
    {
      icon: "img/Toolbox.png",
      doc_location: addBaseUrl("riverine-erosion-suite"),
      doc_name: "Riverine Erosion Toolbox",
      active: false,
    },
    {
      icon: "img/Toolbox.png",
      doc_location: addBaseUrl("hydraulic-fracture-toolbox"),
      doc_name: "Hydraulic Fracture Toolbox",
      active: false,
    },
    {
      icon: "img/Toolbox.png",
      doc_location: addBaseUrl("rmc-qracalcs-suite"),
      doc_name: "RMC-QRAcalcs",
      active: false,
    },
    {
      icon: "img/Toolbox.png",
      doc_location: addBaseUrl("seismic-hazard-suite"),
      doc_name: "Seismic Hazard Suite",
      active: false,
    },
    {
      icon: "img/Toolbox.png",
      doc_location: addBaseUrl("spillway-erosion-suite"),
      doc_name: "Spillway Erosion Suite",
      active: false,
    },
    {
      icon: "img/Toolbox.png",
      doc_location: addBaseUrl("structural-suite"),
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
