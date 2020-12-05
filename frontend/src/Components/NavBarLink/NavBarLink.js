import React from "react";
import { Link } from "react-router-dom";

import "./NavBarLink.css";

const NavBarLink = ({
  toRoute,
  onClick,
  label,
  className = "navBarOption",
}) => {
  return (
    <p className={className} onClick={onClick}>
      <Link to={toRoute}>{label}</Link>
    </p>
  );
};

export default NavBarLink;
