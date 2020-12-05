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
    function formatLibrarySwaps(user, userId) {
        return user.reduce((swapArray, swap) => {
            if (swap.swap_id != null && swap.owner_id == userId) {
                const newSwap = {
                    id: swap.swap_id,
                    condition: swap.condition,
                    status: swap.status,
                    cost: swap.cost,
                    creation_date: swap.creation_date,
                    owner: {
                      id: swap.owner_id,
                      name: swap.name,
                    },
                    receiver: swap.receiver_id ? { id: swap.receiver_id} : null,
            }
                swapArray.push(newSwap);
            }
            return swapArray;
        }, [])
    }
        module.exports.formatLibrary = formatLibrary
        module.exports.formatWishlist = formatWishlist
        module.exports.formatLibrarySwaps = formatLibrarySwaps