import React, { useEffect, useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import "./BookPage.css";
import AuthContext from "../../Context/AuthContext";
import useApi from "../../Api/useApi";
import requests from "../../Api/requests";
import { Button } from "../../Components";

function BookPage(props) {
  const swap = useApi(requests.getBookDetails);
  const books = useApi(requests.getSearchResults);
  const update = useApi(requests.updateSwap);
  const userDetails = useApi(requests.getUser);
  const pointChange = useApi(requests.changePoints);
  const { userId } = useContext(AuthContext);
  const [buttonTxt, setButtonTxt] = useState("Request Trade");
  let { swapId } = useParams();
  let history = useHistory();
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    swap.request(swapId);
    if (userId) {
      userDetails.request(userId);
    }
  }, [swapId]);

  useEffect(() => {
    if (swap.data.book) {
      books.request(swap.data.book.title, "Title");
    }
  }, [swap.data]);

  useEffect(() => {
    if (update.data.status && update.data.status === true) {
      pointChange.request(userId, swap.data.cost * -1);
      setRequested(true);
      setButtonTxt("Request Complete");
    }
  }, [update.data]);

  const bookPageRedirect = (id) => {
    history.push(`/book/${id}`);
  };

  const proposeTrade = () => {
    if (userId && userDetails.data.points >= swap.data.cost) {
      update.request(swapId, "requested", userId);
    } else {
      setButtonTxt("Not Enough Points");
    }
  };

  return (
    <div className="bookPage">
      <div className="upperPageSection">
        <div className="bookCoverContainer">
          <img
            id="bookCover"
            src={swap.data.book ? swap.data.book.image : null}
            alt="Book Cover"
          />
        </div>
        <div className="bookDataContainer">
          <div className="dataContainer">
            <p id="bookTitle">
              {swap.data.book ? swap.data.book.title : "Unknown"}
            </p>
          </div>
          <div className="dataContainer">
            <p id="bookAuthor">
              {swap.data.book ? swap.data.book.author : "Unknown"}
            </p>
          </div>
          <div className="dataContainer">
            <p className="bookInfoText">
              Condition: {swap.data.condition ? swap.data.condition : "Unknown"}
            </p>
          </div>
          <div className="dataContainer">
            <p className="bookInfoText">
              Cost: {swap.data.cost ? swap.data.cost : "Unknown"} Points
            </p>
          </div>
          <div className="dataContainer">
            <p className="bookInfoText">
              Owner: {swap.data.owner ? swap.data.owner.name : "Unknown"}
            </p>
          </div>
          <div className="dataContainer">
            <p className="bookInfoText">
              Location: {swap.data.owner ? swap.data.owner.state : "Unknown"},
              USA
            </p>
          </div>
          {userId && (
            <div id="proposeContainer">
              <Button onClick={!requested ? proposeTrade : null}>
                {buttonTxt}
              </Button>
            </div>
          )}
        </div>
      </div>
      <div id="tableTitleContainer">
        <p id="tableTitle">All Available Copies</p>
      </div>
      <div id="lowerPageSection">
        {books.data.length > 0 && (
          <div id="availableTable">
            <div className="tableRow borderBottom">
              <div className="tableCell borderRight headerCell">
                <p className="cellText">Owner</p>
              </div>
              <div className="tableCell borderRight headerCell">
                <p className="cellText">Cost</p>
              </div>
              <div className="tableCell borderRight headerCell">
                <p className="cellText">Condition</p>
              </div>
              <div className="tableCell borderRight headerCell">
                <p className="cellText">Location</p>
              </div>
              <div className="tableCell headerCell">
                <p className="cellText"></p>
              </div>
            </div>
            {books.data
              .filter((swap) => swap.status === "available")
              .map((swap, index) => (
                <div
                  key={index}
                  className={
                    index <
                    books.data.filter((swap) => swap.status === "available")
                      .length -
                      1
                      ? "tableRow borderBottom"
                      : "tableRow"
                  }
                >
                  <div className="tableCell borderRight">
                    <p className="cellText">
                      {swap.owner ? swap.owner.name : "Unknown"}
                    </p>
                  </div>
                  <div className="tableCell borderRight">
                    <p className="cellText">
                      {swap.cost ? swap.cost : "Unknown"}
                    </p>
                  </div>
                  <div className="tableCell borderRight">
                    <p className="cellText">
                      {swap.condition ? swap.condition : "Unknown"}
                    </p>
                  </div>
                  <div className="tableCell borderRight">
                    <p className="cellText">
                      {swap.owner ? swap.owner.state : "Unknown"}, USA
                    </p>
                  </div>
                  <div className="tableCell totalCenter">
                    <Button onClick={() => bookPageRedirect(swap.id)}>
                      More Info
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookPage;
