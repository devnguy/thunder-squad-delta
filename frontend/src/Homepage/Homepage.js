import React, { useState } from "react";
import NavBar from "../Components/NavBar/NavBar";
import SearchBar from "../Components/SearchBar/SearchBar";
import IconSquare from "../Components/IconSquare/IconSquare";
import "./Homepage.css";

import BrowseIcon from "../Assets/Browse Icon.png";
import PeopleIcon from "../Assets/People Icon.png";
import GlobeIcon from "../Assets/Globe Icon.png";
import BookpileIcon from "../Assets/Bookpile Icon.png";

function Homepage(props) {
  const [filterDropdown, setFilterDropdown] = useState(false);
  return (
    <div>
      <NavBar />
      <div className="searchbarBox">
        <SearchBar />
      </div>
      <div className="heuristicBox">
        <IconSquare text="Search through 10,000+ titles" image={BrowseIcon} />
        <IconSquare text="Trade with other users for points" image={PeopleIcon} />
        <IconSquare text="Ship to anywhere in the world" image={GlobeIcon} />
        <IconSquare text="Start your new adventure" image={BookpileIcon} />
      </div>
    </div>
  );
}

export default Homepage;
