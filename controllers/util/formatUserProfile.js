function formatLibrary(user) {
    return user.reduce((bookArray, book) => {
        if (book.swap_id != null && book.receiver_id == null) {
            const newBook = {
                book_id: book.book_id,
                title: book.title,
                author: book.author,
                genre: book.genre,
                description: book.description,
                year_published: book.year_published,
                publisher: book.publisher,
                image: book.image
            }
            bookArray.push(newBook);
        }
        return bookArray;
    }, [])
}
    function formatWishlist(user) {
        return user.reduce((bookArray, book) => {
            if (book.wish_id != null) {
                const newBook = {
                    book_id: book.book_id,
                    title: book.title,
                    author: book.author,
                    genre: book.genre,
                    description: book.description,
                    year_published: book.year_published,
                    publisher: book.publisher,
                    image: book.image
                }
                bookArray.push(newBook);
            }
            return bookArray;
        }, [])
    }

        module.exports.formatLibrary = formatLibrary
        module.exports.formatWishlist = formatWishlist