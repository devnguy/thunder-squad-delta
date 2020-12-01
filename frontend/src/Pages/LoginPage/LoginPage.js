import React, { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import "./LoginPage.css";
import LoginIcon from "../../Assets/LoginIcon.png";
import useApi from "../../Api/useApi";
import requests from "../../Api/requests";
import AuthContext from "../../Context/AuthContext";
import { CustomInputField, Button } from "../../Components";

function Login() {
  const login = useApi(requests.loginUser);
  const [userName, setuserName] = React.useState("");
  const [passWord, setpassWord] = React.useState("");
  const { setUserId } = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    if (login.data.status === true) {
      loginUser();
    } else {
      console.log("Error");
    }
  }, [login.data]);

  const loginUser = () => {
    console.log(login.data.id);
    setUserId(login.data.id);
    history.push(`/`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      login.request(userName, passWord);
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
          name="Username"
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
          type="text"
        />
        <CustomInputField
          name="Password"
          type="password"
          value={passWord}
          onChange={(e) => setpassWord(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={() => login.request(userName, passWord)}>
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
