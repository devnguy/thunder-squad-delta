import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import Homepage from "./Homepage/Homepage";
import Profilepage from "./Profilepage/ProfilePage";
import Registration from "./Registration/Registration";

import { Switch, Route } from "react-router-dom";
import Browsepage from "./Browsepage/Browsepage";

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
        <Route path="/browse">
          <Browsepage />
        </Route>
        {/* <Route path="/register">
          <Registration />
        </Route> */}
      </Switch>
    </>
  );
}
