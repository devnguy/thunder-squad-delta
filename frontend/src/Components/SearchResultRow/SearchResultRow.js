import { useState } from "react";
import useApi from "../../Api/useApi";
import requests from "../../Api/requests";
import "./SearchResultRow.css";
import { Link, useHistory } from "react-router-dom";

function SearchResultRow({ id, cover, title, author, condition, giver, cost }) {
  let history = useHistory();

  const bookPageRedirect = () => {
    history.push(`/book/${id}`);
  };

  return (
    <div className="searchRow">
      <div className="coverHolder">
        <img className="bookImg" alt="" src={cover} />
      </div>
      <div className="bookDetails">
        <p className="titleTxt">{title}</p>
        <p className="authorTxt">
          <span className="byTxt">by </span>
          {author}
        </p>
        <p className="conditionTxt">
          <span className="condWord">Condition: </span> {condition}
        </p>
      </div>
      <div className="swapDetails">
        <p className="giverTxt">
          <span className="giverWord">Giver: </span>
          {giver}
        </p>
        <p className="costTxt">{cost} Points</p>
      </div>
      <div className="infoButtonHolder">
        <button className="infoButton" onClick={() => bookPageRedirect(id)}>More Info</button>
      </div>
    </div>
  );
}

export default SearchResultRow;
