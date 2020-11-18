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

// Register Page
const registerUser = (username, email, password) => {
  client.post("/users", {
    user: {
      name: username,
      email: email,
      password: password,
    },
  });
};

// Login Page
const loginUser = (email, password) =>
  client.post("/users/login", {
    email: email,
    password: password,
  });

const requests = {
  getBooks,
  getSearchResults,
  getBookDetails,
  getProfileDetails,
  registerUser,
  loginUser,
};

export default requests;
