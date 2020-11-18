import React, { useState } from "react";
import NavContext from "./NavContext";

const NavContextWrapper = ({ children }) => {
  const [navSearch, setNavSearch] = useState(false);

  return (
    <NavContext.Provider value={{ navSearch, setNavSearch }}>
      {children}
    </NavContext.Provider>
  );
};

export default NavContextWrapper;