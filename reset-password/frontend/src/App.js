import React from "react";
import "./reset-password.css";
import regIcon from './regIcon.PNG'

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

export default function App() {
  return (
    <div className="App">
      <div class="big">
        <h1> Bookswap </h1>
		
        <div id="regIcon">
        <img src={regIcon} alt="Lost in thought"/>
        </div>
        <form action="tbd" class="form">
          <h2> Create Password </h2>
          <label>
            <InputField name="New Password" />
          </label>
		  <ul class="req">
            <li> - 10 or more characters</li>
            <li> - 1 Upper Case Letter</li>
            <li> - 1 Lower Case Letter</li>
            <li> - 1 Special Character</li>
            <li> - 1 Number</li>
          </ul>
          <label>
            <InputField name="Confirm Password" />
          </label>
		  <ul class="req">
            <li> - Matches previous field</li>
          </ul>
          
          <input type="submit" name="submitReg" id="submitReg" class="field"/>
        </form>
      </div>
    </div>
  );
}
