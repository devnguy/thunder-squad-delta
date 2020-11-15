import React from "react";
import "./InfoRow.css";

function InfoRow({ label, value }) {
  return (
    <div className="infoRow">
      <p className="info">{label}</p>
      <p className="info">{value}</p>
    </div>
  );
}

export default InfoRow;
