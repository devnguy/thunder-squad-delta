import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import SearchBar from "../SearchBar";
import NavBarLink from "../NavBarLink";
import AuthContext from "../../Context/AuthContext";

import MaleAvatarNav from "../../Assets/Male Avatar Nav.png";
import "./NavBar.css";

const dropdown_buttons = [
  {
    title: "My Profile",
    link: "/profile",
  },
  {
    title: "My Library",
    link: "/library",
  },
  {
    title: "Pending Swaps",
    link: "/pending",
  },
  {
    title: "Wishlist",
    link: "/wishlist",
  },
];

const navSearchPages = ["/about", "/profile", "/library"];

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navSearch, setNavSearch] = useState(false);
  const { userId, setUserId } = useContext(AuthContext);
  let location = useLocation();

  useEffect(() => {
    if (
      navSearchPages.includes(location.pathname) ||
      location.pathname.slice(0, 7) === "/search"
    ) {
      setNavSearch(true);
    } else {
      setNavSearch(false);
    }
  }, [location]);

  return (
    <div className="navBarWithDropdown">
      <div className="navBarContainer">
        <div className="navBarLeftSection">
          <NavBarLink
            onClick={() => setDropdownOpen(false)}
            toRoute="/"
            label="Bookswap"
            className="navBarHeader"
          />
        </div>
        {navSearch && (
          <div style={{ position: "relative", top: "3px" }}>
            <SearchBar navBarVariant />
          </div>
        )}
        <div className="navBarRightSection">
          <NavBarLink
            onClick={() => setDropdownOpen(false)}
            toRoute="/browse"
            label="Browse"
          />
          <NavBarLink
            onClick={() => setDropdownOpen(false)}
            toRoute="/about"
            label="About"
          />
          {!userId && (
            <>
              <NavBarLink
                onClick={() => setDropdownOpen(false)}
                toRoute="/login"
                label="Login"
              />
              <NavBarLink
                onClick={() => setDropdownOpen(false)}
                toRoute="/register"
                label="Sign Up"
              />
            </>
          )}
          {userId && (
            <>
              <button
                className="profileButton"
                onClick={() => setDropdownOpen((open) => !open)}
              >
                <img src={MaleAvatarNav} alt="Avatar" className="avatar" />
              </button>
            </>
          )}
        </div>
      </div>
      {dropdownOpen && (
        <div className="dropdownContainer">
          {dropdown_buttons.map(({ title, link }, index) => (
            <NavBarLink
              key={index}
              onClick={() => setDropdownOpen(false)}
              toRoute={link}
              label={title}
              className={"profileDropdownCell navBarOption"}
            />
          ))}
          <NavBarLink
            onClick={() => {
              setUserId(null);
              setDropdownOpen(false);
            }}
            toRoute="/"
            label="Logout"
            className={"profileDropdownCell navBarOption"}
          />
        </div>
      )}
    </div>
  );
};

export default NavBar;
