import React from "react";
import "./NavBar.css";
import { ReactSVG } from 'react-svg'

function NavBar({ loggedIn = false }) {
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
      </div>
    </div>
  );
}

export default NavBar;
