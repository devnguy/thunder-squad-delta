import React from "react";
import "./login.css";
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
        <img src={regIcon} alt="Woman reading"/>
        </div>
        <form action="tbd" class="form">
          <h2> Login </h2>
          <label>
            <InputField name="Username" />
          </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            class="field"
          />
          <div>
			<h4>Register</h4>
			<h4>Forgot Password</h4>
			<input type="submit" name="submitReg" id="submitReg" class="field"/>
		  </div>
          <input type="submit" name="submitReg" id="submitReg" class="field"/>
        </form>
      </div>
    </div>
  );
}
