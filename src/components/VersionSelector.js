import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "@docusaurus/router";
import "../css/custom.css";
import "../css/version-selector.css";

const VersionSelector = ({ document }) => {
  const history = useHistory();
  const location = useLocation();

  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState("");

  // Extract version from URL (format: /v1.0/, /v2.1/, etc.)
  const getVersionFromUrl = () => {
    const match = location.pathname.match(/\/(v\d+\.\d+)\//);
    return match ? match[1] : "";
  };

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const response = await fetch("/RMC-Software-Documentation/versions/versionList.json");
        const data = await response.json();
        const versionList = data[document] || [];

        setVersions(versionList);

        const urlVersion = getVersionFromUrl();
        if (urlVersion && versionList.includes(urlVersion)) {
          setSelectedVersion(urlVersion);
        }
      } catch (error) {
        console.error("Error fetching version list:", error);
      }
    };

    fetchVersions();
  }, [document, location.pathname]);

  const handleVersionChange = async (event) => {
    const newVersion = event.target.value;
    setSelectedVersion(newVersion);

    const prefaceUrl = location.pathname.replace(/\/v\d+\.\d+\/[^/]+/, `/${newVersion}/preface`);
    if (prefaceUrl !== location.pathname) {
      history.push(prefaceUrl);
    }
  };

  return (
    <div className="version-selector-container">
      {versions.length > 0 ? (
        <select className="version-selector-dropdown" value={selectedVersion} onChange={handleVersionChange}>
          {versions.map((version) => (
            <option key={version} value={version}>
              {version}
            </option>
          ))}
        </select>
      ) : (
        <p className="loading-message">Loading versions...</p>
      )}
    </div>
  );
};

export default VersionSelector;
