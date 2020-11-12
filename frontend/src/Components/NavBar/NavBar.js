import React from "react";
import "./NavBar.css";
import MaleAvatarNav from "../../Assets/Male Avatar Nav.png";

import { Link } from "react-router-dom";

function NavBar({ loggedIn = true }) {
  return (
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
            <button className="profileButton">
              {/* <Link to="/profile"> */}
              <img src={MaleAvatarNav} alt="Avatar" className="avatar" />
              {/* </Link> */}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
