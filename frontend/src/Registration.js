import regIcon from "./regIcon.PNG";
import React from "react";
import "./styles.css";

function InputField(props) {
  return (
    <input
      class="field"
      type="text"
      placeholder={props.name}
      id={props.name}
      name={props.name}
    />
  );
}

function Registration(props) {
  return (
    <div className="App">
      <div class="big">
        <h1> Bookswap </h1>
        <div id="regIcon">
          <img src={regIcon} alt="Man leaning on building for some reason" />
        </div>
        <form action="tbd" class="form">
          <label>
            <InputField name="Username" />
          </label>
          <InputField name="Email" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            class="field"
          />
          <ul class="req">
            <li> - 10 or more characters</li>
            <li> - 1 Upper Case Letter</li>
            <li> - 1 Lower Case Letter</li>
            <li> - 1 Special Character</li>
            <li> - 1 Number</li>
          </ul>
          <input
            type="password"
            placeholder="Re-Enter Password"
            name="password"
            class="field"
          />
          <InputField name="Address" />
          <InputField name="Apt #" />

          <select name="State" class="field" id="State">
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
          <InputField name="Zip" id="Zip" />
          <input type="submit" name="submitReg" id="submitReg" class="field" />
        </form>
      </div>
    </div>
  );
}

export default Registration;
