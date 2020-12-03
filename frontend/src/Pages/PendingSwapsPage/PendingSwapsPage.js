import React, { useContext, useState, useEffect } from "react";

import { PendingSwapsRow } from "../../Components";
import useApi from "../../Api/useApi";
import requests from "../../Api/requests";
import AuthContext from "../../Context/AuthContext";

import "./PendingSwapsPage.css";

function PendingSwapsPage(props) {
  const allSwaps = useApi(requests.getUserSwaps);
  const { userId } = useContext(AuthContext);
  const [giveSwaps, setGiveSwaps] = useState(null);

  useEffect(() => {
    allSwaps.request(userId);
  }, []);

  return (
    <div className="pSwapPageContainer">
      <div className="topHolder">
        <div className="pSwapTitle"> Pending Swaps</div>
        <div className="pSwapTabHolder">
          <div className="pSwapTab" style={{ border: "1px solid black" }}>
            Get
          </div>
          <div className="pSwapTab">Give</div>
        </div>
      </div>

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
        <>
          {allSwaps.data.owned.map(
            ({ status, book, date_requested, receiver, cost }, index) => (
              <PendingSwapsRow
                key={index}
                cover={book.image}
                title={book.title}
                otherUser={receiver.name}
                {...{ cost }}
                {...{ date_requested }}
                {...{ status }}
              />
            )
          )}
        </>
      </div>
    </div>
  );
}

export default PendingSwapsPage;
