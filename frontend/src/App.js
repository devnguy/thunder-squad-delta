import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import Homepage from "./Homepage/Homepage";
import Profilepage from "./Profilepage/ProfilePage";

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
      </Switch>
    </>
  );
}
