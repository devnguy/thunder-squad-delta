import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import requests from "../../Api/requests";
import useApi from "../../Api/useApi";
import AuthContext from "../../Context/AuthContext";
import { CustomInputField, Button } from "../../Components";

import StatesData from "./states";
import RegIcon from "../../Assets/RegIcon.png";
import "./RegistrationPage.css";

function RegistrationPage(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const registration = useApi(requests.registerUser);
  const { setUserId } = useContext(AuthContext);
  let history = useHistory();

  const handleRegister = () => {
    if (username !== "" && email !== "" && password !== "") {
      registration.request(username, email, password);
    }
  };

  useEffect(() => {
    if (registration.data.status === true) {
      setUserId(registration.data.id);
      history.push(`/`);
    }
  }, [registration.data]);

  return (
    <div className="registerPage">
      <div id="regIconSection">
        <img src={RegIcon} alt="" id="regIcon" />
      </div>
      <div id="regFormSection">
        <p className="regTitle">Register</p>
        <CustomInputField
          name="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        <CustomInputField
          name="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <CustomInputField
          name="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <CustomInputField
          name="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <CustomInputField
          name="Street Address"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <CustomInputField
          name="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <CustomInputField
          name="Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <Button onClick={handleRegister}>Register</Button>
      </div>
    </div>
  );
}

export default RegistrationPage;
