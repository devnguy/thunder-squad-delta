import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./LibraryPage.css";
import AboutPostIcon from "../../Assets/About Post Icon.png";
import { Button, Book, PostModal } from "../../Components";
import useApi from "../../Api/useApi";
import requests from "../../Api/requests";
import AuthContext from "../../Context/AuthContext";

const LibraryPage = () => {
  const userSwaps = useApi(requests.getUserSwaps);
  const { userId } = useContext(AuthContext);
  let history = useHistory();
  const [bookRows, setBookRows] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const goToWishlist = () => {
    history.push("/wishlist");
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

  useEffect(() => {
    userSwaps.request(userId);
  }, []);

  useEffect(() => {
    if (userSwaps.data.length !== 0) {
      booksToRows();
    }
  }, [userSwaps.data]);

  return (
    <>
      {modalVisible && <PostModal onClose={() => setModalVisible(false)} />}
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
          {bookRows &&
            bookRows.map((row, rowIndex) => (
              <div className="libraryBookRow" key={rowIndex}>
                {row.map((swap, swapIndex) => (
                  <Book
                    key={swapIndex}
                    cover={swap.book.image}
                    title={swap.book.title}
                    author={swap.book.author}
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
