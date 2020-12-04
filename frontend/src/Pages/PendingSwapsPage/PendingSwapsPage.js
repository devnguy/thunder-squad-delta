import React, { useContext, useState, useEffect } from "react";

import { PendingSwapsRow, ShippingModal } from "../../Components";
import useApi from "../../Api/useApi";
import requests from "../../Api/requests";
import AuthContext from "../../Context/AuthContext";

import "./PendingSwapsPage.css";

function PendingSwapsPage(props) {
  const allSwaps = useApi(requests.getUserSwaps);
  const statusChange = useApi(requests.changeSwapStatus);
  const pointChange = useApi(requests.changePoints);
  const { userId } = useContext(AuthContext);
  const [tabSelect, setTabSelect] = useState("give");
  const [shippingVisible, setShippingVisible] = useState(false);
  const [currentSwap, setCurrentSwap] = useState(null);
  const [newData, setNewData] = useState(false);

  useEffect(() => {
    allSwaps.request("3");
  }, []);

  useEffect(() => {
    allSwaps.request("3");
  }, [shippingVisible]);

  useEffect(() => {
    allSwaps.request("3");
  }, [newData]);

  const onShipped = () => {
    statusChange.request(currentSwap.id, "shipping");
  };

  return (
    <div className="pSwapPageContainer">
      <div className="topHolder">
        <div className="pSwapTitle"> Pending Swaps</div>
        <div className="pSwapTabHolder">
          <div
            onClick={() => setTabSelect("get")}
            className="pSwapTab"
            style={
              tabSelect === "give" ? { borderBottom: "1px solid black" } : null
            }
          >
            Get
          </div>
          <div
            onClick={() => setTabSelect("give")}
            className="pSwapTab"
            style={
              tabSelect === "get" ? { borderBottom: "1px solid black" } : null
            }
          >
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
        {tabSelect === "give" &&
          allSwaps.data.owned &&
          allSwaps.data.owned.map(
            ({ status, book, date_requested, receiver, cost, id }, index) =>
              status != "available" &&
              status != null && (
                <PendingSwapsRow
                  key={index}
                  cover={book.image}
                  title={book.title}
                  otherUser={receiver ? receiver.name : null}
                  swap_id={id}
                  {...{ cost }}
                  dateRequested={date_requested}
                  {...{ status }}
                  openShip={() => {
                    setShippingVisible(true);
                    setCurrentSwap(allSwaps.data.owned[index]);
                  }}
                  onAccept={() => {
                    console.log("accept");
                    statusChange.request(id, "accepted");
                    setNewData(!newData);
                  }}
                  onReject={() => {
                    console.log("reject");
                    statusChange.request(id, "available");
                    setNewData(!newData);
                  }}
                  isGet={false}
                />
              )
          )}

        {tabSelect === "get" &&
          allSwaps.data.requested &&
          allSwaps.data.requested.map(
            (
              { status, book, date_requested, owner, cost, id, receiver },
              index
            ) => (
              <PendingSwapsRow
                key={index}
                cover={book.image}
                title={book.title}
                otherUser={owner.name}
                swap_id={id}
                {...{ cost }}
                {...{ date_requested }}
                {...{ status }}
                isGet={true}
                onConfirm={() => {
                  statusChange.request(id, "completed");
                  console.log(owner.id);
                  console.log(receiver.id);
                  console.log(cost * -1);
                  pointChange.request(owner.id, cost);
                  pointChange.request(receiver.id, cost * -1);

                  setNewData(!newData);
                }}
              />
            )
          )}
      </div>
      {shippingVisible && (
        <ShippingModal
          currentSwap={currentSwap}
          closeModal={() => setShippingVisible(false)}
          onShipped={() => {
            onShipped();
            setShippingVisible(false);
          }}
        />
      )}
    </div>
  );
}

export default PendingSwapsPage;
