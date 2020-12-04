import React, { useEffect, useState } from "react";

import { Library, SearchBar } from "../../Components";
import useApi from "../../Api/useApi";
import requests from "../../Api/requests";

import HeaderImage from "../../Assets/BrowseHeader.png";
import "./BrowsePage.css";

const headings = ["Recently Added", "Trending", "Top All Time"];

function BrowsePage(props) {
  const swaps = useApi(requests.getAllSwaps);
  const [swapArray, setSwapArray] = useState(null);

  useEffect(() => {
    swaps.request();
  }, []);

  useEffect(() => {
    if (swaps.data !== []) {
      setSwapArray(swaps.data);
    }
  }, [swaps.data]);

  return (
    <div>
      <div className="headerSection">
        <img src={HeaderImage} alt="" className="headerImage" />
      </div>
      <div className="searchBarSection">
        <SearchBar />
      </div>
      <div className="librarySection">
        {swapArray && (
          <Library
            headings={headings}
            book_arrays={[
              swapArray.slice(0, 4),
              swapArray.slice(4, 8),
              swapArray.slice(8, 12),
            ]}
            leftStart
          />
        )}
      </div>
    </div>
  );
}

export default BrowsePage;
