import React from "react";

import SearchResultRow from "../Components/SearchResultRow/SearchResultRow";

import BookCover from "../Assets/bookCover.png";
import "./SearchResultsPage.css";
import { faPassport } from "@fortawesome/free-solid-svg-icons";

const book_array = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    cover: BookCover,
    cost: 35,
    condition: "Good",
    giver: "Sally",
  },
  {
    title: "The Bop-it",
    author: "Bert and Ernie",
    cover: BookCover,
    cost: 20,
    condition: "Poor",
    giver: "Joe",
  },
];

function SearchResultsPage() {
  return (
    <div className="rowHolder">
      <>
        {book_array.map(
          ({ cover, title, author, condition, giver, cost }, index) => (
            <SearchResultRow
              {...{ cover }}
              {...{ title }}
              {...{ author }}
              {...{ condition }}
              {...{ giver }}
              {...{ cost }}
              key={index}
            />
          )
        )}
      </>
    </div>
  );
}

export default SearchResultsPage;
