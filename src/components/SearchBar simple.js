import React, { useEffect } from "react";
import "../css/content-box.css";
import "../css/search-bar.css";

export default function SearchBar() {
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
