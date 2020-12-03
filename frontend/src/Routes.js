import React from "react";
import { Switch, Route } from "react-router-dom";

import {
  HomePage,
  LibraryPage,
  ProfilePage,
  AboutPage,
  RegistrationPage,
  SearchResultsPage,
  BrowsePage,
  BookPage,
  LoginPage,
  ResetPasswordPage,
} from "./Pages";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/about">
        <AboutPage />
      </Route>
      <Route path="/book/:swapId">
        <BookPage />
      </Route>
      <Route path="/browse">
        <BrowsePage />
      </Route>
      <Route path="/library">
        <LibraryPage />
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
      <Route path="/search/:filterTerm/:searchTerm">
        <SearchResultsPage />
      </Route>
    </Switch>
  );
}
