import React from "react";
import "./Book.css";

import DefaultImage from "../../Assets/Book Cover.png";

function Book({ cover, title, author }) {
  return (
    <div className="book">
      <div className="coverSection">
        <img className="bookCover" alt="" src={cover ? cover : DefaultImage} />
      </div>
      <div className="textSection">
        <p className="titleText">{title ? title : "Title"}</p>
        <p className="authorText">
          <span className="by">by </span>
          {author ? author : "Author"}
        </p>
      </div>
    </div>
  );
}

export default Book;
