import client from "./client";

// Register Page
const registerUser = (user) => client.post("/users", { user });

// Login Page
const loginUser = (email, password) =>
  client.post("/users/login", {
    email: email,
    password: password,
  });

// Browse Page
const getAllSwaps = () => client.get("/swaps/all");
const getAllBooks = () => client.get("/books");

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

// Wishlist Page
const getUserWishes = (userId) => client.get(`/wishlist/${userId}`);

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

// Post Book Modal - Post New Swap
const postSwap = (userId, condition, cost, swap) =>
  client.post(`/users/${userId}/swaps`, {
    condition,
    cost,
    book: {
      title: swap.title,
      author: swap.author,
      genre: swap.genre,
      description: swap.description,
      year_published: swap.year_published,
      publisher: swap.publisher,
      image: swap.image,
    },
  });

// Post Book Modal - Post New Wishlist Item
const postWishlistItem = (userId, book) =>
  client.post(`/wishlist/${userId}`, {
    title: book.title,
    author: book.author,
    genre: book.genre,
    description: book.description,
    year_published: book.year_published,
    publisher: book.publisher,
    image: book.image,
  });

const requests = {
  registerUser,
  loginUser,
  getAllBooks,
  getAllSwaps,
  getSearchResults,
  getBookDetails,
  getProfileDetails,
  getUserSwaps,
  getUserWishes,
  getSwapDetails,
  searchGoogleBooks,
  changeSwapStatus,
  changePoints,
  postSwap,
  postWishlistItem,
};

export default requests;
