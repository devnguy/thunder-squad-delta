import React from "react";
import "./CustomInputField.css";

const CustomInputField = ({ name, onChange }) => {
  return (
    <input
      className="customField"
      type="text"
      placeholder={name}
      name={name}
      onChange={onChange}
    />
  );
};

export default CustomInputField;