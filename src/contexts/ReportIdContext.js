import React, { createContext, useContext, useMemo } from "react";
import { useLocation } from "@docusaurus/router";
import reportIdMap from "@site/src/reportIdMap";

const ReportIdContext = createContext();

export const ReportIdProvider = ({ children }) => {
  const location = useLocation();

  const reportId = useMemo(() => {
    // Match full path from docs/ to version
    const match = location.pathname.match(
      /docs\/(.+?\/.+?\/v\d+\.\d+(\.\d+)?)/
    );
    if (match) {
      const docPath = match[1]; // the full relative path after "docs/"
      return reportIdMap[docPath] || null;
    }
    return null;
  }, [location.pathname]);

  return (
    <ReportIdContext.Provider value={reportId}>
      {children}
    </ReportIdContext.Provider>
  );
};

export const useReportId = () => {
  return useContext(ReportIdContext);
};
