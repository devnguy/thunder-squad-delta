import React from "react";

import InfoRow from "../Components/InfoRow.js/InfoRow";
import Library from "../Components/Library/Library";

import MaleAvatarProfile from "../Assets/Male Avatar Profile.png";
import BookCover from "../Assets/bookCover.png";
import "./ProfilePage.css";

const headings = ["Username's Library", "Username's Wishlist"];

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
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    cover: BookCover,
  },
];

function ProfilePage(props) {
  return (
    <div className="profilePage">
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
          <Library headings={headings} book_arrays={[book_array, book_array]} />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
