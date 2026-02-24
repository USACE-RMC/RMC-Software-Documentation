import React from "react";
import Root from "@theme-original/Root";
import { CounterProvider } from "../components/Counters";
import { ReportIdProvider } from "@site/src/contexts/ReportIdContext";
import { TourProvider } from "@site/src/contexts/TourContext";
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
