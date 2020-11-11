import React from "react";

import NavBar from "../Components/NavBar/NavBar";
import InfoRow from "../Components/InfoRow.js/InfoRow";
import BookRow from "../Components/BookRow/BookRow";

import MaleAvatarProfile from "../Assets/Male Avatar Profile.png";
import BookCover from "../Assets/bookCover.png";
import "./ProfilePage.css";

const book_array = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    cover: BookCover,
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    cover: BookCover,
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    cover: BookCover,
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    cover: BookCover,
  },
];

function ProfilePage(props) {
  return (
    <div className="profilePage">
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
          <div className="libraryRow">
            <BookRow books={book_array} />
          </div>
          <div className="libraryRow">
            <BookRow books={book_array} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
