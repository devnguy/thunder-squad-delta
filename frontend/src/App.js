import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import Homepage from "./Homepage/Homepage";
import Profilepage from "./Profilepage/ProfilePage";
import Login from "./Login/Login";
import Registration from "./Registration/Registration";
import ResetPassword from "./ResetPassword/ResetPassword";
import { Switch, Route } from "react-router-dom";
import Browsepage from "./Browsepage/Browsepage";
import BookPage from "./BookPage/BookPage";

export default function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/profile">
          <Profilepage />
        </Route>
        <Route path="/ResetPassword">
          <ResetPassword />
        </Route>
        <Route path="/Registration">
          <Registration />
        </Route>
        <Route path="/BookPage">
          <BookPage />
        </Route>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/browse">
          <Browsepage />
        </Route>
        <Route path="/Homepage">
          <Homepage />
        </Route>
      </Switch>
    </>
  );
}
