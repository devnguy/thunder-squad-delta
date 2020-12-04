import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";

import AuthContext from "../../Context/AuthContext";
import BookCover from "../../Assets/Book Cover.png";
import "./BookPage.css";
import { Button } from "../../Components";
import useApi from "../../Api/useApi";
import requests from "../../Api/requests";


const filter_categories = ["Title", "Author", "Genre", "User"];
const condition_categories = ["Perfect", "Great", "Good", "Poor"];

function BookPage(props) {
  const swap = useApi(requests.getBookDetails);
  const books = useApi(requests.getSearchResults);
  const update = useApi(requests.updateSwap);
  const { userId } = useContext(AuthContext);
  let { swapId, filterTerm, searchTerm } = useParams();
  let history = useHistory();

  useEffect(() => {
    swap.request(swapId);
  }, [swapId]);

  useEffect(() => {
    if(swap.data.book){
      books.request(swap.data.book.title, 'Title');
      console.log(swap.data.book);
      console.log(parseInt(JSON.stringify(userId)));
    }
  }, [swap.data]);

  const bookPageRedirect = (id) => {
    history.push(`/book/${id}`);
  };

  const proposeTrade = () => {
    update.request(swapId, "requested", parseInt(JSON.stringify(userId)));
    console.log(update.response);
  };

  return (
    <div className="bookPage">
      {swap.loading && (
        <p className="nowShowing">Loading Search Results...</p>
      )}
      {swap.data.book && !swap.loading && (
      <section className="container">
        <div className="bookImg">
          <img
            id="bookCover"
            src={swap.data.book.image}
            alt="Man leaning on building for some reason"
          />
        </div>
        <section className="data">
          <div className="bookData">
            <div className="titleDiv">
              <h2 id="titlePlaceholder">Title: </h2>
              <h2 id="bookTitle"> {swap.data.book.title}</h2>
            </div>
            <div className="condDiv">
              <h2 id="condPlacehoder">Condition: </h2>
      <h2 id="bookCond"> {swap.data.condition}</h2>
            </div>
            <div className="userDiv">
              <h2 id="userPlaceholder">User: </h2>
              <h2 id="bookUser"> {swap.data.owner.name}</h2>
            </div>
            <div className="locDiv">
              <h2 id="locPlaceholder">Location: </h2>
              <h2 id="userLoc"> {swap.data.owner.state}</h2>
            </div>
            <div className="priceDiv">
              <h2 id="pricePlacehoder">Price: </h2>
      <h2 id="bookPrice"> {swap.data.cost} Bookpoints</h2>
            </div>
          </div>
          <div className="bookButtons">
            
            <div className="proposeButton">
              <button id="proposeCurrent" onClick={() => proposeTrade()}>ProposeTrade</button>
            </div>
          </div>
        </section>
      </section>
      )}
      <div id="AvailableTableSection">
        {books.data.length > 0 && (
          <div id="AvailableTable">
          <div className="TableRow">
            <div className="TableCell BorderRight HeaderCell" ><p className="CellText">Name</p></div>
            <div className="TableCell BorderRight HeaderCell"><p className="CellText">Cost</p></div>
            <div className="TableCell BorderRight HeaderCell"><p className="CellText">Condition</p></div>
            <div className="TableCell BorderRight HeaderCell"><p className="CellText">Location</p></div>
            <div className="TableCell HeaderCell"><p className="CellText"></p></div>
          </div>
          {books.data.map((swap, index) => (
          <div className="TableRow">
            <div className="TableCell BorderRight" ><p className="CellText">{swap.owner.name}</p></div>
            <div className="TableCell BorderRight"><p className="CellText">{swap.cost}</p></div>
            <div className="TableCell BorderRight"><p className="CellText">{swap.condition}</p></div>
            <div className="TableCell BorderRight"><p className="CellText">{swap.owner.state}</p></div>
            <div className="TableCell"><Button onClick={() => bookPageRedirect(swap.id)}>More Info</Button></div>
          </div>
        ))}
      </div>)}
        
      </div>
    </div>
  );
}

export default BookPage;
