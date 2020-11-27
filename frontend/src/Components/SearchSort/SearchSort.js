import React, { useState } from "react";
import "./SearchSort.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const filter_categories = [
  "Cost (↓)",
  "Cost (↑)",
  "Condition (↓)",
  "Condition (↑)",
];

function SearchSort(props) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterTerm, setFilterTerm] = useState("Cost (↓)");
  return (
    <div className="searchSortContainer">
      <button
        className="searchSortButton sortText"
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
        <div className="searchSortDropdown">
          {filter_categories.map((category, index) => (
            <button
              key={index}
              className={
                index < 3
                  ? "dropdownBox sortText boxWithBorder"
                  : "dropdownBox sortText"
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
  );
}

export default SearchSort;
