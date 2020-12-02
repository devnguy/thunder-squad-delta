import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Button, PendingSwapsRow } from "../../Components";
import useApi from "../../Api/useApi";
import requests from "../../Api/requests";

import "./PendingSwapsPage.css";

function PendingSwapsPage(props) {
  return (
    <div className="pSwapPageContainer">
        <div className="topHolder"><div className="pSwapTitle"> Pending Swaps</div>
        <div className="pSwapTabHolder">
          <div className= "pSwapTab" style={{border:"1px solid black"}}>Get</div>
          <div className="pSwapTab">Give</div>
        </div></div>
        
      
      <div className="pSwapTableSeparator"></div>
      <div className="pSwapTableHeader">
        <div className="pSwapHeaderStatus pSwapHeaderCell">Status</div>
        <div className="pSwapHeaderBookDetails pSwapHeaderCell">Book</div>
        <div className="pSwapHeaderDate pSwapHeaderCell">Date</div>
        <div className="pSwapHeaderOtherUser pSwapHeaderCell">Other User</div>
        <div className="pSwapHeaderCost pSwapHeaderCell">Cost</div>
        <div className="pSwapHeaderActions pSwapHeaderCell">Actions</div>
      </div>
      <div className="pSwapRowHolder ">
        <PendingSwapsRow />
        <PendingSwapsRow />
        <PendingSwapsRow />

      </div>
    </div>
  );
}

export default PendingSwapsPage;
