import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Lottie from "react-lottie";

import * as LoadingAnimation from "../../Assets/Animations/Loading.json";
import "./WishlistPage.css";
import AboutPostIcon from "../../Assets/About Post Icon.png";
import { Button, Book, PostModal } from "../../Components";
import useApi from "../../Api/useApi";
import requests from "../../Api/requests";
import AuthContext from "../../Context/AuthContext";

const WishlistPage = () => {
  const userWishes = useApi(requests.getUserWishes);
  const postWish = useApi(requests.postWishlistItem);
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

  const goToLibrary = () => {
    history.push("/library");
  };

  const booksToRows = () => {
    const rows = userWishes.data.reduce(function (rows, book, index) {
      return (
        (index % 4 === 0
          ? rows.push([book])
          : rows[rows.length - 1].push(book)) && rows
      );
    }, []);
    setBookRows(rows);
  };

  const handlePostWishlistItem = (book, condition, cost) => {
    if (userId && book) {
      postWish.request(userId, book);
      setModalVisible(false);
    }
  };

  useEffect(() => {
    if (userId) {
      userWishes.request(userId);
    }
  }, []);

  useEffect(() => {
    if (userWishes.data.length !== 0) {
      booksToRows();
    }
  }, [userWishes.data]);

  return (
    <>
      {modalVisible && (
        <PostModal
          onClose={() => setModalVisible(false)}
          onSubmit={handlePostWishlistItem}
        />
      )}
      <div id="wishlistPageBody">
        <div
          id="wishlistPageSidebar"
          style={modalVisible ? { opacity: "50%" } : null}
        >
          <p id="myWishlistHeader">My Wishlist</p>
          <img src={AboutPostIcon} alt="" id="postWishlistItemIcon" />
          <Button color="blue" onClick={() => setModalVisible(true)}>
            Post to Wishlist
          </Button>
          <Button outline onClick={() => goToLibrary()}>
            Library
          </Button>
        </div>
        <div
          id="wishlistPageBookBlock"
          style={modalVisible ? { opacity: "50%" } : null}
        >
          {!bookRows && (
            <Lottie
              options={defaultOptions}
              height={200}
              width={400}
              isStopped={false}
              isPaused={false}
            />
          )}
          {bookRows &&
            bookRows.map((row, rowIndex) => (
              <div className="wishlistBookRow" key={rowIndex}>
                {row.map((wishItem, wishIndex) => (
                  <Book
                    key={wishIndex}
                    cover={wishItem.image}
                    title={wishItem.title}
                    author={wishItem.author}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default WishlistPage;
