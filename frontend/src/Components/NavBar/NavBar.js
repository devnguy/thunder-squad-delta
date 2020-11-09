import React from "react";
import "./NavBar.css";
import MaleAvatar from "../../Assets/Male Avatar.png";

function NavBar({ loggedIn = true }) {
  return (
    <div className="navBarContainer">
      <div className="navBarLeftSection">
        <p className="navBarHeader">Bookswap</p>
      </div>
      <div className="navBarRightSection">
        {!loggedIn && (
          <>
            <p className="navBarOption">Browse</p>
            <p className="navBarOption">About</p>
            <p className="navBarOption">Login</p>
            <p className="navBarOption">Sign Up</p>
          </>
        )}
        {loggedIn && (
          <>
            <p className="navBarOption">Browse</p>
            <p className="navBarOption">About</p>
            <p className="navBarOption">Help</p>
            <button className="profileButton">
              <img src={MaleAvatar} alt="Avatar" className="avatar" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
