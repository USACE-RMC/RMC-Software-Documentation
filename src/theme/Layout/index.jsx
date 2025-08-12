//import React from "react";
//import Layout from "@theme-original/Layout";

//export default function LayoutWrapper(props) {
//  return (
//    <>
//      <Layout {...props} noNavbar noFooter />
//    </>
//  );
//}

// src/theme/Layout/index.jsx
import React from "react";
import Layout from "@theme-original/Layout";
import SearchBar from "@theme/SearchBar";
import { SiteWrapper } from "@usace/groundwork";
import { useColorMode } from "@docusaurus/theme-common";
import useIsBrowser from "@docusaurus/useIsBrowser";
import useBaseUrl from "@docusaurus/useBaseUrl";
import "@usace/groundwork/dist/style.css";
import "../../css/custom.css";

function ThemeToggle() {
  const isBrowser = useIsBrowser();
  const cm = isBrowser ? useColorMode() : null;
  const lightUrl = useBaseUrl("/img/LightTheme.png");
  const darkUrl = useBaseUrl("/img/DarkTheme.png");

  // Guard during SSR/early hydration
  if (!cm?.colorMode) return null;

  const isDark = cm.colorMode === "dark";
  const target = isDark ? "light" : "dark";
  const iconUrl = isDark ? lightUrl : darkUrl;

  return (
    <button
      type="button"
      aria-label={`Switch to ${target} mode`}
      title={`Switch to ${target} mode`}
      className="h-8 w-8 rounded-md flex items-center justify-center"
      onClick={() => cm.setColorMode(target)}
    >
      <img src={iconUrl} alt="" aria-hidden="true" className="h-6 w-6 " decoding="async" />
    </button>
  );
}

const links = [
  {
    id: "getting-started",
    text: "Getting Started",
    href: "/docs",
    children: [{ id: "quick-start", text: "Quick Start Guide", href: "/docs/quick-start" }],
  },
];

export default function LayoutWrapper({ children, ...rest }) {
  return (
    <Layout {...rest} noNavbar noFooter>
      <SiteWrapper
        usaBanner={false}
        fluidNav
        subtitle="RMC Software Documentation"
        links={links}
        navRight={
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <SearchBar />
          </div>
        }
      >
        {children}
      </SiteWrapper>
    </Layout>
  );
}
