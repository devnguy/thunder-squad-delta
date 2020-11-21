import React, { useContext, useEffect, useImperativeHandle, useState } from "react";
import RegIcon from "../../Assets/RegIcon.png";
import "./RegistrationPage.css";
import { useHistory } from "react-router-dom";
import requests from "../../Api/requests";
import useApi from "../../Api/useApi";
import AuthContext from "../../Context/AuthContext"

function InputField(props) {
  return (
    <input
      class="fieldReg"
      type="text"
      placeholder={props.name}
      name={props.name}
      onChange={props.onChange}
    />
  );
}

function RegistrationPage(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [password, setPassword] = useState("");

  const registration = useApi(requests.registerUser);
  const {userId, setUserId} = useContext(AuthContext);
  let history = useHistory();

  const handleRegister = () => {
    if (username !== "" && email !== "" && password !== "") {
      registration.request(username, email, password);
    }
  };

  useEffect(() => {
    if (registration.data.status === true) {
      setUserId(registration.data.id);    
      
      history.push(`/`)
    }
  }, [registration.data]);

  return (
    <div class="bigReg">
      <div id="regIconHolder">
        <img
          src={RegIcon}
          className="regIcon"
          alt="Man leaning on building for some reason"
        />
      </div>
      <div action="tbd" class="formReg">
        <label>
          <InputField
            name="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <InputField
          name="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          name="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ul class="requirementsReg">
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
          class="fieldReg"
        />
        <InputField
          name="Address"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />

        <InputField
          name="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <select
          name="State"
          class="field"
          id="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="Select a state">Select a state</option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
        <InputField
          name="Zip"
          id="Zip"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <button
          name="submitReg"
          id="submitRegistration"
          class="fieldReg"
          onClick={handleRegister}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default RegistrationPage;
