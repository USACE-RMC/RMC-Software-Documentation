import React from "react";
import SearchBar from "@theme-original/SearchBar";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function SearchBarWrapper(props) {
  const iconUrl = useBaseUrl("/img/Magnifying_glass_icon.svg");
  return (
    <div className="relative w-full min-w-[12rem] max-w-md">
      {/* Left icon */}
      <img src={iconUrl} alt="" aria-hidden="true" className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 h-[13px] w-[13px] opacity-80" />
      {/* DocSearch trigger */}
      <SearchBar {...props} />
    </div>
  );
}
