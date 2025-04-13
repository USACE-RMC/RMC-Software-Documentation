import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import "../../css/index.css";
import ContentBox from "../../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

export default function BestFit() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    // Fetch the latestVersions JSON file
    fetch("/RMC-Software-Documentation/versions/latestVersions.json")
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error("Error loading latest versions:", error));
  }, []);

  // Create the list of documents dynamically
  const bestFitData = [
    {
      icon: addBaseUrl("img/BestFit.png"),
      doc_location: addBaseUrl(
        `docs/desktop-applications/rmc-bestfit/users-guide/${latestVersions["desktop-applications/rmc-bestfit/users-guide"]}users-guide`
      ),
      doc_name: "RMC BestFit Users Guide",
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
          <div className="title-container-nav-link">
            <Link
              to={`${addBaseUrl("desktop-applications/desktop-applications")}`}
            >
              &larr; Desktop Applications
            </Link>
          </div>
          <img src={addBaseUrl("img/BestFit.png")}></img>
          <div className="text-container">
            <p className="text-title">RMC BestFit</p>
            <p className="text-description">RMC BestFit</p>
          </div>
        </div>
        <ContentBox contentData={bestFitData} />
      </main>
    </Layout>
  );
}
