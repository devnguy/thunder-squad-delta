import React from "react";

import HeaderImage from "../../Assets/AboutHeader.png";
import PostIcon from "../../Assets/About Post Icon.png";
import SearchIcon from "../../Assets/About Search Icon.png";
import SwapIcon from "../../Assets/About Swap Icon.png";
import PointsIcon from "../../Assets/About Points Icon.png";
import MaleAvatar from "../../Assets/About Male Avatar.png";
import FemaleAvatar from "../../Assets/About Female Avatar.png";

import "./AboutPage.css";

function AboutPage(props) {
  return (
    <div className="aboutPage">
      {/* <div className="titleSection">
        <p className="aboutTitleText">How Does Bookswap Work?</p>
      </div> */}
      <div className="headerSection">
        <img src={HeaderImage} alt="" className="headerImage" />
      </div>
      <div className="infoSection">
        <div className="infoTextSection">
          <p className="subHeadingText">Post Books</p>
          <p className="sectionBodyText">
            Go to the “My Library” page from the user actions from the dropdown
            on the profile icon in the upper right hand corner. Post a book that
            you are willing to send to another user. Users will make a request
            for your book for an amount of points. You can use points to request
            other books that you would like to read!
          </p>
        </div>
        <img src={PostIcon} alt="" className="infoIcon" />
      </div>
      <div className="infoSection">
        <img src={SearchIcon} alt="" className="infoIcon" />
        <div className="infoTextSection">
          <p className="subHeadingText">Search</p>
          <p className="sectionBodyText">
            Use the search bar at the top of the page to find a book you are
            interested in reading. You can filter by several categories (i.e.
            Title, Author, Genre) to make your search more precise.
          </p>
        </div>
      </div>
      <div className="infoSection">
        <div className="infoTextSection">
          <p className="subHeadingText">Swap</p>
          <p className="sectionBodyText">
            If someone requests your book, you may accept or decline. If you
            accept, their address is revealed and you will ship the book to them
            and are responsible for shipping costs. Once they receive the book
            and it is in the expected condition, you will gain the points from
            that user that the book was worth.
          </p>
        </div>
        <img src={SwapIcon} alt="" className="infoIcon" />
      </div>
      <div className="infoSection">
        <img src={PointsIcon} alt="" className="infoIcon" />
        <div className="infoTextSection">
          <p className="subHeadingText">Points</p>
          <p className="sectionBodyText">
            Books are worth a certain amount of points. Once we have figured
            that part out, this section will be updated for your reading
            pleasure.
          </p>
        </div>
      </div>
      <div className="divider"></div>
      <div className="bioSection">
        <p className="bioHeader">Who Are We?</p>
        <p className="bioSubHeader">Thunder Squad Delta</p>
        <p className="sectionBodyText">
          We’re just a rogue group of computer scientists saving the world one
          book at a time. Enough said. I guess you could check out our profiles
          below if you are really interested...
        </p>
        <div className="profiles">
          <div className="profileContainer">
            <img className="profileAvatar" src={FemaleAvatar} alt="" />
            <p className="profileName">Adriane</p>
          </div>
          <div className="profileContainer">
            <img className="profileAvatar" src={MaleAvatar} alt="" />
            <p className="profileName">Chris</p>
          </div>
          <div className="profileContainer">
            <img className="profileAvatar" src={MaleAvatar} alt="" />
            <p className="profileName">Devin</p>
          </div>
          <div className="profileContainer">
            <img className="profileAvatar" src={MaleAvatar} alt="" />
            <p className="profileName">Jeremy</p>
          </div>
          <div className="profileContainer">
            <img className="profileAvatar" src={MaleAvatar} alt="" />
            <p className="profileName">Nathan</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
