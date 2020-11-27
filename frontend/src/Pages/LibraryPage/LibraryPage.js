import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./LibraryPage.css";
import { Button, Book, PostModal } from "../../Components";
import AboutPostIcon from "../../Assets/About Post Icon.png";
import BookCover from "../../Assets/Book Cover.png";

const book_array = [
  {
    title: "1The Hobbit",
    author: "J.R.R. Tolkien",
    cover: BookCover,
  },
  {
    title: "2The Hobbit",
    author: "J.R.R. Tolkien",
    cover: BookCover,
  },
  {
    title: "3The Hobbit",
    author: "J.R.R. Tolkien",
    cover: BookCover,
  },
  {
    title: "4The Hobbit",
    author: "J.R.R. Tolkien",
    cover: BookCover,
  },
  {
    title: "5Harry Potter",
    author: "J.K. Rowling",
    cover: BookCover,
  },
  {
    title: "6Harry Potter",
    author: "J.K. Rowling",
    cover: BookCover,
  },
  {
    title: "7Harry Potter",
    author: "J.K. Rowling",
    cover: BookCover,
  },
  {
    title: "8The Hobbit",
    author: "J.R.R. Tolkien",
    cover: BookCover,
  },
  {
    title: "9Harry Potter",
    author: "J.K. Rowling",
    cover: BookCover,
  },
  {
    title: "7Harry Potter",
    author: "J.K. Rowling",
    cover: BookCover,
  },
  {
    title: "8The Hobbit",
    author: "J.R.R. Tolkien",
    cover: BookCover,
  },
  {
    title: "9Harry Potter",
    author: "J.K. Rowling",
    cover: BookCover,
  },
  {
    title: "7Harry Potter",
    author: "J.K. Rowling",
    cover: BookCover,
  },
  {
    title: "8The Hobbit",
    author: "J.R.R. Tolkien",
    cover: BookCover,
  },
  {
    title: "9Harry Potter",
    author: "J.K. Rowling",
    cover: BookCover,
  },
];

const LibraryPage = () => {
  let history = useHistory();
  const [bookRows, setBookRows] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const goToWishlist = () => {
    history.push("/wishlist");
  };

  const booksToRows = () => {
    const rows = book_array.reduce(function (rows, book, index) {
      return (
        (index % 4 === 0
          ? rows.push([book])
          : rows[rows.length - 1].push(book)) && rows
      );
    }, []);
    setBookRows(rows);
  };

  useEffect(() => {
    booksToRows();
  }, []);

  return (
    <>
      {modalVisible && <PostModal onClose={() => setModalVisible(false)} />}
      <div
        id="libraryPageBody"
        style={modalVisible ? { opacity: "50%" } : null}
      >
        <div id="libraryPageSidebar">
          <p id="myLibraryHeader">My Library</p>
          <img src={AboutPostIcon} alt="" id="postBookIcon" />
          <Button onClick={() => setModalVisible(true)}>Post Book</Button>
          <Button outline onClick={() => goToWishlist()}>
            Wishlist
          </Button>
          <Button outline color="blue">
            Tutorial
          </Button>
        </div>
        <div id="libraryPageBookBlock">
          {bookRows &&
            bookRows.map((row, index) => (
              <div className="libraryBookRow" key={index}>
                {row.map((book, bookIndex) => (
                  <Book key={bookIndex} props={book} />
                ))}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default LibraryPage;
