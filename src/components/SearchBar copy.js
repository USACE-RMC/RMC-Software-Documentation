import React, { useEffect } from "react";

export default function SearchBar() {
  useEffect(() => {
    console.log("SearchBar component mounted");
    const script = document.createElement("script");
    script.src = "/RMC-Software-Documentation/pagefind/pagefind.js";
    script.async = true;
    document.body.appendChild(script);

    // Ensure the results container is hidden initially
    document.getElementById("search-input").addEventListener("input", () => {
      const results = document.getElementById("search-results");
      if (results) results.style.display = "block";
    });

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="search-container">
      <input
        id="search-input"
        type="search"
        placeholder="Search..."
        autoComplete="off"
      />
      <div id="search-results">
        {/* Pagefind will populate this dynamically */}
      </div>
    </div>
  );
}
