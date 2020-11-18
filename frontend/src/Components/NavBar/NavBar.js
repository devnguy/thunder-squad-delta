import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import SearchBar from "../SearchBar";

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
  {
    title: "Logout",
    link: "/logout",
  },
];

const navSearchPages = ["/about", "/profile"];

function NavBar({ loggedIn = false }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navSearch, setNavSearch] = useState(false);
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
          <p className="navBarHeader">
            <Link to="/">Bookswap</Link>
          </p>
        </div>
        {navSearch && (
          <div style={{ position: "relative", top: "3px" }}>
            <SearchBar navBarVariant />
          </div>
        )}
        <div className="navBarRightSection">
          <p className="navBarOption">
            <Link to="/browse">Browse</Link>
          </p>
          <p className="navBarOption">
            <Link to="/about">About</Link>
          </p>
          {!loggedIn && (
            <>
              <p className="navBarOption">
                <Link to="/login">Login</Link>
              </p>
              <p className="navBarOption">
                <Link to="/register">Sign Up</Link>
              </p>
            </>
          )}
          {loggedIn && (
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
            <button
              key={index}
              className={"profileDropdownCell navBarOption"}
              onClick={() => setDropdownOpen(false)}
            >
              <Link to={link}>{title}</Link>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default NavBar;
