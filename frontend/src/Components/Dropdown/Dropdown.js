import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "./Dropdown.css";

const Dropdown = ({ title, options, buttonHeight = "40px", ...props }) => {
  const [selected, setSelected] = useState(title);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <div className="dropdownSection" {...props}>
      <button
        className="dropdownButton optionText"
        style={{ height: buttonHeight, minHeight: buttonHeight }}
        onClick={() => setDropdownOpen((arg) => !arg)}
      >
        <p style={{ margin: "0px 10px 0px 0px", display: "inline" }}>
          {selected}
        </p>
        {dropdownOpen && (
          <FontAwesomeIcon icon={faChevronUp} size="sm" color="#fffaff" />
        )}
        {!dropdownOpen && (
          <FontAwesomeIcon icon={faChevronDown} size="sm" color="#fffaff" />
        )}
      </button>
      {dropdownOpen && (
        <div className="dropdown">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                setSelected(option);
                setDropdownOpen(false);
              }}
              className={
                index < options.length - 1
                  ? "dropdownCell optionText cellWithBorder"
                  : "dropdownCell optionText"
              }
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
