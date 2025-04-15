import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import "../../css/index.css";
import ContentBox from "../../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

export default function RRFT() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    // Fetch the latestVersions JSON file
    fetch("/RMC-Software-Documentation/versions/latestVersions.json")
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error("Error loading latest versions:", error));
  }, []);

  // Create the list of documents dynamically
  const rrftData = [
    {
      icon: addBaseUrl("img/WebApp.png"),
      doc_location: addBaseUrl(
        `docs/web-applications/rrft/users-guide/${latestVersions["web-applications/rrft/users-guide"]}/users-guide`
      ),
      doc_name: "RRFT Users Guide",
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
            <Link to={`${addBaseUrl("web-applications")}`}>
              &larr; Web Applications
            </Link>
          </div>
          <img src={addBaseUrl("img/WebAppFilled.png")}></img>
          <div className="text-container">
            <p className="text-title">Rainfall Runoff Frequency Tool</p>
            <p className="text-description">Rainfall Runoff Frequency Tool</p>
          </div>
        </div>
        <ContentBox contentData={rrftData} />
      </main>
    </Layout>
  );
}
