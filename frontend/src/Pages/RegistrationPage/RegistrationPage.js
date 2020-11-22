import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import requests from "../../Api/requests";
import useApi from "../../Api/useApi";
import AuthContext from "../../Context/AuthContext";
import { CustomInputField } from "../../Components";

import StatesData from "./states";
import RegIcon from "../../Assets/RegIcon.png";
import "./RegistrationPage.css";

function RegistrationPage(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="bigReg">
      <div id="regIconHolder">
        <img
          src={RegIcon}
          className="regIcon"
          alt="Man leaning on building for some reason"
        />
      </div>
      <div action="tbd" className="formReg">
        <label>
          <CustomInputField
            name="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <CustomInputField
          name="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <CustomInputField
          name="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ul className="requirementsReg">
          <li> - 10 or More Characters</li>
          <li> - 1 Upper Case Letter</li>
          <li> - 1 Lower Case Letter</li>
          <li> - 1 Special Character</li>
          <li> - 1 Number</li>
        </ul>
        <input
          type="password"
          placeholder="Re-Enter Password"
          name="password"
          className="fieldReg"
        />
        <CustomInputField
          name="Address"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />

        <CustomInputField
          name="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <select
          name="State"
          className="field"
          id="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="Select a state">Select a state</option>
          {StatesData.map(({ name, abbreviation }, index) => (
            <option key={index} value={name}>
              {abbreviation}
            </option>
          ))}
        </select>
        <CustomInputField
          name="Zip"
          id="Zip"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <button
          name="submitReg"
          id="submitRegistration"
          className="fieldReg"
          onClick={handleRegister}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default RegistrationPage;
