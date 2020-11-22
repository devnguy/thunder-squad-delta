function formatGoogleBooks(books) {
    if (books.items) {
        formattedBooks = books.items.map((book) => ({
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors[0],
            genre: book.volumeInfo.categories ? book.volumeInfo.categories[0] : null,
            description: book.volumeInfo.description,
            year_published: book.volumeInfo.publishedDate,
            publisher: book.volumeInfo.publisher,
            image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null,
        }))
        return formattedBooks
    }
    else return []

}

module.exports = formatGoogleBooks
