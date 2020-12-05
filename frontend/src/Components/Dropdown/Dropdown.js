import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "./Dropdown.css";

const theme = {
  red: {
    primary: "#d8315b",
    background: "#e26584",
  },
  blue: {
    primary: "#3e92cc",
    secondary: "#65a4d1",
  },
};

const Dropdown = ({
  title,
  options,
  buttonHeight = "40px",
  onSelect,
  color = "red",
  width = "50%",
}) => {
  const [selected, setSelected] = useState(title);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <div
      className="dropdownSection"
      style={{ width, height: options.length > 4 ? "225px" : buttonHeight }}
    >
      <button
        className="dropdownButton optionText"
        style={{
          height: buttonHeight,
          minHeight: buttonHeight,
          backgroundColor: theme[color]["primary"],
        }}
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
        <div
          className="dropdown"
          style={{
            backgroundColor: theme[color]["primary"],
            overflow: options.length > 4 ? "scroll" : null,
          }}
        >
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                setSelected(option);
                setDropdownOpen(false);
                onSelect(option);
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
