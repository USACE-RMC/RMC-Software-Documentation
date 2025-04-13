import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import "../../css/index.css";
import ContentBox from "../../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

export default function LifeSim() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    // Fetch the latestVersions JSON file
    fetch("/RMC-Software-Documentation/versions/latestVersions.json")
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error("Error loading latest versions:", error));
  }, []);

  // Create the list of documents dynamically
  const lifeSimData = [
    {
      icon: addBaseUrl("img/LifeSim.png"),
      doc_location: addBaseUrl(
        `docs/desktop-applications/lifesim/users-guide/${latestVersions["desktop-applications/lifesim/users-guide"]}/users-guide`
      ),
      doc_name: "LifeSim Users Guide",
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
          <img src={addBaseUrl("img/LifeSim.png")}></img>
          <div className="text-container">
            <p className="text-title">LifeSim</p>
            <p className="text-description">LifeSim</p>
          </div>
        </div>
        <ContentBox contentData={lifeSimData} />
      </main>
    </Layout>
  );
}
