import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { SearchResultRow, SearchSort } from "../../Components";
import useApi from "../../Api/useApi";
import requests from "../../Api/requests";

import "./SearchResultsPage.css";

function SearchResultsPage(props) {
  const books = useApi(requests.getSearchResults);
  let { filterTerm, searchTerm } = useParams();

  const handleSearch = () => {
    // console.log("Filter:" + filterTerm);
    // console.log("Search:" + searchTerm);
    books.request(searchTerm, filterTerm);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm, filterTerm]);

  return (
    <div className="searchPageContainer">
      <div className="searchControl">
        {books.loading && (
          <p className="nowShowing">Loading Search Results...</p>
        )}
        {!books.loading && (
          <p className="nowShowing">
            Showing {books.data.length} results for "{searchTerm}"
          </p>
        )}
        <div className="sortContainer">
          <p className="sortLabel">Sort Results By: </p>
          <SearchSort className="searchSortStyle" />
        </div>
      </div>
      <div className="rowHolder">
        {!books.loading && (
          <>
            {bookArray.map(({ id, book, owner, condition, cost }, index) => (
              <SearchResultRow
                id={id}
                cover={book.image}
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
