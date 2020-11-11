import React from "react";
import "./Book.css";

function Book({ cover, title, author }) {
  return (
    <div className="book">
      <div className="coverSection">
        <img className="bookCover" alt="" src={cover} />
      </div>
      <div className="textSection">
        <p className="titleText">{title}</p>
        <p className="authorText">
          <span className="by">by </span>
          {author}
        </p>
      </div>
    </div>
  );
}

export default Book;
