import React, { useEffect, useState } from "react";

import Book from "../Book";
import "./BookRow.css";

import Lottie from "react-lottie";
import * as LoadingAnimation from "../../Assets/Animations/Loading.json";
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
    } else if (books.length > arrayOffset + 4) {
      setBooksArray(
        <>
          {books
            .slice(arrayOffset, arrayOffset + 4)
            .map(({ image, title, author }, index) => (
              <Book key={index} cover={image} title={title} author={author} />
            ))}
        </>
      );
    } else if (books.length <= arrayOffset + 4) {
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
          <p className="rowTitle">{heading}</p>
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
