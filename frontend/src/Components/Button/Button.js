import React from "react";
import "./Button.css";

const palette = {
  red: "#d8315b",
  blue: "#3e92cc",
};

const Button = ({ children, onClick, color = "red", outline = false }) => {
  const themeColor = palette[color];
  return (
    <div
      className="buttonContainer"
      style={
        outline
          ? { border: "2px solid " + themeColor }
          : { backgroundColor: themeColor }
      }
      onClick={onClick}
    >
      <p className="buttonText" style={outline ? { color: themeColor } : null}>
        {children}
      </p>
    </div>
  );
};

export default Button;
