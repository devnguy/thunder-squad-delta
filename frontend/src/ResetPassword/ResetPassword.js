import React from "react";
import "./reset-password.css";
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

function ResetPassword() {
  return (
    <div className="resetPasswordPage">		
      <div id="regIcon">
          <img src={regIcon} alt="Lost in thought"/>
      </div>
      <div className="resetFlow"> 
        <form action="tbd" className="form">
          <h2> Create Password </h2>
          <label>
            <InputField name="New Password" />
          </label>
		      <ul>
            <li> - 10 or more characters</li>
            <li> - 1 Upper Case Letter</li>
            <li> - 1 Lower Case Letter</li>
            <li> - 1 Special Character</li>
            <li> - 1 Number</li>
          </ul>
          <label>
            <InputField name="Confirm Password" />
          </label>
		      <ul>
            <li> - Matches previous field</li>
          </ul>
          <Link to="/Login"><input type="submit" name="submitReg" id="submitReg" className="field"/></Link>
        </form>
      </div>    
    </div>
  );
}

export default ResetPassword;