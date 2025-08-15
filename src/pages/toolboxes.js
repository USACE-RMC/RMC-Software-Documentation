import React from "react";
import Layout from "@theme/Layout";
import "../css/custom.css";
import ContentBox from "../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

export default function Toolboxes() {
  const toolboxSuiteData = [
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl("toolboxes/internal-erosion-suite"),
      doc_name: "Internal Erosion Suite",
      active: true,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl("toolboxes/overtopping-erosion-suite"),
      doc_name: "Overtopping Erosion Suite",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl("toolboxes/risk-calculations-suite"),
      doc_name: "Risk Calculations Suite",
      active: true,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl("toolboxes/riverine-erosion-suite"),
      doc_name: "Riverine Erosion Toolbox",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl("toolboxes/seismic-hazard-suite"),
      doc_name: "Seismic Hazard Suite",
      active: true,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl("toolboxes/spillway-erosion-suite"),
      doc_name: "Spillway Erosion Suite",
      active: false,
    },
    {
      icon: addBaseUrl("img/Toolbox.png"),
      doc_location: addBaseUrl("toolboxes/structural-suite"),
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
        <div className="title-container">
          <div className="title-container-nav-link">
            <Link to={addBaseUrl("/")}>&larr; Home</Link>
          </div>
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
