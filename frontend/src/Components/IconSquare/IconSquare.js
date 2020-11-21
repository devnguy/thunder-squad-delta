import React from "react";
import "./IconSquare.css";

function IconSqaure({ text, image }) {
  return (
    <div className="heuristicSquare">
      <img className="heuristicIcon" src={image} alt="" />
      <p className="heuristicText">{text}</p>
    </div>
  );
}

export default IconSqaure;
