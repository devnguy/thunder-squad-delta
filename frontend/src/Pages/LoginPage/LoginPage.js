import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import "./LoginPage.css";
import LoginIcon from "../../Assets/LoginIcon.png";
import useApi from "../../Api/useApi";
import requests from "../../Api/requests";
import AuthContext from "../../Context/AuthContext";
import { CustomInputField, Button } from "../../Components";

function Login() {
  const login = useApi(requests.loginUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserId } = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    if (login.data.status === true) {
      loginUser();
    }
  }, [login.data]);

  const loginUser = () => {
    setUserId(login.data.id);
    history.push(`/`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      login.request(email, password);
    }
  };

  const goToRegistration = () => {
    history.push("/register");
  };

  return (
    <div className="loginPage">
      <div id="loginIconSection">
        <img src={LoginIcon} alt="Woman reading" />
      </div>
      <div id="loginFormSection">
        <p className="loginTitle">Login</p>
        <CustomInputField
          name="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
        />
        <CustomInputField
          name="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={() => login.request(email, password)}>
          Log In
        </Button>
        <Button outline color="blue" onClick={goToRegistration}>
          No Account? Register
        </Button>
      </div>
    </div>
  );
}

export default Login;
