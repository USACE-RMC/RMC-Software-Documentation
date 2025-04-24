import React from "react";
import { CounterProvider } from "../components/Counters";
import { ReportIdProvider } from "@site/src/contexts/ReportIdContext";
import Root from "@theme-original/Root";

export default function CustomRoot(props) {
  return (
    <CounterProvider>
      <Root {...props} />
    </CounterProvider>
  );
}
