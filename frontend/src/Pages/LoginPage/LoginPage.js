import React from "react";
import LoginIcon from "../../Assets/LoginIcon.png";
import "./LoginPage.css";

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

function LoginPage() {
  return (
    <div className="App">
      <div class="big">
        <div id="regIcon">
          <img src={LoginIcon} alt="Woman reading" />
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
            <input
              type="submit"
              name="submitReg"
              id="submitReg"
              class="field"
            />
          </div>
          <input type="submit" name="submitReg" id="submitReg" class="field" />
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
