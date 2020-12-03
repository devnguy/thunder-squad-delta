import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";

import "./BookRow.css";
import * as LoadingAnimation from "../../Assets/Animations/Loading.json";
import Book from "../Book";

function BookRow({ books, heading, headingLink, leftStart }) {
  const [arrayOffset, setArrayOffset] = useState(
    leftStart || books.length < 5 ? 0 : Math.floor(books.length / 2)
  );
  const [booksArray, setBooksArray] = useState(null);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (books === null) {
      setBooksArray(
        <>
          <Lottie
            options={defaultOptions}
            height={200}
            width={400}
            isStopped={false}
            isPaused={false}
          />
        </>
      );
    } else if (books && books.length === 0) {
      setBooksArray(
        <div className="bookRowEmptyContainer">
          <p className="rowTitle" style={{ fontSize: "20px", opacity: "40%" }}>
            Looks like there's nothing here
          </p>
        </div>
      );
    } else if (books && books.length > arrayOffset + 4) {
      setBooksArray(
        <>
          {books
            .slice(arrayOffset, arrayOffset + 4)
            .map(({ image, title, author }, index) => (
              <Book key={index} cover={image} title={title} author={author} />
            ))}
        </>
      );
    } else if (books && books.length <= arrayOffset + 4) {
      setBooksArray(
        <>
          {books
            .slice(arrayOffset, books.length)
            .map(({ image, title, author }, index) => (
              <Book key={index} cover={image} title={title} author={author} />
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
          {headingLink && (
            <Link to={headingLink}>
              <p
                className="rowTitle"
                style={{ color: "#1e1b18", textDecoration: "none" }}
              >
                {heading}
              </p>
            </Link>
          )}
          {!headingLink && <p className="rowTitle">{heading}</p>}
        </div>
        <div className="bookRowContainer">{booksArray}</div>
      </div>
      <div className="buttonSection">
        {books && books.length > arrayOffset + 4 && (
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
