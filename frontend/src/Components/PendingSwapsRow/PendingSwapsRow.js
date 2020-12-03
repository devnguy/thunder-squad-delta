import React from "react";

import "./PendingSwapsRow.css";
import { Link } from "react-router-dom";
import Button from "../Button";

import DefaultImage from "../../Assets/Book Cover.png";

function PendingSwapsRow(status, cover, title, dateRequested, otherUser, cost) {
  return (
    <div className="pSwapRow">
      <div className="pSwapStatus pSwapCell">
        <p className="pSwapStatusTxt">{status}</p>
      </div>
      <div className="pSwapBookDetails pSwapCell">
        
        <img className="pSwapBookImg" alt="" src={cover ? cover : DefaultImage} />
        <p className="pSwapTitleTxt">{title}</p>
      </div>
      <div className="pSwapDate pSwapCell">
        <p className="pSwapDateTxt">{dateRequested}</p>
      </div>
      <div className="pSwapOtherUser pSwapCell">
  <p className="pSwapGetterTxt">{otherUser}</p>
      </div>
      <div className="pSwapCost pSwapCell">
        <p className="pSwapCostTxt"> {cost}</p>
      </div>
      <div className="pSwapActions pSwapCell">
            <Button style={{background:"#12BA85", width:"40%"}}>Accept</Button>
            <Button style={{background:"#D8315B", width: "40%"}}>Reject</Button>
      </div>
    </div>
  );
}

export default PendingSwapsRow;
