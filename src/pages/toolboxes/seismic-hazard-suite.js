import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import "../../css/custom.css";
import ContentBox from "../../components/ContentBox";
import addBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

// Create the list of documents dynamically
const seismicHazardSuite = [
  {
    icon: "img/Toolbox.png",
    doc_location: `toolbox-technical-manuals/seismic-hazard-suite/site-classification`,
    doc_name: "Site Classification Toolbox Technical Manual",
    active: true,
    draft: true,
  },
  {
    icon: "img/Toolbox.png",
    doc_location: `toolbox-technical-manuals/seismic-hazard-suite/seismic-hazard-curves`,
    doc_name: "Seismic Hazard Curves Toolbox Technical Manual",
    active: true,
    draft: true,
  },
  {
    icon: "img/Toolbox.png",
    doc_location: `toolbox-technical-manuals/seismic-hazard-suite/liquefaction`,
    doc_name: "Liquefaction Toolbox Technical Manual",
    active: false,
    draft: true,
  },
  {
    icon: "img/Toolbox.png",
    doc_location: `toolbox-technical-manuals/seismic-hazard-suite/empirical-crest-deformation`,
    doc_name: "Empirical Crest Deformation Toolbox Technical Manual",
    active: false,
    draft: true,
  },
];

export const seismicHazardSuiteDocs = seismicHazardSuite;

export default function SeismicHazardSuite() {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    fetch("/RMC-Software-Documentation/versions/latestVersions.json")
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error("Error loading latest versions:", error));
  }, []);

  const seismicHazardSuite = seismicHazardSuiteDocs.map((doc) => ({
    ...doc,
    icon: addBaseUrl(doc.icon),
    doc_location: addBaseUrl(`docs/${doc.doc_location}/${latestVersions[doc.doc_location.replace(/^docs\//, "")]}/preface`),
  }));

  return (
    <Layout title="RMC Software Documentation" description="Documentation for RMC Software Packages">
      <main>
        <div className="title-container">
          <img src={addBaseUrl("img/ToolboxFilled.png")} />
          <div className="text-container">
            <p className="text-title">Seismic Hazard Suite</p>
            <p className="text-description">RMC Toolboxes</p>
          </div>
        </div>
        <ContentBox contentData={seismicHazardSuite} />
      </main>
    </Layout>
  );
}
