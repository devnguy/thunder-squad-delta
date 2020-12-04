import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import "./ShippingModal.css";

import Button from "../Button";
import useApi from "../../Api/useApi";
import requests from "../../Api/requests";

function ShippingModal({ closeModal, currentSwap, onShipped }) {
  return (
    <div className="shippingModal">
      <div className="leftShippingModal">
        <p className="pleaseTxt">
          Please ship "{currentSwap.book.title}" to the address below:
        </p>
        <div className="pSwapAddressHolder">
          <p className="pSwapAddressTxt"> {currentSwap.receiver.name} </p>
          <p className="pSwapAddressTxt"> {currentSwap.receiver.street} </p>
          <p className="pSwapAddressTxt">
            {" "}
            {currentSwap.receiver.city}, {currentSwap.receiver.state}{" "}
          </p>
        </div>
      </div>
      <div className="rightShippingModal">
        <div id="closeShippingModalIcon">
          <FontAwesomeIcon
            icon={faTimesCircle}
            size="2x"
            onClick={closeModal}
          />
        </div>
        <div className="modalButtonHolder">
          <p className="modalLetTxt">
            Let us know once the book is in the mail!
          </p>
          <Button
            onClick={onShipped}
            style={{ background: "#3E92CC", width: "70%" }}
          >
            Shipped!
          </Button>
        </div>
      </div>
    </div>
  );
}
export default ShippingModal;
