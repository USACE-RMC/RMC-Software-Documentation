import React from "react";
import Root from "@theme-original/Root";
import SearchBar from "@theme/SearchBar";
import { CounterProvider } from "../components/Counters";
import { ReportIdProvider } from "@site/src/contexts/ReportIdContext";
import { TourProvider } from "@site/src/contexts/TourContext";
import { SiteWrapper } from "@usace/groundwork";
import "@usace/groundwork/dist/style.css";
import "../css/custom.css";

export default function CustomRoot(props) {
  return (
    <TourProvider>
      <CounterProvider>
        <ReportIdProvider>
          <Root {...props} />
        </ReportIdProvider>
      </CounterProvider>
    </TourProvider>
  );
}
