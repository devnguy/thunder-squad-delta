import React, { useState, useEffect, useContext } from "react";

import MaleAvatarProfile from "../../Assets/Male Avatar Profile.png";

import { BookRow, InfoRow } from "../../Components";
import useApi from "../../Api/useApi";
import requests from "../../Api/requests";
import "./ProfilePage.css";
import AuthContext from "../../Context/AuthContext";

const headings = ["Username's Library", "Username's Wishlist"];
const headingLinks = ["/library", "/wishlist"];

function ProfilePage(props) {
  const profileDetails = useApi(requests.getProfileDetails);
  const library = useApi(requests.getUserSwaps);
  const wishlist = useApi(requests.getUserWishes);
  const [userInfo, setUserInfo] = useState(null);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    if (userId) {
      profileDetails.request(userId);
      library.request(userId);
      wishlist.request(userId);
    }
  }, []);

  return (
    <div className="pageBody">
      <div className="profileInfoSection">
        <div className="profileHeader">
          <img src={MaleAvatarProfile} alt="Avatar" className="avatarProfile" />
          <p className="profileInfo">
            {profileDetails.data.userInfo
              ? profileDetails.data.userInfo.username
              : "..."}
          </p>
          <p className="profileEmail">
            {profileDetails.data.userInfo
              ? profileDetails.data.userInfo.email
              : "..."}
          </p>
        </div>
        <div className="profileFooter">
          <InfoRow
            label="Points Spent"
            value={
              profileDetails.data.userInfo
                ? profileDetails.data.userInfo.pointsSpent
                : "0"
            }
          />
          <InfoRow
            label="Points in Wallet"
            value={
              profileDetails.data.userInfo
                ? profileDetails.data.userInfo.pointsInWallet
                : "0"
            }
          />
          <InfoRow
            label="Books Given"
            value={
              profileDetails.data.userInfo
                ? profileDetails.data.userInfo.booksGiven
                : "0"
            }
          />
          <InfoRow
            label="Book Requested"
            value={
              profileDetails.data.userInfo
                ? profileDetails.data.userInfo.booksReceived
                : "0"
            }
          />
        </div>
      </div>
      <div className="profileLibrarySection">
        <div className="libraryRow">
          <BookRow
            heading={headings[0]}
            books={library.data.owned ? library.data.owned : null}
            headingLink={headingLinks[0]}
            leftStart
          />
        </div>
        <div className="libraryRow">
          <BookRow
            linkBooks={false}
            heading={headings[1]}
            books={wishlist.data.length > 0 ? wishlist.data : null}
            headingLink={headingLinks[1]}
            leftStart
          />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
