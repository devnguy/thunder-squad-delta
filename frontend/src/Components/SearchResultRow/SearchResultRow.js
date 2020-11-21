import React from "react";

import "./SearchResultRow.css";
import { Link } from "react-router-dom";

function SearchResultRow({ cover, title, author, condition, giver, cost }) {
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
        <button className="infoButton">
          <Link to="/book">More Info</Link>
        </button>
      </div>
    </div>
  );
}

export default SearchResultRow;
