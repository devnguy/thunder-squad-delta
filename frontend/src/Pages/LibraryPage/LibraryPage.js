import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Lottie from "react-lottie";

import * as LoadingAnimation from "../../Assets/Animations/Loading.json";
import "./LibraryPage.css";
import AboutPostIcon from "../../Assets/About Post Icon.png";
import { Button, Book, PostModal } from "../../Components";
import useApi from "../../Api/useApi";
import requests from "../../Api/requests";
import AuthContext from "../../Context/AuthContext";

const LibraryPage = () => {
  const userSwaps = useApi(requests.getUserSwaps);
  const postSwap = useApi(requests.postSwap);
  const { userId } = useContext(AuthContext);
  const [bookRows, setBookRows] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  let history = useHistory();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const goToWishlist = () => {
    history.push("/wishlist");
  };

  const goToSwapPage = (swapId) => {
    if (swapId) {
      history.push(`/book/${swapId}`);
    }
  };

  const booksToRows = () => {
    const rows = userSwaps.data.owned.reduce(function (rows, book, index) {
      return (
        (index % 4 === 0
          ? rows.push([book])
          : rows[rows.length - 1].push(book)) && rows
      );
    }, []);
    setBookRows(rows);
  };

  const handlePostBook = (suggestion, condition, cost) => {
    if (userId && condition !== "Select" && cost !== "" && suggestion) {
      postSwap.request(userId, condition, cost, suggestion);
      setModalVisible(false);
    }
  };

  useEffect(() => {
    if (userId) {
      userSwaps.request(userId);
    }
  }, []);

  useEffect(() => {
    if (postSwap.data.status && postSwap.data.status === true) {
      userSwaps.request(userId);
    }
  }, [postSwap.data]);

  useEffect(() => {
    if (userSwaps.data.length !== 0) {
      booksToRows();
    }
  }, [userSwaps.data]);

  return (
    <>
      {modalVisible && (
        <PostModal
          postBookVariant
          onClose={() => setModalVisible(false)}
          onSubmit={handlePostBook}
        />
      )}
      <div id="libraryPageBody">
        <div
          id="libraryPageSidebar"
          style={modalVisible ? { opacity: "50%" } : null}
        >
          <p id="myLibraryHeader">My Library</p>
          <img src={AboutPostIcon} alt="" id="postBookIcon" />
          <Button onClick={() => setModalVisible(true)}>Post Book</Button>
          <Button outline color="blue" onClick={() => goToWishlist()}>
            Wishlist
          </Button>
        </div>
        <div
          id="libraryPageBookBlock"
          style={modalVisible ? { opacity: "50%" } : null}
        >
          {!bookRows && userSwaps.loading && (
            <Lottie
              options={defaultOptions}
              height={200}
              width={400}
              isStopped={false}
              isPaused={false}
            />
          )}
          {userSwaps.data.owned &&
            userSwaps.data.owned.length === 0 &&
            !userSwaps.loading && (
              <div className="bookRowEmptyContainer">
                <p
                  className="rowTitle"
                  style={{ fontSize: "20px", opacity: "40%" }}
                >
                  Looks like there's nothing here
                </p>
              </div>
            )}
          {userSwaps.data.owned &&
            userSwaps.data.owned.length > 0 &&
            bookRows &&
            bookRows.map((row, rowIndex) => (
              <div className="libraryBookRow" key={rowIndex}>
                {row.map((swap, swapIndex) => (
                  <Book
                    key={swapIndex}
                    cover={swap.book.image}
                    title={swap.book.title}
                    author={swap.book.author}
                    onClick={() => goToSwapPage(swap.id)}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default LibraryPage;
