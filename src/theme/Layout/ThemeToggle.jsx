import React from "react";
import { useColorMode } from "@docusaurus/theme-common";
import useIsBrowser from "@docusaurus/useIsBrowser";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function ThemeToggle() {
  const isBrowser = useIsBrowser();
  const cm = useColorMode();
  const lightUrl = useBaseUrl("/img/LightTheme.png");
  const darkUrl = useBaseUrl("/img/DarkTheme.png");

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
