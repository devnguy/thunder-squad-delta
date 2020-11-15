import React from "react";
import { NavBar } from "./Components";
import  {
  HomePage,
  ProfilePage,
  AboutPage,
  RegistrationPage,
  SearchResultsPage,
  BrowsePage,
  BookPage,
  LoginPage,
  ResetPasswordPage,
} from "./Pages";

import { Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/book">
          <BookPage />
        </Route>
        <Route path="/browse">
          <BrowsePage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/profile">
          <ProfilePage />
        </Route>
        <Route path="/register">
          <RegistrationPage />
        </Route>
        <Route path="/reset-password">
          <ResetPasswordPage />
        </Route>
        <Route path="/search">
          <SearchResultsPage />
        </Route>
      </Switch>
    </>
  );
}
