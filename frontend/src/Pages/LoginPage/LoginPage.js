import React, { useEffect } from "react";
import "./LoginPage.css";
import useApi from "../../Api/useApi";
import requests from "../../Api/requests";
import LoginIcon from "../../Assets/LoginIcon.png";
import Routes from "../Routes";
import { Link } from "react-router-dom";


function Login() {
  const Login = useApi(requests.loginUser);
  const[userName, setuserName] = React.useState("");
  const[passWord, setpassWord] = React.useState("");

  function handleUsername(event) {
    setuserName(event.target.value);
  }

  
  function handlepassWord(event) {
    setpassWord(event.target.value);
  }

useEffect(()=>{
  if (Login.data.status === true){
    console.log(Login.data.id);
  }  
});

function LoginUser(e) {
    Login.request(userName, passWord);
  }


  return (
    <div className="loginPage">
      <div id="regIcon">
          <img src={LoginIcon} alt="Woman reading"/>
        </div>
      <div className="loginFlow">
          <div className="loginForm">
            <h2 className="title"> Login </h2>
            <div className="labels">
                <input 
                className="field"
                placeholder="Username"
                type="text" 
                name="Username" 
                value={userName} 
                onChange={handleUsername} 
                />
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="field"
                value={passWord}
                onChange={handlepassWord}
              />
            </div>
			      <div id="links">
              <h4>
                <Link to="/Registration">Sign Up</Link>
              </h4>
            </div>
            <button id="LoginSubmit" className="field" onClick={LoginUser}>Submit</button>
          </div>
        </div>
    </div>
  );
}

export default Login;
