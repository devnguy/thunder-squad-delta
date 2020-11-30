import React from "react";
import "./ThumbButton.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ThumbButton = ({ icon, onClick, active, color, backgroundColor }) => {
  return (
    <div
      className="thumbButton"
      style={
        active
          ? {
              borderColor: color,
              backgroundColor: backgroundColor,
            }
          : {
              borderColor: "#8f8f8f",
              backgroundColor: null,
            }
      }
      onClick={onClick}
    >
      <FontAwesomeIcon
        icon={icon}
        size="lg"
        color={active ? color : "#8f8f8f"}
      />
    </div>
  );
};

export default ThumbButton;
