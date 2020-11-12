import React, { useState } from "react";
import "./SearchBar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterTerm, setFilterTerm] = useState("Filter");
  return (
    <div className="searchContainer">
      <div className="filterContainer">
        <button
          className="filterButton filterText"
          onClick={() => setFilterOpen((filterOpen) => !filterOpen)}
        >
          {filterTerm}
          {filterOpen && (
            <FontAwesomeIcon icon={faChevronUp} size="sm" color="#fffaff" />
          )}
          {!filterOpen && (
            <FontAwesomeIcon icon={faChevronDown} size="sm" color="#fffaff" />
          )}
        </button>
        {filterOpen && (
          <div className="dropdown">
            <button
              className="dropdownCell filterText cellWithBorder"
              onClick={() => {
                setFilterTerm("Title");
                setFilterOpen(false);
              }}
            >
              Title
            </button>
            <button
              className="dropdownCell filterText cellWithBorder"
              onClick={() => {
                setFilterTerm("Author");
                setFilterOpen(false);
              }}
            >
              Author
            </button>
            <button
              className="dropdownCell filterText cellWithBorder"
              onClick={() => {
                setFilterTerm("Genre");
                setFilterOpen(false);
              }}
            >
              Genre
            </button>
            <button
              className="dropdownCell filterText"
              onClick={() => {
                setFilterTerm("User");
                setFilterOpen(false);
              }}
            >
              User
            </button>
          </div>
        )}
      </div>
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
  );
}

export default SearchBar;
