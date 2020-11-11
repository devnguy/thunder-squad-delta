import React, { useState } from "react";
import "./SearchBar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ height, width }) {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <form>
      <div
        style={{ height: "50px", width: "600px" }}
        className="searchContainer"
      >
        <button className="filterButton">
          Filter
          {/* <select className="filterButton">
          <option selected value="title">
            Title
          </option>
          <option value="author">Author</option>
          <option value="genre">Genre</option> */}
          <div className="filterButtonArrow" />
        </button>
        {/* </select> */}
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search..."
            className="searchBarPrompt"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="searchButton">
            <FontAwesomeIcon icon={faSearch} size="2x" color="#fffaff" />
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
