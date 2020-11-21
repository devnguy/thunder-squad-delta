import React from "react";
import regIcon from "../../Assets/ResetIcon.png";
import "./ResetPasswordPage.css";

function InputField(props) {
  return (
    <input
      class="fieldReset"
      type="text"
      placeholder={props.name}
      id={props.name}
      name={props.name}
    />
  );
}

function ResetPasswordPage() {
  return (
    <div className="App">
      <div class="big">
        <div id="regIcon">
          <img class="imgLogin" src={regIcon} alt="Lost in thought" />
        </div>
        <form action="tbd" class="form">
          <h2 class="createText"> Create Password </h2>
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

          <input type="submit" name="submitReg" id="submitReg" class="fieldReset" />
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
