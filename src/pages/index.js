import React from "react";
import Layout from "@theme/Layout";
import "../css/custom.css";
import ContentBoxLarge from "../components/ContentBoxLarge";
import addBaseUrl from "@docusaurus/useBaseUrl";
import { Hero } from "@usace/groundwork";

export default function Home() {
  const desktopAppCardData = [
    {
      icon: addBaseUrl("img/TotalRisk.png"),
      title: "RMC-TotalRisk",
    },
    {
      icon: addBaseUrl("img/RFA.png"),
      title: "RMC-RFA",
    },
    {
      icon: addBaseUrl("img/BestFit.png"),
      title: "RMC-BestFit",
    },
    {
      icon: addBaseUrl("img/LifeSim.png"),
      title: "LifeSim",
    },
  ];

  const toolboxCardData = [
    {
      icon: addBaseUrl("img/Toolbox.png"),
      title: "RMC Toolboxes",
    },
  ];

  const webAppCardData = [
    {
      icon: addBaseUrl("img/WebApp.png"),
      title: "RRFT",
    },
    {
      icon: addBaseUrl("img/WebApp.png"),
      title: "Levee Screening Tool",
    },
    {
      icon: addBaseUrl("img/WebApp.png"),
      title: "Dam Screening Tool",
    },
  ];

  const homepageData = [
    {
      icon: addBaseUrl("img/DesktopApp.png"),
      doc_location: addBaseUrl("desktop-applications"),
      doc_name: "Desktop Applications",
      contentCardData: desktopAppCardData,
      active: true,
    },
    {
      icon: addBaseUrl("img/ToolboxFilled.png"),
      doc_location: addBaseUrl("toolboxes"),
      doc_name: "Toolboxes",
      contentCardData: toolboxCardData,
      active: true,
    },
    {
      icon: addBaseUrl("img/WebAppFilled.png"),
      doc_location: addBaseUrl("web-applications"),
      doc_name: "Web Applications",
      contentCardData: webAppCardData,
      active: true,
    },
  ];

  return (
    <Layout title="RMC Software Documentation" description="Documentation for RMC Software Packages">
      <Hero
        image={[addBaseUrl("nww-lucky-peak-dam.jpg"), addBaseUrl("taylorsville-SPPRu4Rw.jpg")]}
        alt={["Lucky Peak Dam", "Taylorsville Dam"]}
        title="RMC Software Documentation"
        subtitle="Your hub for comprehensive guides, resources, and support to navigate our powerful tools."
      />
      <main className="main-content-container">
        <ContentBoxLarge contentData={homepageData} />
      </main>
    </Layout>
  );
}
