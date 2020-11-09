import React, { useState } from "react";

import NavBar from "../Components/NavBar/NavBar";
import InfoRow from "../Components/InfoRow.js/InfoRow";

import MaleAvatarProfile from "../Assets/Male Avatar Profile.png";
import "./ProfilePage.css";

function ProfilePage(props) {
  return (
    <div>
      <NavBar />
      <div className="pageBody">
        <div className="profileInfoSection">
          <div className="profileHeader">
            <img
              src={MaleAvatarProfile}
              alt="Avatar"
              className="avatarProfile"
            />
            <p className="profileInfo">Username</p>
            <p className="profileEmail">me@email.com</p>
          </div>
          <div className="profileFooter">
            <InfoRow label="Points Spent" value="100" />
            <InfoRow label="Points in Wallet" value="20" />
            <InfoRow label="Books Given" value="15" />
            <InfoRow label="Book Requested" value="7" />
          </div>
        </div>
        <div className="librarySection">
          <div className="libraryRow"></div>
          <div className="libraryRow"></div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
