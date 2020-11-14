import React from "react";
import "./login.css";
import regIcon from './regIcon.PNG'
import { Link } from "react-router-dom";

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

function Login() {
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
			<h4>
      <Link to="/Registration">Register</Link>
      </h4>
			<h4>
      <Link to="/ResetPassword">Forgot Password</Link>
      </h4>
			<input type="submit" name="submitReg" id="submitReg" class="field"/>
		  </div>
      <Link to="/Homepage"><input type="submit" name="submitReg" id="submitReg" class="field"/></Link>
        </form>
      </div>
    </div>
  );
}

export default Login;