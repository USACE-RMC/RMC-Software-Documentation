import React, { useEffect } from "react";

export default function SearchBar() {
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
