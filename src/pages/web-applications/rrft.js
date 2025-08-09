import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import "../../css/custom.css";
import ContentBox from "../../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

// Create the list of documents dynamically
const rrftData = [
  {
    icon: "img/WebApp.png",
    doc_location: "web-applications/rrft/users-guide",
    doc_name: "RRFT Users Guide",
    active: false,
    draft: true,
  },
];

export const rrftDocs = rrftData;

export default function RRFT() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    // Fetch the latestVersions JSON file
    fetch("/RMC-Software-Documentation/versions/latestVersions.json")
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error("Error loading latest versions:", error));
  }, []);

  const rrftData = rrftDocs.map((doc) => ({
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
            <Link to={`${addBaseUrl("web-applications")}`}>&larr; Web Applications</Link>
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
