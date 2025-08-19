import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import "../../css/custom.css";
import ContentBox from "../../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

// Create the list of documents dynamically
const lstData = [
  {
    icon: "img/WebApp.png",
    doc_location: "web-applications/lst/users-guide",
    doc_name: "Levee Screening Tool Users Guide",
    active: false,
    draft: true,
  },
];

export const lstDocs = lstData;

export default function LST() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    // Fetch the latestVersions JSON file
    fetch("/RMC-Software-Documentation/versions/latestVersions.json")
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error("Error loading latest versions:", error));
  }, []);

  const lstData = lstDocs.map((doc) => ({
    ...doc,
    icon: addBaseUrl(doc.icon),
    doc_location: addBaseUrl(`docs/${doc.doc_location}/${latestVersions[doc.doc_location.replace(/^docs\//, "")]}/preface`),
  }));

  return (
    <Layout title="RMC Software Documentation" description="Documentation for RMC Software Packages">
      <main>
        <div className="title-container">
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
