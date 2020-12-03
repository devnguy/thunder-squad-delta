import React, { useContext, useState, useEffect } from "react";

import { PendingSwapsRow } from "../../Components";
import useApi from "../../Api/useApi";
import requests from "../../Api/requests";
import AuthContext from "../../Context/AuthContext";

import "./PendingSwapsPage.css";

function PendingSwapsPage(props) {
  const allSwaps = useApi(requests.getUserSwaps);
  const { userId } = useContext(AuthContext);
  const [tabSelect, setTabSelect] = useState("give");

  useEffect(() => {
    allSwaps.request("1");
  }, []);

  return (
    <div className="pSwapPageContainer">
      <div className="topHolder">
        <div className="pSwapTitle"> Pending Swaps</div>
        <div className="pSwapTabHolder">
          <div
            onClick={()=>setTabSelect("get")}
            className="pSwapTab"
            style={tabSelect=== "give" ? { borderBottom: "1px solid black" }:null}
          >
            Get
          </div>
          <div onClick={()=>setTabSelect("give")} className="pSwapTab"
          style={tabSelect=== "get" ? { borderBottom: "1px solid black" }:null}>
            Give
          </div>
        </div>
      </div>

      <div className="pSwapTableSeparator"></div>
      <div className="pSwapTableHeader">
        <div className="pSwapHeaderStatus pSwapHeaderCell">Status</div>
        <div className="pSwapHeaderBookDetails pSwapHeaderCell">Book</div>
        <div className="pSwapHeaderDate pSwapHeaderCell">Date Requested</div>
        <div className="pSwapHeaderOtherUser pSwapHeaderCell">Other User</div>
        <div className="pSwapHeaderCost pSwapHeaderCell">Cost</div>
        <div className="pSwapHeaderActions pSwapHeaderCell">Actions</div>
      </div>
      <div className="pSwapRowHolder ">
          <>
        {tabSelect === "give" && 
            allSwaps.data.owned &&
              allSwaps.data.owned.map(
                (
                  { status, book, date_requested, receiver, cost, id },
                  index
                ) => (status != "available" &&
                <PendingSwapsRow
                    key={index}
                    cover={book.image}
                    title={book.title}
                    otherUser={receiver ? receiver.name : null}
                    swap_id={id}
                    {...{ cost }}
                    {...{ date_requested }}
                    {...{ status }}
                  />
              
                  
                )
              )
        }


        {tabSelect === "get" && 
            allSwaps.data.requested &&
              allSwaps.data.requested.map(
                ({ status, book, date_requested, owner, cost, id }, index) => (
                  <PendingSwapsRow
                    key={index}
                    cover={book.image}
                    title={book.title}
                    otherUser={owner.name}
                    swap_id={id}
                    {...{ cost }}
                    {...{ date_requested }}
                    {...{ status }}
                  />
                )
              )
        }
        </>
      </div>
    </div>
  );
}

export default PendingSwapsPage;
