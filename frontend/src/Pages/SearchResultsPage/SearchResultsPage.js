import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { SearchResultRow, SearchSort } from "../../Components";
import useApi from "../../Api/useApi";
import requests from "../../Api/requests";

import BookCover from "../../Assets/BookCover.png";
import "./SearchResultsPage.css";

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

function SearchResultsPage(props) {
  const books = useApi(requests.getSearchResults);
  const [bookArray, setBookArray] = useState([]);
  let { filterTerm, searchTerm } = useParams();

  useEffect(() => {
    books.request(searchTerm, filterTerm);
  }, []);

  useEffect(() => {
    if (books.data !== []) {
      setBookArray(books.data);
      console.log(books.data);
    }
  }, [books.data]);

  return (
    <div className="searchPageContainer">
      <div className="searchControl">
        {books.loading && (
          <p className="nowShowing">Loading Search Results...</p>
        )}
        {!books.loading && bookArray !== [] && (
          <p className="nowShowing">
            Showing {bookArray.length} results for "{searchTerm}"
          </p>
        )}
        {!books.loading && bookArray === [] && (
          <p className="nowShowing">Showing 0 results for "{searchTerm}"</p>
        )}
        <div className="sortContainer">
          <p className="sortLabel">Sort Results By: </p>
          <SearchSort className="searchSortStyle" />
        </div>
      </div>

      <div className="rowHolder">
        {bookArray && bookArray !== [] && (
          <>
            {bookArray.map(({ book, owner, condition, cost }, index) => (
              <SearchResultRow
                cover={BookCover}
                title={book.title}
                author={book.author}
                giver={owner.name}
                {...{ condition }}
                {...{ cost }}
                key={index}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default SearchResultsPage;
