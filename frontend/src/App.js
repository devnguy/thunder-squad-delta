import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import Homepage from "./Homepage/Homepage";
import Profilepage from "./Profilepage/ProfilePage";
import Aboutpage from "./Aboutpage/Aboutpage";
import Registration from "./Registration/Registration";
import SearchResultsPage from "./SearchResultsPage/SearchResultsPage";
import Browsepage from "./Browsepage/Browsepage";
import BookPage from "./BookPage/BookPage";

import { Switch, Route } from "react-router-dom";


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
        <Route path="/register">
          <Registration />
        </Route> 
        <Route path="/about">
          <Aboutpage />
        </Route>
        <Route path="/search">
          <SearchResultsPage />
        </Route>
      </Switch>
    </>
  );
}
