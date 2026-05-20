import useBaseUrl from "@docusaurus/useBaseUrl";
import { useEffect, useState } from "react";

export default function useLatestVersions(jsonPath) {
  const defaultJsonPath = useBaseUrl("versions/latestVersions.json");
  const url = jsonPath || defaultJsonPath;
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    let mounted = true;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (mounted) setLatestVersions(data || {});
      })
      .catch((e) => console.error("Error loading latest versions:", e));
    return () => {
      mounted = false;
    };
  }, [url]);

  return latestVersions;
}
