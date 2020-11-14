import React from "react";
import "./login.css";
import regIcon from './regIcon.PNG'
import { Link } from "react-router-dom";

function InputField(props) {
  return (
    <input
      className="field"
      type="text"
      placeholder={props.name}
      id={props.name}
      name={props.name}
    />
  );
}

function Login() {
  return (
    <div className="loginPage">
      <div id="regIcon">
          <img src={regIcon} alt="Woman reading"/>
        </div>
      <div className="loginFlow">
          <form action="tbd" className="loginForm">
            <h2 className="title"> Login </h2>
            <div className="labels">
              <label>
                <InputField name="Username" />
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="field"
              />
            </div>
			      <div className="links">
              <h4>
                <Link to="/Registration">Register</Link>
              </h4>
			        <h4>
                <Link to="/ResetPassword">Forgot Password</Link>
              </h4>
            </div>
              <Link to="/Homepage"><input type="submit" name="submitReg" id="submitReg" className="field"/></Link>
          </form>
        </div>
    </div>
  );
}

export default Login;