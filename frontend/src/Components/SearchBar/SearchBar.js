import React, { useState } from "react";
import "./SearchBar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

const filter_categories = ["Title", "Author", "Genre", "User"];

function SearchBar({ navBarVariant = false }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterTerm, setFilterTerm] = useState("Title");
  return (
    <div
      className="searchContainer"
      style={
        navBarVariant
          ? {
              height: "40px",
              width: "500px",
              marginRight: "20px",
              marginLeft: "20px",
            }
          : {
              height: "50px",
              width: "600px",
              marginRight: "0px",
              marginLeft: "0px",
            }
      }
    >
      <div className="filterContainer">
        <button
          className="filterButton filterText"
          style={{
            height: navBarVariant ? "40px" : "50px",
            fontSize: navBarVariant ? "16px" : "18px",
          }}
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
      <div
        className="searchBar"
        style={{
          border: navBarVariant ? "2px solid #3e92cc" : "3px solid #3e92cc",
        }}
      >
        <input
          type="text"
          placeholder="Search..."
          className="searchBarPrompt"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ fontSize: navBarVariant ? "17px" : "20px" }}
        />
        <button
          className="searchButton"
          style={
            navBarVariant
              ? {
                  width: "30px",
                  height: "30px",
                  fontSize: "9px",
                }
              : {
                  width: "37px",
                  height: "37px",
                  fontSize: "11px",
                }
          }
        >
          <Link to="/search">
            <FontAwesomeIcon icon={faSearch} size="2x" color="#fffaff" />
          </Link>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
