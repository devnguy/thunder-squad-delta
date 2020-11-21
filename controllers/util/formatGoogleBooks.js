function formatGoogleBooks(books) {
   return books.items.map((book) => ({
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors[0],
            genre: book.volumeInfo.categories[0],
            description: book.volumeInfo.description,
            year_published: book.volumeInfo.publishedDate,
            publisher: book.volumeInfo.publisher,
            image: book.volumeInfo.imageLinks.thumbnail,
        }))
  }
  
  module.exports = formatGoogleBooks
  