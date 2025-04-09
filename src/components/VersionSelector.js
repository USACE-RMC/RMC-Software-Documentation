import React, { useState, useEffect } from "react";
import "../css/custom.css";
import "../css/version-selector.css";

const VersionSelector = ({ document }) => {
  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState("");

  // Function to get the version from the URL
  const getVersionFromUrl = () => {
    const url = window.location.pathname;
    const versionMatch = url.match(/\/v([\d\.]+)\//); // Match the version pattern (e.g., /v1.1.0/)
    return versionMatch ? versionMatch[1] : "";
  };

  // Fetch the versions when the component mounts
  useEffect(() => {
    // Fetch the versionList JSON file
    fetch("/RMC-Software-Documentation/versions/versionList.json")
      .then((response) => response.json())
      .then((data) => {
        // Check if the data contains versions for the passed document
        const versionList = data[document] || [];

        // If versions exist, update the state
        if (versionList.length > 0) {
          const versionOptions = versionList.map((version) => ({
            document,
            version,
          }));
          setVersions(versionOptions);

          // Try to get the version from URL or use the stored version in localStorage
          const storedVersion = localStorage.getItem("selectedVersion");
          const currentVersion =
            storedVersion || getVersionFromUrl() || versionList[0];
          setSelectedVersion(currentVersion);
        }
      })
      .catch((error) => {
        console.error("Error loading versions:", error);
      });
  }, [document]);

  // Handle version selection change
  const handleVersionChange = (event) => {
    const newVersion = event.target.value;
    setSelectedVersion(newVersion);

    // Store the selected version in localStorage
    localStorage.setItem("selectedVersion", newVersion);

    // Update the URL with the new version and reload the page
    const newUrl = window.location.pathname.replace(
      /\/v[\d\.]+\//,
      `/${newVersion}/`
    );
    window.location.href = newUrl; // This triggers a page reload
  };

  return (
    <div className="version-selector-container">
      {versions.length > 0 ? (
        <select
          className="version-selector-dropdown"
          value={selectedVersion}
          onChange={handleVersionChange}
        >
          {versions.map((version) => (
            <option
              key={`${version.document}-${version.version}`}
              className="version-selector-option"
              value={version.version}
            >
              {version.version}
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
