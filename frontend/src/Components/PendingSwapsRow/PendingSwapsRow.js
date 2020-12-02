import React from "react";

import "./PendingSwapsRow.css";
import { Link } from "react-router-dom";
import Button from "../Button";

function PendingSwapsRow() {
  return (
    <div className="pSwapRow">
      <div className="pSwapStatus pSwapCell">
        {/* <p className="pSwapStatusTxt">Waiting on Response</p> */}
      </div>
      <div className="pSwapBookDetails pSwapCell">
        <div className="fakeCover"></div> 
        {/* <img className="pSwapBookImg" alt="" src={cover} /> */}
        {/* <p className="pSwapTitleTxt">The Hobbit</p> */}
      </div>
      <div className="pSwapDate pSwapCell">
        {/* <p className="pSwapDateTxt">1/3/2020</p> */}
      </div>
      <div className="pSwapOtherUser pSwapCell">
        {/* <p className="pSwapGetterTxt">Joe</p> */}
      </div>
      <div className="pSwapCost pSwapCell">
        {/* <p className="pSwapCostTxt"> 20</p> */}
      </div>
      <div className="pSwapActions pSwapCell">
            <Button>Accept</Button>
            <Button>Reject</Button>
      </div>
    </div>
  );
}

export default PendingSwapsRow;
