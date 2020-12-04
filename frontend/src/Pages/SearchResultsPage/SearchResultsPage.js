import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { SearchResultRow, Dropdown } from "../../Components";
import useApi from "../../Api/useApi";
import requests from "../../Api/requests";
import "./SearchResultsPage.css";

const filterCategories = [
  "Cost (↓)",
  "Cost (↑)",
  "Condition (↓)",
  "Condition (↑)",
];

function SearchResultsPage(props) {
  const books = useApi(requests.getSearchResults);
  let { filterTerm, searchTerm } = useParams();
  const [sortTerm, setSortTerm] = useState("Cost (↑)");
  const [bookArray, setBookArray] = useState([]);

  const handleSearch = () => {
    books.request(searchTerm, filterTerm);
  };

  const sortBy = () => {
    if (sortTerm === "Cost (↑)") {
      let sorted = [...books.data].sort((a, b) => {
        return a.cost - b.cost;
      });
      setBookArray(sorted);
    } else if (sortTerm === "Cost (↓)") {
      let sorted = [...books.data].sort((a, b) => {
        return b.cost - a.cost;
      });
      setBookArray(sorted);
    } else if (sortTerm === "Condition (↑)") {
      let sorted = [...books.data].sort((a, b) => {
        return a.condition - b.condition;
      });
      setBookArray(sorted);
    } else if (sortTerm === "Condition (↓)") {
      let sorted = [...books.data].sort((a, b) => {
        return b.condition - a.condition;
      });
      setBookArray(sorted);
    }
  };

  useEffect(() => {
    setBookArray(books.data);
    if (books.data.length > 0) {
      sortBy();
    }
  }, [books.data]);

  useEffect(() => {
    if (books.data.length > 0) {
      sortBy();
    }
  }, [sortTerm]);

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
          <Dropdown
            title="Cost (↑)"
            options={filterCategories}
            buttonHeight="50px"
            onSelect={setSortTerm}
          />
        </div>
      </div>
      <div className="rowHolder">
        {!books.loading && bookArray && (
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
