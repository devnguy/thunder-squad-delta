import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";


import BookCover from "../../Assets/Book Cover.png";
import "./BookPage.css";
import { SearchResultRow, SearchSort } from "../../Components";
import useApi from "../../Api/useApi";
import requests from "../../Api/requests";

const filter_categories = ["Title", "Author", "Genre", "User"];
const condition_categories = ["Perfect", "Great", "Good", "Poor"];

function BookPage(props) {
  const books = useApi(requests.getSearchResults);
  const [bookArray, setBookArray] = useState([]);
  let { filterTerm, searchTerm } = useParams();

  useEffect(() => {
    books.request(searchTerm, filterTerm);
  }, []);

  useEffect(() => {
    if (books.data !== []) {
      setBookArray(books.data);
    }
  }, [books.data]);

  return (
    <div className="bookPage">
      <section className="container">
        <div className="bookImg">
          <img
            id="bookCover"
            src={BookCover}
            alt="Man leaning on building for some reason"
          />
        </div>
        <section className="data">
          <div className="bookData">
            <div className="titleDiv">
              <h2 id="titlePlaceholder">Title: </h2>
              <h2 id="bookTitle">The Hobbit</h2>
            </div>
            <div className="condDiv">
              <h2 id="condPlacehoder">Condition: </h2>
              <h2 id="bookCond">Perfect</h2>
            </div>
            <div className="userDiv">
              <h2 id="userPlaceholder">User: </h2>
              <h2 id="bookUser">BigJon420</h2>
            </div>
            <div className="locDiv">
              <h2 id="locPlaceholder">Location: </h2>
              <h2 id="userLoc">Massachussetts, US</h2>
            </div>
            <div className="priceDiv">
              <h2 id="pricePlacehoder">Price: </h2>
              <h2 id="bookPrice">20 Bookpoints</h2>
            </div>
          </div>
          <div className="bookButtons">
            
            <div className="proposeButton">
              <button id="proposeCurrent">ProposeTrade</button>
            </div>
          </div>

          <div className="AvailableTable">
            <table>
              <caption>Available Copies</caption>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Condition</th>
                  <th>Price</th>
                  <th>Location</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>xxDragon_Sniperxx</td>
                  <td>Bad</td>
                  <td>10000 Book Points</td>
                  <td>Sydney, Australia</td>
                  <td>
                    <button id="proposeTrade">ProposeTrade</button>
                  </td>
                </tr>
                <tr>
                  <td>Paul Paulson</td>
                  <td>Bad</td>
                  <td>100 Book Points</td>
                  <td>Oslo, Norway</td>
                  <td>
                    <button id="proposeTrade">ProposeTrade</button>
                  </td>
                </tr>
                <tr>
                  <td>daBabey44</td>
                  <td>Bad</td>
                  <td>99999 Book Points</td>
                  <td>Charlotte, North Carolina</td>
                  <td>
                    <button id="proposeTrade">ProposeTrade</button>
                  </td>
                </tr>
                <tr>
                  <td>BookLvr</td>
                  <td>Bad</td>
                  <td>5 Book Points</td>
                  <td>Nantucket, Massachussetts</td>
                  <td>
                    <button id="proposeTrade">ProposeTrade</button>
                  </td>
                </tr>
                <tr>
                  <td>goSox55</td>
                  <td>Bad</td>
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
