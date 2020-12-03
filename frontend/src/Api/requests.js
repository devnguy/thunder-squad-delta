import client from "./client";

// Browse Page
const getBooks = () => client.get("/books");

// Search Results Page
const getSearchResults = (searchterm, filterterm) =>
  client.get(`/swaps?q=${searchterm}&searchby=${filterterm}`);

// Book Page
const getBookDetails = (bookId) => client.get(`/swaps/${bookId}`);

const getSwapDetails = (swapId) => client.get(`/swaps/${swapId}`);

// Profile Page
const getProfileDetails = (userId) => client.get(`/users/${userId}/profile`);

// Library Page
const getUserSwaps = (userId) => client.get(`/users/${userId}/swaps`);

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
  getSwapDetails,
  searchGoogleBooks,
};

export default requests;
