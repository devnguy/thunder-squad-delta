import React, { useEffect, useState } from "react";

import Book from "../Book";
import "./BookRow.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function BookRow({ books, heading, left_start }) {
  const [arrayOffset, setArrayOffset] = useState(
    left_start || books.length < 5 ? 0 : Math.floor(books.length / 2)
  );
  const [booksArray, setBooksArray] = useState(null);

  useEffect(() => {
    if (books.length > arrayOffset + 4) {
      setBooksArray(
        <>
          {books
            .slice(arrayOffset, arrayOffset + 4)
            .map(({ cover, title, author }, index) => (
              <Book key={index} cover={cover} title={title} author={author} />
            ))}
        </>
      );
    } else if (books.length <= arrayOffset + 4) {
      setBooksArray(
        <>
          {books
            .slice(arrayOffset, books.length)
            .map(({ cover, title, author }, index) => (
              <Book key={index} cover={cover} title={title} author={author} />
            ))}
        </>
      );
    }
  }, [arrayOffset, books]);

  return (
    <div className="bookRow">
      <div className="buttonSection">
        {arrayOffset > 3 && (
          <button
            className="scrollButton"
            onClick={() => setArrayOffset((arg) => arg - 4)}
          >
            <FontAwesomeIcon icon={faChevronLeft} size="lg" color="#fffaff" />
          </button>
        )}
      </div>
      <div className="booksAndTitle">
        <div className="rowTitleContainer">
          <p className="rowTitle">{heading}</p>
        </div>
        <div className="bookRowContainer">{booksArray}</div>
      </div>
      <div className="buttonSection">
        {books.length > arrayOffset + 4 && (
          <button
            className="scrollButton"
            onClick={() => setArrayOffset((arg) => arg + 4)}
          >
            <FontAwesomeIcon icon={faChevronRight} size="lg" color="#fffaff" />
          </button>
        )}
      </div>
    </div>
  );
}

export default BookRow;
