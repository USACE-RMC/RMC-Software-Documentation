import React from "react";
import Layout from "@theme/Layout";
import "../../css/index.css";
import ContentBox from "../../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl";

export default function Toolboxes() {
  const toolboxSuiteData = [
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl("breach-parameters-suite"),
      doc_name: "Breach Parameters Suite",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl("flood-hazard-suite"),
      doc_name: "Flood Hazard Suite",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl("toolboxes/internal-erosion-suite"),
      doc_name: "Internal Erosion Suite",
      active: true,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl("overtopping-erosion-suite"),
      doc_name: "Overtopping Erosion Suite",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl("risk-calculations-suite"),
      doc_name: "Risk Calculations Suite",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl("riverine-erosion-suite"),
      doc_name: "Riverine Erosion Toolbox",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl("hydraulic-fracture-toolbox"),
      doc_name: "Hydraulic Fracture Toolbox",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl("rmc-qracalcs-suite"),
      doc_name: "RMC-QRAcalcs",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl("seismic-hazard-suite"),
      doc_name: "Seismic Hazard Suite",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl("spillway-erosion-suite"),
      doc_name: "Spillway Erosion Suite",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
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
        <div className="title-container">
          <img src={addBaseUrl("img/ToolboxFilled.png")}></img>
          <div className="text-container">
            <p className="text-title">Toolboxes</p>
            <p className="text-description">RMC Toolboxes</p>
          </div>
        </div>
        <ContentBox contentData={toolboxSuiteData} />
      </main>
    </Layout>
  );
}
