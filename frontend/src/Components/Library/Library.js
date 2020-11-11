import React from "react";
import BookRow from "../BookRow/BookRow";
import "./Library.css";

function Library({ book_arrays, headings }) {
  return (
    <>
      {book_arrays.map((book_array, index) => (
        <div key={index} className="libraryRow">
          <BookRow books={book_array} heading={headings[index]} />
        </div>
      ))}
    </>
  );
}

export default Library;
