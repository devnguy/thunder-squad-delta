import React, { useState } from "react";
import "./NavBar.css";
import MaleAvatarNav from "../../Assets/Male Avatar Nav.png";

import { Link } from "react-router-dom";

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
  return (
    <div className="navBarWithDropdown">
      <div className="navBarContainer">
        <div className="navBarLeftSection">
          <p className="navBarHeader">
            <Link to="/">Bookswap</Link>
          </p>
        </div>
        <div className="navBarRightSection">
          <p className="navBarOption">Browse</p>
          <p className="navBarOption">About</p>
          {!loggedIn && (
            <>
              <p className="navBarOption">Login</p>
              <p className="navBarOption">Sign Up</p>
            </>
          )}
          {loggedIn && (
            <>
              <p className="navBarOption">Help</p>
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
