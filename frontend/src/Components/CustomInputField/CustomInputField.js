import React from "react";
import "./CustomInputField.css";

const CustomInputField = ({ name, onChange, value, type = "text" }) => {
  return (
    <input
      className="customField"
      type={type}
      placeholder={name}
      name={name}
      onChange={onChange}
      value={value}
    />
  );
};

export default CustomInputField;
