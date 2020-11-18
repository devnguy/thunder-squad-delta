import React, { useState, useContext } from "react";

import SearchBar from "../SearchBar";

import MaleAvatarNav from "../../Assets/Male Avatar Nav.png";
import "./NavBar.css";

import { Link } from "react-router-dom";
import NavContext from "../../Context/NavContext";

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

function NavBar({ loggedIn = true }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { navSearch, setNavSearch } = useContext(NavContext);
  return (
    <div className="navBarWithDropdown">
      <div className="navBarContainer">
        <div className="navBarLeftSection">
          <p className="navBarHeader" onClick={() => setNavSearch(false)}>
            <Link to="/">Bookswap</Link>
          </p>
        </div>
        {navSearch && (
          <div style={{ position: "relative", top: "3px" }}>
            <SearchBar navBarVariant />
          </div>
        )}
        <div className="navBarRightSection">
          <p className="navBarOption" onClick={() => setNavSearch(false)}>
            <Link to="/browse">Browse</Link>
          </p>
          <p className="navBarOption" onClick={() => setNavSearch(true)}>
            <Link to="/about">About</Link>
          </p>
          {!loggedIn && (
            <>
              <p className="navBarOption" onClick={() => setNavSearch(false)}>
                <Link to="/login">Login</Link>
              </p>
              <p className="navBarOption" onClick={() => setNavSearch(false)}>
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
              onClick={() => {
                setDropdownOpen(false);
                setNavSearch(true);
              }}
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
