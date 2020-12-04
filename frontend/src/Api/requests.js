import client from "./client";

// Browse Page
const getBooks = () => client.get("/books");

// Search Results Page
const getSearchResults = (searchterm, filterterm) =>
  client.get(`/swaps?q=${searchterm}&searchby=${filterterm}`);

// Book Page
const getBookDetails = (bookId) => client.get(`/swaps/${bookId}`);

// Profile Page
const getProfileDetails = (userId) => client.get(`/users/${userId}/profile`);

// Library Page
const getUserSwaps = (userId) => client.get(`/users/${userId}/swaps`);

//Pending Swaps Page
const changeSwapStatus = (swapId, status) =>
  client.patch(`/swaps/${swapId}`, {
    status: status,
  });


// Pending Swaps Page
const changePoints = (userId, delta) =>
  client.patch(`/users/${userId}`, {
    user: {
      points:delta
    },
  }
  )

// Register Page
const registerUser = (username, email, password) =>
  client.post("/users", {
    user: {
      name: username,
      email: email,
      password: password,
    },
  });

// Login Page
const loginUser = (email, password) =>
  client.post("/users/login", {
    email: email,
    password: password,
  });

// Post Book Modal - Search for Book Suggestion
const searchGoogleBooks = (title, author) =>
  client.get(`googleBooks/${title}/${author}`);

const requests = {
  getBooks,
  getSearchResults,
  getBookDetails,
  getProfileDetails,
  getUserSwaps,
  registerUser,
  loginUser,
  searchGoogleBooks,
  changeSwapStatus,
  changePoints,
};

export default requests;
