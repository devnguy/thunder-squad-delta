import React from "react";
import "./NavBar.css";
import MaleAvatarNav from "../../Assets/Male Avatar Nav.png";

function NavBar({ loggedIn = true }) {
  return (
    <div className="navBarContainer">
      <div className="navBarLeftSection">
        <p className="navBarHeader">Bookswap</p>
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
              <img src={MaleAvatarNav} alt="Avatar" className="avatar" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
