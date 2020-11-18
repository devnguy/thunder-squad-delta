import React, { useEffect, useState } from "react";

import { Library, SearchBar } from "../../Components";
import useApi from "../../Api/useApi";
import requests from "../../Api/requests";

import HeaderImage from "../../Assets/BrowseHeader.png";
// import BookCover from "../../Assets/BookCover.png";
import "./BrowsePage.css";

const headings = ["Recommended for you", "Trending", "Top All Time"];

// const book_array = [
//   {
//     title: "1The Hobbit",
//     author: "J.R.R. Tolkien",
//     cover: BookCover,
//   },
//   {
//     title: "2The Hobbit",
//     author: "J.R.R. Tolkien",
//     cover: BookCover,
//   },
//   {
//     title: "3The Hobbit",
//     author: "J.R.R. Tolkien",
//     cover: BookCover,
//   },
//   {
//     title: "4The Hobbit",
//     author: "J.R.R. Tolkien",
//     cover: BookCover,
//   },
//   {
//     title: "5Harry Potter",
//     author: "J.K. Rowling",
//     cover: BookCover,
//   },
//   {
//     title: "6Harry Potter",
//     author: "J.K. Rowling",
//     cover: BookCover,
//   },
//   {
//     title: "7Harry Potter",
//     author: "J.K. Rowling",
//     cover: BookCover,
//   },
//   {
//     title: "8The Hobbit",
//     author: "J.R.R. Tolkien",
//     cover: BookCover,
//   },
//   {
//     title: "9Harry Potter",
//     author: "J.K. Rowling",
//     cover: BookCover,
//   },
// ];

function BrowsePage(props) {
  const books = useApi(requests.getBooks);
  const [bookArray, setBookArray] = useState(null);

  useEffect(() => {
    books.request();
  }, []);

  useEffect(() => {
    if (books.data !== []) {
      setBookArray(books.data);
    }
  }, [books.data]);

  return (
    <div>
      <div className="headerSection">
        <img src={HeaderImage} alt="" className="headerImage" />
      </div>
      <div className="searchBarSection">
        <SearchBar />
      </div>
      <div className="librarySection">
        <Library
          headings={headings}
          book_arrays={[bookArray, bookArray, bookArray]}
          left_start
        />
      </div>
    </div>
  );
}

export default BrowsePage;
