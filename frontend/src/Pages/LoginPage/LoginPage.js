import React from "react";
import "./LoginPage.css";
import LoginIcon from "../../Assets/LoginIcon.png";
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
          <img src={LoginIcon} alt="Woman reading"/>
        </div>
      <div className="loginFlow">
          <div className="loginForm">
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
			      <div id="links">
              <h4>
                <Link to="/Registration">Sign Up</Link>
              </h4>
            </div>
            <button id="LoginSubmit" className="field">Submit</button>
          </div>
        </div>
    </div>
  );
}

export default Login;
