import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import "../../css/custom.css";
import ContentBox from "../../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

// Create the list of documents dynamically
const lifeSimData = [
  {
    icon: "img/LifeSim.png",
    doc_location: "desktop-applications/lifesim/users-guide",
    doc_name: "LifeSim Users Guide",
    active: true,
    draft: true,
  },
  {
    icon: "img/LifeSim.png",
    doc_location: "desktop-applications/lifesim/validation-studies",
    doc_name: "LifeSim Validation Studies",
    active: true,
    draft: true,
  },
];

export const lifeSimDocs = lifeSimData;

export default function LifeSim() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    // Fetch the latestVersions JSON file
    fetch("/RMC-Software-Documentation/versions/latestVersions.json")
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error("Error loading latest versions:", error));
  }, []);

  const lifeSimData = lifeSimDocs.map((doc) => ({
    ...doc,
    icon: addBaseUrl(doc.icon),
    doc_location: addBaseUrl(`docs/${doc.doc_location}/${latestVersions[doc.doc_location.replace(/^docs\//, "")]}/preface`),
  }));

  return (
    <Layout title="RMC Software Documentation" description="Documentation for RMC Software Packages">
      <main>
        <div className="header-container">
          <div className="header-title">RMC Software Documentation</div>
        </div>
        <div className="title-container">
          <div className="title-container-nav-link">
            <Link to={`${addBaseUrl("desktop-applications")}`}>&larr; Desktop Applications</Link>
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
