import { useEffect } from "react";

/**
 * Measures the Groundwork sticky header and updates Docusaurus CSS vars:
 *   --ifm-navbar-height, --ifm-scroll-padding-top
 */
export default function useHeaderOffsets(selector = "header.gw-sticky.gw-top-0") {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const header = document.querySelector(selector);
    if (!header) return;

    const setVars = () => {
      const h = Math.ceil(header.getBoundingClientRect().height || 0);
      const root = document.documentElement;
      root.style.setProperty("--ifm-navbar-height", `${h}px`);
      root.style.setProperty("--ifm-scroll-padding-top", `${h}px`);
    };

    const raf = requestAnimationFrame(setVars);
    const ro = new ResizeObserver(setVars);
    ro.observe(header);

    window.addEventListener("resize", setVars);
    window.addEventListener("orientationchange", setVars);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", setVars);
      window.removeEventListener("orientationchange", setVars);
    };
  }, [selector]);
}
