import React from "react";

import "./PendingSwapsRow.css";
import Button from "../Button";

import DefaultImage from "../../Assets/Book Cover.png";

function Capitalize(str) {
  if (str !== null) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

function PendingSwapsRow({
  status,
  cover,
  title,
  dateRequested,
  otherUser,
  cost,
  swap_id,
  openShip,
  onAccept,
  onReject,
  onConfirm,
  isGet,
}) {
  return (
    <div className="pSwapRow">
      <div className="pSwapStatus pSwapCell">
        <p className="pSwapStatusTxt">{Capitalize(status)}</p>
      </div>
      <div className="pSwapBookDetails pSwapCell">
        <img
          className="pSwapBookImg"
          alt=""
          src={cover ? cover : DefaultImage}
        />
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
      {status === "requested" && (
        <div className="pSwapActions pSwapCell">
          <Button
            onClick={onAccept}
            style={{ background: "#12BA85", width: "40%" }}
          >
            Accept
          </Button>
          <Button
            onClick={onReject}
            style={{ background: "#D8315B", width: "40%" }}
          >
            Reject
          </Button>
        </div>
      )}
      {status === "accepted" && (
        <div className="pSwapActions pSwapCell">
          <Button
            onClick={openShip}
            style={{ background: "#0A2463", width: "50%", height: "30%" }}
          >
            Shipping Info
          </Button>
        </div>
      )}
      {status === "shipping" && isGet && (
        <div className="pSwapActions pSwapCell">
          <Button
            onClick={onConfirm}
            style={{ background: "#12BA85", width: "50%", height: "30%" }}
          >
            Confirm Receipt
          </Button>
        </div>
      )}
      {status !== "accepted" &&
        status !== "requested" && !isGet &&
          <div className="pSwapActions pSwapCell"></div>}
    </div>
  );
}

export default PendingSwapsRow;
