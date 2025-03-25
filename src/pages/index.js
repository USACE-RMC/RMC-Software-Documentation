import React from "react";
import Layout from "@theme/Layout";
import "../css/index.css";
import ContentBoxLarge from "../components/ContentBoxLarge";
import addBaseUrl from "@docusaurus/useBaseUrl";

export default function Home() {
  const desktopAppCardData = [
    {
      icon: "img/TotalRisk.png",
      title: "RMC-TotalRisk",
    },
    {
      icon: "img/RFA.png",
      title: "RMC-RFA",
    },
    {
      icon: "img/BestFit.png",
      title: "RMC-BestFit",
    },
    {
      icon: "img/LifeSim.png",
      title: "LifeSim",
    },
  ];

  const toolboxCardData = [
    {
      icon: "img/Toolbox.png",
      title: "RMC Toolboxes",
    },
  ];

  const webAppCardData = [
    {
      icon: "img/WebApp.png",
      title: "RRFT",
    },
    {
      icon: "img/WebApp.png",
      title: "Levee Screening Tool",
    },
    {
      icon: "img/WebApp.png",
      title: "Dam Screening Tool",
    },
  ];

  const homepageData = [
    {
      icon: "img/DesktopApp.png",
      doc_location: addBaseUrl("desktop-applications/desktop-applications"),
      doc_name: "Desktop Applications",
      contentCardData: desktopAppCardData,
      active: true,
    },
    {
      icon: "img/ToolboxFilled.png",
      doc_location: addBaseUrl("toolboxes/toolboxes"),
      doc_name: "Toolboxes",
      contentCardData: toolboxCardData,
      active: true,
    },
    {
      icon: "img/WebAppFilled.png",
      doc_location: addBaseUrl("/web-applications/web-applications"),
      doc_name: "Web Applications",
      contentCardData: webAppCardData,
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
        <p className="welcome-text">
          Welcome to the Risk Management Center software documentation portal.
          <br />
          Your hub for comprehensive guides, resources, and support to navigate
          our powerful tools.
        </p>
        <ContentBoxLarge contentData={homepageData} />
      </main>
    </Layout>
  );
}
