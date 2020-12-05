import React from "react";
import "./CustomInputField.css";

const CustomInputField = ({
  name,
  onChange,
  value,
  type = "text",
  ...props
}) => {
  return (
    <input
      className="customField"
      type={type}
      placeholder={name}
      name={name}
      onChange={onChange}
      value={value}
      {...props}
    />
  );
};

export default CustomInputField;
