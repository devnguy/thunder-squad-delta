import React from "react";
import "./SearchBar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faSearch } from "@fortawesome/free-solid-svg-icons";

<FontAwesomeIcon icon={faCoffee} />;

function SearchBar({ height, width }) {
  return (
    <div style={{ "height": "50px", "width": "600px" }} className="searchContainer">
      <button className="filterButton">
        Filter
        <div className="filterButtonArrow" />
      </button>
      <div className="searchBar">
        <p className="searchBarPrompt">Search...</p>
        <button className="searchButton">
          <FontAwesomeIcon icon={faSearch} size="2x" color="#fffaff" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
