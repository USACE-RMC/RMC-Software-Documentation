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
import React, { useEffect } from "react";
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
  const cm = useColorMode(); // Always call this hook!
  const lightUrl = useBaseUrl("/img/LightTheme.png");
  const darkUrl = useBaseUrl("/img/DarkTheme.png");

  // Guard during SSR/early hydration
  if (!isBrowser || !cm?.colorMode) return null;

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
      <img src={iconUrl} alt="" aria-hidden="true" className="h-6 w-6" decoding="async" />
    </button>
  );
}

export default function LayoutWrapper({ children, ...rest }) {
  const homeHref = useBaseUrl("/");

  const desktopAppHref = useBaseUrl("/desktop-applications");
  const totalRiskHref = useBaseUrl("/desktop-applications/rmc-totalrisk");
  const bestFitHref = useBaseUrl("/desktop-applications/rmc-bestfit");
  const rfaHref = useBaseUrl("/desktop-applications/rmc-rfa");
  const lifeSimHref = useBaseUrl("/desktop-applications/lifesim");

  const toolboxAppHref = useBaseUrl("/toolboxes");
  const internalErosionHref = useBaseUrl("/toolboxes/internal-erosion-suite");
  const overtoppingHref = useBaseUrl("/toolboxes/overtopping-erosion-suite");
  const riskCalcHref = useBaseUrl("/toolboxes/risk-calculations-suite");
  const riverineHref = useBaseUrl("/toolboxes/rivering-erosion-toolbox");
  const seismicHref = useBaseUrl("/toolboxes/seismic-hazard-suite");
  const spillwayHref = useBaseUrl("/toolboxes/spillway-erosion-suite");
  const structuralHref = useBaseUrl("/toolboxes/structural-suite");

  const webAppHref = useBaseUrl("/web-applications");
  const links = [
    {
      id: "home",
      text: "Home",
      href: homeHref,
    },
    {
      id: "desktop-applications",
      text: "Desktop Applications",
      href: desktopAppHref,
      children: [
        { id: "rmc-totalrisk", text: "RMC-TotalRisk", href: totalRiskHref },
        { id: "rmc-bestfit", text: "RMC-BestFit", href: bestFitHref },
        { id: "rmc-rfa", text: "RMC-RFA", href: rfaHref },
        { id: "lifesim", text: "LifeSim", href: lifeSimHref },
      ],
    },
    {
      id: "toolboxes",
      text: "Toolbox Technical Manuals",
      href: toolboxAppHref,
      children: [
        { id: "internal-erosion-suite", text: "Internal Erosion Suite", href: internalErosionHref },
        { id: "risk-calculations-suite", text: "Risk Calculations Suite", href: riskCalcHref },
      ],
    },
    {
      id: "web-applications",
      text: "Web Applications",
      href: webAppHref,
    },
  ];

  useEffect(() => {
    if (typeof document === "undefined") return;

    // Find the logo anchor specifically
    const logoAnchor = document.querySelector('header a[href="/"] img[alt="U.S. Army Corps of Engineers"]')?.closest("a");

    if (logoAnchor && logoAnchor.getAttribute("href") !== homeHref) {
      logoAnchor.setAttribute("href", homeHref);
    }
  }, [homeHref]);

  return (
    <Layout {...rest} noNavbar noFooter>
      <SiteWrapper
        usaBanner={false}
        fluidNav={false}
        subtitle="Institute for Water Resources, Risk Management Center Website"
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
