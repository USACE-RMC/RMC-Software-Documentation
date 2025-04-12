import React, { useEffect } from "react";
import "../css/content-box.css";
import "../css/search-bar.css";

export default function SearchBar() {
  useEffect(() => {
    // Create the script element to load the Pagefind script
    const script = document.createElement("script");
    script.src = "/RMC-Software-Documentation/pagefind/pagefind.js";
    script.async = true;
    script.onload = () => {
      console.log("Pagefind script loaded successfully");

      // Initialize Pagefind after script has loaded
      const inputElement = document.getElementsByClassName("search-input")[0];
      const resultsElement =
        document.getElementsByClassName("search-results")[0];

      inputElement.addEventListener("input", () => {
        // Make sure Pagefind runs on input change
        Pagefind.search(inputElement.value, resultsElement);
        if (resultsElement) {
          resultsElement.style.display = "block"; // Show results
        }
      });
    };

    // Append the script to the body
    document.body.appendChild(script);

    return () => {
      // Clean up by removing the script when the component unmounts
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
