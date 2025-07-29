import React from "react";
import { CounterProvider } from "../components/Counters";
import { ReportIdProvider } from "@site/src/contexts/ReportIdContext";
import Root from "@theme-original/Root";

import "../css/custom.css";

export default function CustomRoot(props) {
  return (
    <CounterProvider>
      <ReportIdProvider>
        <Root {...props} />
      </ReportIdProvider>
    </CounterProvider>
  );
}

// Uncomment the following lines to use the standard USACE Groundwork banner and footer

//import React from "react";
//import { CounterProvider } from "../components/Counters";
//import { ReportIdProvider } from "@site/src/contexts/ReportIdContext";
//import { SiteWrapper } from "@usace/groundwork";
//import "@usace/groundwork/dist/style.css";
//import Root from "@theme-original/Root";
//import "../css/custom.css";

//export default function CustomRoot(props) {
//  return (
//    <SiteWrapper usaBanner={false} fluidNav={true} subtitle="RMC Software Documentation">
//      <CounterProvider>
//        <ReportIdProvider>
//          <Root {...props} />
//        </ReportIdProvider>
//      </CounterProvider>
//    </SiteWrapper>
//  );
//}
