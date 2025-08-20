import { useEffect, useState } from "react";

export default function useLatestVersions(jsonPath = "/RMC-Software-Documentation/versions/latestVersions.json") {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    let mounted = true;
    fetch(jsonPath)
      .then((r) => r.json())
      .then((data) => {
        if (mounted) setLatestVersions(data || {});
      })
      .catch((e) => console.error("Error loading latest versions:", e));
    return () => {
      mounted = false;
    };
  }, [jsonPath]);

  return latestVersions;
}
