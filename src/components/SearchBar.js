import React, { useEffect } from "react";
import "../css/content-box.css";
import "../css/search-bar.css";

export default function SearchBar() {
  useEffect(() => {
    console.log("SearchBar component mounted");
    const script = document.createElement("script");
    script.src = "/RMC-Software-Documentation/pagefind/pagefind.js";
    script.async = true;
    document.body.appendChild(script);

    // Ensure the results container is hidden initially
    const inputElement = document.getElementsByClassName("search-input")[0];
    inputElement.addEventListener("input", () => {
      const results = document.getElementsByClassName("search-results")[0];
      if (results) results.style.display = "block";
    });

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="search"
        placeholder="Search..."
        autoComplete="off"
      />
      <div className="search-results">
        {/* Pagefind will populate this dynamically */}
      </div>
    </div>
  );
}
