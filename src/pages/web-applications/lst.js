import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import "../../css/index.css";
import ContentBox from "../../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

export default function LST() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    // Fetch the latestVersions JSON file
    fetch("/RMC-Software-Documentation/versions/latestVersions.json")
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error("Error loading latest versions:", error));
  }, []);

  // Create the list of documents dynamically
  const lstData = [
    {
      icon: addBaseUrl("img/WebApp.png"),
      doc_location: addBaseUrl(
        `docs/web-applications/lst/users-guide/${latestVersions["web-applications/lst/users-guide"]}/users-guide`
      ),
      doc_name: "Levee Screening Tool Users Guide",
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
            <p className="text-title">Levee Screening Tool</p>
            <p className="text-description">Levee Screening Tool</p>
          </div>
        </div>
        <ContentBox contentData={lstData} />
      </main>
    </Layout>
  );
}
