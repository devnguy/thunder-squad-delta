import React from "react";
import { NavBar } from "./Components";
import Routes from "./Routes";
import NavContext from "./Context/NavContextWrapper";

export default function App() {
  return (
    <NavContext>
      <NavBar />
      <Routes />
    </NavContext>
  );
}
