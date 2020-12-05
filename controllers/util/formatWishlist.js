function formatWishlist(books) {
  return books.map((book) => ({
    id: book.wish_id,
    status: book.status,
    user_id: book.user_id,
    book: {
      id: book.book_id,
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
      year_published: book.year_published,
      publisher: book.publisher,
      image: book.image,
    },
  }));
}

module.exports = formatWishlist;
