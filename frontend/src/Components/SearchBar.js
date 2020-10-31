import React from "react";
import "./SearchBar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faSearch } from "@fortawesome/free-solid-svg-icons";

<FontAwesomeIcon icon={faCoffee} />;

function SearchBar(props) {
  return (
    <div className="searchContainer">
      <button className="filterButton">Filter
        <div className="filterButtonArrow" />
      </button>
      <div className="searchBar">
        <p className="searchBarPrompt">Search...</p>
        <button className="searchButton">
          <FontAwesomeIcon icon={faSearch} size="3x" color="#fffaff" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
