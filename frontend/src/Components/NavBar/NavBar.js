import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import SearchBar from "../SearchBar";
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

const navSearchPages = ["/about", "/profile"];

function NavBar() {
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
          <p className="navBarHeader" onClick={() => setDropdownOpen(false)}>
            <Link to="/">Bookswap</Link>
          </p>
        </div>
        {navSearch && (
          <div style={{ position: "relative", top: "3px" }}>
            <SearchBar navBarVariant />
          </div>
        )}
        <div className="navBarRightSection">
          <p className="navBarOption" onClick={() => setDropdownOpen(false)}>
            <Link to="/browse">Browse</Link>
          </p>
          <p className="navBarOption" onClick={() => setDropdownOpen(false)}>
            <Link to="/about">About</Link>
          </p>
          {!userId && (
            <>
              <p
                className="navBarOption"
                onClick={() => setDropdownOpen(false)}
              >
                <Link to="/login">Login</Link>
              </p>
              <p
                className="navBarOption"
                onClick={() => setDropdownOpen(false)}
              >
                <Link to="/register">Sign Up</Link>
              </p>
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
            <button
              key={index}
              className={"profileDropdownCell navBarOption"}
              onClick={() => setDropdownOpen(false)}
            >
              <Link to={link}>{title}</Link>
            </button>
          ))}
          <button
            className={"profileDropdownCell navBarOption"}
            onClick={() => {
              setUserId(null);
              setDropdownOpen(false);
            }}
          >
            <Link to="/">Logout</Link>
          </button>
        </div>
      )}
    </div>
  );
}

export default NavBar;
