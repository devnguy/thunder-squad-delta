import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import "./ShippingModal.css";

import Button from "../Button";
import useApi from "../../Api/useApi";
import requests from "../../Api/requests";

function ShippingModal(){
return (
<div className="shippingModal">
  <div className="leftShippingModal">
    <p className="pleaseTxt">Please ship Hatchet to the address below:</p>
    <div className="pSwapAddressHolder">
      <p className="pSwapAddressTxt"> John Smith </p>
      <p className="pSwapAddressTxt"> 1234 Weast St </p>
      <p className="pSwapAddressTxt"> Georgetown, GA 12345 </p>
    </div>
  </div>
  <div className="rightShippingModal">
  <div id="closeShippingModalIcon">
          <FontAwesomeIcon
            icon={faTimesCircle}
            size="2x"
          />
        </div>
    <div className="modalButtonHolder">
    <p className="modalLetTxt">Let us know once the book is in the mail!</p>
    <Button style={{ background: "#3E92CC", width: "70%" }}>Shipped!</Button>
    </div>
  </div>
</div>

)

}
export default ShippingModal;