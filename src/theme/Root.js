import React from "react";
import { CounterProvider } from "../components/Counters";
import { ReportIdProvider } from "@site/src/contexts/ReportIdContext";
import Root from "@theme-original/Root";
import { SiteWrapper } from "@usace/groundwork";
import "@usace/groundwork/dist/style.css";
import "../css/custom.css";

// Set theme here: "Original" or "Groundwork"
const theme = "Original";

const links = [
  {
    id: "getting-started",
    text: "Getting Started",
    href: "/#/docs",
    children: [
      {
        id: "quick-start",
        text: "Quick Start Guide",
        href: "/#/docs/quick-start",
      },
    ],
  },
];

export default function CustomRoot(props) {
  if (theme === "Groundwork") {
    return (
      <SiteWrapper usaBanner={false} fluidNav={true} subtitle="RMC Software Documentation" links={links}>
        <CounterProvider>
          <ReportIdProvider>
            <Root {...props} />
          </ReportIdProvider>
        </CounterProvider>
      </SiteWrapper>
    );
  }

  // Default: Original theme
  return (
    <CounterProvider>
      <ReportIdProvider>
        <Root {...props} />
      </ReportIdProvider>
    </CounterProvider>
  );
}
