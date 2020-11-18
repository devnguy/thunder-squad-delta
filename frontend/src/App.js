import React from "react";
import { NavBar } from "./Components";
import Routes from "./Routes";
import AuthContext from "./Context/AuthContextWrapper";

export default function App() {
  return (
    <AuthContext>
      <NavBar />
      <Routes />
    </AuthContext>
  );
}
