import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import "../../css/custom.css";
import ContentBox from "../../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

// Create the list of documents dynamically
const bestFitData = [
  {
    icon: "img/BestFit.png",
    doc_location: "desktop-applications/rmc-bestfit/users-guide",
    doc_name: "RMC BestFit Users Guide",
    active: true,
    draft: true,
  },
];

export const bestFitDocs = bestFitData;

export default function BestFit() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    // Fetch the latestVersions JSON file
    fetch("/RMC-Software-Documentation/versions/latestVersions.json")
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error("Error loading latest versions:", error));
  }, []);

  const bestFitData = bestFitDocs.map((doc) => ({
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
