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
  const userDetails = useApi(requests.getUser);
  const library = useApi(requests.getUserSwaps);
  const wishlist = useApi(requests.getUserWishes);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    if (userId) {
      userDetails.request(userId);
      library.request(userId);
      wishlist.request(userId);
    }
  }, []);

  useEffect(() => {
    if (userDetails.data.user_id) {
      console.log(userDetails.data.user_id);
    }
  }, [userDetails.data]);

  return (
    <div className="pageBody">
      <div className="profileInfoSection">
        <div className="profileHeader">
          <img src={MaleAvatarProfile} alt="Avatar" className="avatarProfile" />
          <p className="profileInfo">
            {userDetails.data.name ? userDetails.data.name : "..."}
          </p>
          <p className="profileEmail">
            {userDetails.data.email ? userDetails.data.email : "..."}
          </p>
        </div>
        <div className="profileFooter">
          <InfoRow
            label="Points Spent"
            value={
              userDetails.data.points_spent
                ? userDetails.data.points_spent
                : "0"
            }
          />
          <InfoRow
            label="Points in Wallet"
            value={userDetails.data.points ? userDetails.data.points : "0"}
          />
          <InfoRow
            label="Books Given"
            value={
              userDetails.data.booksGiven ? userDetails.data.booksGiven : "0"
            }
          />
          <InfoRow
            label="Book Requested"
            value={
              userDetails.data.booksRequested
                ? userDetails.data.booksGiven
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
