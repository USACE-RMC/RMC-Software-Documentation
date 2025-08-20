// src/theme/Layout/index.jsx
import React, { useEffect, useState } from "react";
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
      <img
        src={iconUrl}
        alt=""
        aria-hidden="true"
        className="h-6 w-6"
        decoding="async"
      />
    </button>
  );
}

export default function LayoutWrapper({ children, ...rest }) {
  const [latestVersions, setLatestVersions] = useState({});

  useEffect(() => {
    fetch("/RMC-Software-Documentation/versions/latestVersions.json")
      .then((response) => response.json())
      .then((data) => setLatestVersions(data))
      .catch((error) => console.error("Error loading latest versions:", error));
  }, []);

  // Homepage Link
  const homeHref = useBaseUrl("/");

  // Hub Page Links
  const desktopAppHref = useBaseUrl("/desktop-applications");
  const toolboxAppHref = useBaseUrl("/toolboxes");
  const webAppHref = useBaseUrl("/web-applications");

  // Desktop Application Sub-Hub Links
  const totalRiskHref = useBaseUrl("/desktop-applications/rmc-totalrisk");
  const bestFitHref = useBaseUrl("/desktop-applications/rmc-bestfit");
  const rfaHref = useBaseUrl("/desktop-applications/rmc-rfa");
  const lifeSimHref = useBaseUrl("/desktop-applications/lifesim");

  // Desktop Application Document Links
  // RMC-TotalRisk Documents
  const trUserGuideHref = useBaseUrl(
    `/docs/desktop-applications/rmc-totalrisk/users-guide/${
      latestVersions["desktop-applications/rmc-totalrisk/users-guide"] || "v1.0"
    }/preface`
  );
  const trAppHref = useBaseUrl(
    `/docs/desktop-applications/rmc-totalrisk/applications-guide/${
      latestVersions["desktop-applications/rmc-totalrisk/applications-guide"] ||
      "v1.0"
    }/preface`
  );
  const trVerifHref = useBaseUrl(
    `/docs/desktop-applications/rmc-totalrisk/verification-report/${
      latestVersions[
        "desktop-applications/rmc-totalrisk/verification-report"
      ] || "v1.0"
    }/preface`
  );

  // RMC-BestFit Documents
  const bestFitUserGuideHref = useBaseUrl(
    `/docs/desktop-applications/rmc-bestfit/users-guide/${
      latestVersions["desktop-applications/rmc-bestfit/users-guide"] || "v1.0"
    }/preface`
  );

  // RMC-RFA Documents
  const rfaUserGuideHref = useBaseUrl(
    `/docs/desktop-applications/rmc-rfa/users-guide/${
      latestVersions["desktop-applications/rmc-rfa/users-guide"] || "v1.0"
    }/preface`
  );

  // LifeSim Documents
  const lifeSimUserGuideHref = useBaseUrl(
    `/docs/desktop-applications/lifesim/users-guide/${
      latestVersions["desktop-applications/lifesim/users-guide"] || "v1.0"
    }/preface`
  );
  const lifeSimValStudiesHref = useBaseUrl(
    `/docs/desktop-applications/lifesim/validation-studies/${
      latestVersions["desktop-applications/lifesim/validation-studies"] ||
      "v1.0"
    }/preface`
  );

  // Toolbox Technical Manuals Sub-Hub Links
  const internalErosionHref = useBaseUrl("/toolboxes/internal-erosion-suite");
  const overtoppingHref = useBaseUrl("/toolboxes/overtopping-erosion-suite");
  const riskCalcHref = useBaseUrl("/toolboxes/risk-calculations-suite");
  const riverineHref = useBaseUrl("/toolboxes/rivering-erosion-toolbox");
  const seismicHref = useBaseUrl("/toolboxes/seismic-hazard-suite");
  const spillwayHref = useBaseUrl("/toolboxes/spillway-erosion-suite");
  const structuralHref = useBaseUrl("/toolboxes/structural-suite");

  // Toolbox Technical Manuals Document Links
  // Internal Erosion Suite Documents
  const bepProgressionHref = useBaseUrl(
    `/docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/${
      latestVersions[
        "toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression"
      ] || "v1.0"
    }/preface`
  );
  const continuationHref = useBaseUrl(
    `/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/${
      latestVersions[
        "toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation"
      ] || "v1.0"
    }/preface`
  );
  const SCEHref = useBaseUrl(
    `/docs/toolbox-technical-manuals/internal-erosion-suite/soil-contact-erosion-initiation/${
      latestVersions[
        "toolbox-technical-manuals/internal-erosion-suite/soil-contact-erosion-initiation"
      ] || "v1.0"
    }/preface`
  );

  // Risk Calculations Suite Documents
  const etDatabaseHref = useBaseUrl(
    `/docs/toolbox-technical-manuals/risk-calculations-suite/typical-event-tree-database/${
      latestVersions[
        "toolbox-technical-manuals/risk-calculations-suite/typical-event-tree-database"
      ] || "v1.0"
    }/preface`
  );

  // Seismic Hazard Suite Documents
  const siteClassHref = useBaseUrl(
    `/docs/toolbox-technical-manuals/seismic-hazard-suite/site-classification/${
      latestVersions[
        "toolbox-technical-manuals/seismic-hazzard-suite/site-classification"
      ] || "v1.0"
    }/preface`
  );
  const seismicHazardCurvesHref = useBaseUrl(
    `/docs/toolbox-technical-manuals/seismic-hazard-suite/seismic-hazard-curves/${
      latestVersions[
        "toolbox-technical-manuals/seismic-hazzard-suite/seismic-hazard-curve"
      ] || "v1.0"
    }/preface`
  );

  // Web Application  Sub-Hub Links
  const rrftHref = useBaseUrl("/web-applications/rrft");
  const lstHref = useBaseUrl("/web-applications/lst");
  const dstHref = useBaseUrl("/web-applications/dst");

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
        {
          id: "rmc-totalrisk",
          text: "RMC-TotalRisk",
          href: totalRiskHref,
          children: [
            {
              id: "tr-users-guide",
              text: "RMC-TotalRisk User's Guide",
              href: trUserGuideHref,
            },
          ],
        },
        {
          id: "rmc-bestfit",
          text: "RMC-BestFit",
          href: bestFitHref,
          children: [
            {
              id: "bestfit-users-guide",
              text: "RMC-BestFit User's Guide",
              href: bestFitUserGuideHref,
            },
          ],
        },
        { id: "rmc-rfa", text: "RMC-RFA", href: rfaHref },
        {
          id: "lifesim",
          text: "LifeSim",
          href: lifeSimHref,
          children: [
            {
              id: "lifesim-users-guide",
              text: "LifeSim User's Guide",
              href: lifeSimUserGuideHref,
            },
            {
              id: "lifesim-validation-studies",
              text: "LifeSim Validation Studies",
              href: lifeSimValStudiesHref,
            },
          ],
        },
      ],
    },
    {
      id: "toolboxes",
      text: "Toolbox Technical Manuals",
      href: toolboxAppHref,
      children: [
        {
          id: "internal-erosion-suite",
          text: "Internal Erosion Suite",
          href: internalErosionHref,
          children: [
            {
              id: "bep-progression",
              text: "Backward Erosion Piping (Progression) Toolbox Technical Manual",
              href: bepProgressionHref,
            },
            {
              id: "continuation",
              text: "Filter Evaluation (Continuation) Toolbox Technical Manual",
              href: continuationHref,
            },
            {
              id: "soil-contact-erosion",
              text: "Soil Contact Erosion (Continuation) Toolbox Technical Manual",
              href: SCEHref,
            },
          ],
        },
        {
          id: "risk-calculations-suite",
          text: "Risk Calculations Suite",
          href: riskCalcHref,
          children: [
            {
              id: "et-database",
              text: "Typical Event Tree Database",
              href: etDatabaseHref,
            },
          ],
        },
        {
          id: "seismic-hazard-suite",
          text: "Seismic Hazard Suite",
          href: seismicHref,
          children: [
            {
              id: "site-classification",
              text: "Site Classification Toolbox Technical Manual",
              href: siteClassHref,
            },
            {
              id: "seismic-hazard-curves",
              text: "Seismic Hazard Curves Toolbox Technical Manual",
              href: seismicHazardCurvesHref,
            },
          ],
        },
      ],
    },
    {
      id: "web-applications",
      text: "Web Applications",
      href: webAppHref,
    },
  ];

  const USACELinks = [
    {
      id: "plainLanguage",
      text: "Plain Language",
      href: "https://www.esd.whs.mil/DD/plainlanguage/",
    },
    {
      id: "accessibility",
      text: "Accessibility",
      href: "https://dodcio.defense.gov/DoDSection508/Std_Stmt.aspx",
    },
    {
      id: "contact-us",
      text: "Contact Us",
      href: "https://www.rmc.usace.army.mil/About-the-Center/Contact/",
    },
    {
      id: "quality-facts",
      text: "Quality Facts",
      href: "https://www.usace.army.mil/Resources/Information-Quality-Act/",
    },
    {
      id: "link-disclaimer",
      text: "Link Disclaimer",
      href: "https://www.usace.army.mil/Link-Disclaimer/",
    },
    {
      id: "privacy-security",
      text: "Privacy & Security",
      href: "https://www.usace.army.mil/Privacy-and-Security/",
    },
    {
      id: "site-map",
      text: "Site Map",
      href: "https://www.rmc.usace.army.mil/Site-Index/",
    },
    {
      id: "usa-dot-gov",
      text: "USA.gov",
      href: "https://www.usa.gov/",
    },
    {
      id: "no-fear-act",
      text: "No Fear Act",
      href: "https://prhome.defense.gov/NoFear/",
    },
    {
      id: "eeo-sharp",
      text: "EEO & SHARP",
      href: "https://www.sapr.mil/",
    },
    {
      id: "small-business",
      text: "Small Business",
      href: "https://www.usace.army.mil/Business-With-Us/Small-Business/",
    },
    {
      id: "open-government",
      text: "Open Government",
      href: "https://open.defense.gov/",
    },
  ];

  const externalLinks = [
    {
      id: "ig",
      text: "IG",
      href: "https://www.usace.army.mil/Who-We-Are/Engineer-Inspector-General/",
    },
    {
      id: "foia",
      text: "FOIA",
      href: "https://www.usace.army.mil/Resources/FOIA/",
    },
    {
      id: "isalute",
      text: "iSalute",
      href: "https://www.usainscom.army.mil/isalute/",
    },
  ];

  useEffect(() => {
    if (typeof document === "undefined") return;

    // Find the logo anchor specifically
    const logoAnchor = document
      .querySelector(
        'header a[href="/"] img[alt="U.S. Army Corps of Engineers"]'
      )
      ?.closest("a");

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
          <div className="ml-20 flex items-center gap-2">
            <ThemeToggle />
            <SearchBar />
          </div>
        }
        missionText="Deliver vital engineering solutions, in collaboration with our partners, to secure our Nation, energize our economy, and reduce disaster risk."
        aboutText="The official website of the Institute for Water Resources, Risk Management Center"
        usaceLinks={USACELinks}
        externalLinks={externalLinks}
        usaceLogo={false}
        usace250Logo={true}
      >
        {children}
      </SiteWrapper>
    </Layout>
  );
}
