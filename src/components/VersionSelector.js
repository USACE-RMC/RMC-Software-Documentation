import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "@docusaurus/router";
import useBaseUrl from "@docusaurus/useBaseUrl";
import "../css/custom.css";

const VersionSelector = ({ document }) => {
  const history = useHistory();
  const location = useLocation();
  const versionListUrl = useBaseUrl("versions/versionList.json");

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
        const response = await fetch(versionListUrl);
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
  }, [document, location.pathname, versionListUrl]);

  const handleVersionChange = async (event) => {
    const newVersion = event.target.value;
    setSelectedVersion(newVersion);

    const prefaceUrl = location.pathname.replace(/\/v\d+\.\d+\/[^/]+/, `/${newVersion}/preface`);
    if (prefaceUrl !== location.pathname) {
      history.push(prefaceUrl);
    }
  };

  return (
    <div className="m-0">
      {versions.length > 0 ? (
        <select
          className="
            px-[10px] py-[5px]
            font-usace text-normal text-font-color
            rounded-[4px]
            border border-[#ccc] 
            bg-background-theme 
            hover:border-[#888]
            w-[90px]
            cursor-pointer
            transition-colors duration-300 ease-in-out
            focus:outline-none focus:ring-0 focus:border-[#888] focus:shadow-none
          "
          value={selectedVersion}
          onChange={handleVersionChange}
        >
          {versions.map((version) => (
            <option key={version} value={version} className="p-2 text-normal text-font-color bg-background-theme">
              {version}
            </option>
          ))}
        </select>
      ) : (
        <p className="text-normal text-[#999]">Loading versions...</p>
      )}
    </div>
  );
};

export default VersionSelector;
