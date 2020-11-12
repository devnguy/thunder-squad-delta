import React, { useState } from "react";
import "./SearchBar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

const filter_categories = ["Title", "Author", "Genre", "User"];

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
            {filter_categories.map((category, index) => (
              <button
                key={index}
                className={
                  index < 3
                    ? "dropdownCell filterText cellWithBorder"
                    : "dropdownCell filterText"
                }
                onClick={() => {
                  setFilterTerm(category);
                  setFilterOpen(false);
                }}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>
      <form className="searchBar">
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
      </form>
    </div>
  );
}

export default SearchBar;
