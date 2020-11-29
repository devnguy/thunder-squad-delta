import React, { useState } from "react";
import "./SearchBar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

import { useHistory } from "react-router-dom";

const filter_categories = ["Title", "Author", "Genre", "User"];

function SearchBar({ navBarVariant = false }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("Title");
  const [filterOpen, setFilterOpen] = useState(false);
  let history = useHistory();

  const handleSearch = () => {
    if (searchTerm !== "") {
      history.push(`/search/${filterTerm}/${searchTerm}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className="outerSearchContainer"
      id={navBarVariant ? "navOuterSearchContainer" : null}
    >
      <div className="searchContainer">
        <div className="filterContainer">
          <button
            className="filterButton filterText"
            id={navBarVariant ? "navFilterButton" : null}
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
            <div className="searchDropdown">
              {filter_categories.map((category, index) => (
                <button
                  key={index}
                  className={
                    index < 3
                      ? "searchDropdownCell filterText searchCellWithBorder"
                      : "searchDropdownCell filterText"
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
        <div className="searchBar" id={navBarVariant ? "navSearchBar" : null}>
          <input
            type="text"
            placeholder="Search..."
            className="searchBarPrompt"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            id={navBarVariant ? "navSearchBarPrompt" : null}
          />
          <button
            onClick={() => handleSearch()}
            id={navBarVariant ? "navSearchButton" : null}
            className="searchButton"
          >
            <FontAwesomeIcon icon={faSearch} size="2x" color="#fffaff" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
