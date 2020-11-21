import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

import BookCover from "../../Assets/Book Cover.png";
import "./BookPage.css";

const filter_categories = ["Title", "Author", "Genre", "User"];
const condition_categories = ["Perfect", "Great", "Good", "Poor"];

function BookPage(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterTerm, setFilterTerm] = useState("Filter");

  const [conditionOpen, setConditionOpen] = useState(false);
  const [conditionTerm, setConditionTerm] = useState("Condition");
  return (
    <div className="bookPage">
      <div className="bookSearchContainer">
        <div className="bookFilterContainer">
          <button
            className="bookFilterButton bookFilterText"
            onClick={() => setFilterOpen((filterOpen) => !filterOpen)}
          >
            {filterTerm}
            {filterOpen && (
              <FontAwesomeIcon icon={faChevronUp} size="sm" color="#fffaff" />
            )}
            {!filterOpen && (
              <FontAwesomeIcon icon={faChevronDown} size="sm" color="#fffaff" />
            )}
          </button>
          {filterOpen && (
            <div className="bookDropdown">
              {filter_categories.map((category, index) => (
                <button
                  key={index}
                  className={
                    index < 3
                      ? "bookDropdownCell bookFilterText bookCellWithBorder"
                      : "bookDropdownCell bookFilterText"
                  }
                  onClick={() => {
                    setFilterTerm(category);
                    setConditionOpen(false);
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
        <form className="bookSearchBar">
          <input
            type="text"
            placeholder="Search..."
            className="bookSearchBarPrompt"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bookSearchButton">
            <Link to="/BookPage">
              <FontAwesomeIcon icon={faSearch} size="2x" color="#fffaff" />
            </Link>
          </button>
        </form>
      </div>
      <section className="container">
        <div className="bookImg">
          <img
            id="bookCover"
            src={BookCover}
            alt="Man leaning on building for some reason"
          />
        </div>
        <section className="data">
          <div className="return">
            <p>
              <Link to="/">Return to Search</Link>
            </p>
          </div>
          <div className="Title">
            <h2 id="titlePlaceholder">Title: </h2>
            <h2 id="bookTitle">The Hobbit</h2>
          </div>
          <div className="conditionContainer">
            <button
              className="conditionButton conditionText"
              onClick={() =>
                setConditionOpen((conditionOpen) => !conditionOpen)
              }
            >
              {conditionTerm}
              {conditionOpen && (
                <FontAwesomeIcon icon={faChevronUp} size="sm" color="#fffaff" />
              )}
              {!conditionOpen && (
                <FontAwesomeIcon
                  icon={faChevronDown}
                  size="sm"
                  color="#fffaff"
                />
              )}
            </button>
            {conditionOpen && (
              <div className="conditionDropdown">
                {condition_categories.map((category, index) => (
                  <button
                    key={index}
                    className={
                      index < 3
                        ? "dropdownCell filterText cellWithBorder"
                        : "dropdownCell filterText"
                    }
                    onClick={() => {
                      setConditionTerm(category);
                      setConditionOpen(false);
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="AvailableTable">
            <table>
              <caption>Available Copies</caption>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Price</th>
                  <th>Location</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>xxDragon_Sniperxx</td>
                  <td>10000 Book Points</td>
                  <td>Sydney, Australia</td>
                  <td>
                    <button id="proposeTrade">ProposeTrade</button>
                  </td>
                </tr>
                <tr>
                  <td>Paul Paulson</td>
                  <td>100 Book Points</td>
                  <td>Oslo, Norway</td>
                  <td>
                    <button id="proposeTrade">ProposeTrade</button>
                  </td>
                </tr>
                <tr>
                  <td>daBabey44</td>
                  <td>99999 Book Points</td>
                  <td>Charlotte, North Carolina</td>
                  <td>
                    <button id="proposeTrade">ProposeTrade</button>
                  </td>
                </tr>
                <tr>
                  <td>BookLvr</td>
                  <td>5 Book Points</td>
                  <td>Nantucket, Massachussetts</td>
                  <td>
                    <button id="proposeTrade">ProposeTrade</button>
                  </td>
                </tr>
                <tr>
                  <td>goSox55</td>
                  <td>1 Book Points</td>
                  <td>New York, New York</td>
                  <td>
                    <button id="proposeTrade">ProposeTrade</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </div>
  );
}

export default BookPage;
