import React from "react";

import Book from "../Book/Book";
import "./BookRow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function BookRow({ books }) {
  return (
    <div className="bookRow">
      <div className="buttonSection">
        <div className="scrollButton">
          <FontAwesomeIcon icon={faChevronLeft} size="lg" color="#fffaff" />
        </div>
      </div>
      <div className="booksAndTitle">
        <div className="rowTitleContainer">
          <p className="rowTitle">Username's Library</p>
        </div>
        <div className="bookRowContainer">
          {books.map(({ cover, title, author }, index) => (
            <Book key={index} cover={cover} title={title} author={author} />
          ))}
        </div>
      </div>
      <div className="buttonSection">
        <div className="scrollButton">
          <FontAwesomeIcon icon={faChevronRight} size="lg" color="#fffaff" />
        </div>
      </div>
    </div>
  );
}

export default BookRow;
