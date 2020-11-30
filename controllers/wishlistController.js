const SQL = require('sql-template-strings')
const db = require('../lib/db')

const formatWishlist = require('./util/formatWishlist')
const { MissingAttributeError, WishlistItemNotFoundError, BookNotFoundError, DatabaseError } = require('../errors')

// Get all wishlist books.
exports.getWishes = async function (req, res, next) {
    try {
        const books = await db.query(SQL`SELECT * FROM wishlist`)
        if (books.error) throw new DatabaseError(books.error)
        return res.status(200).json(books)
    } catch (error) {
        return next(error)
    }
}

// Get all wishlist books from one user.
exports.getUserWishes = async function (req, res, next) {
    try {
        const books = await db.query(SQL`
        SELECT * FROM wishlist JOIN book
        ON wishlist.book_id = book.book_id WHERE user_id = ${req.params.userId}`)
        if (books.error) throw new DatabaseError(books.error)
        return res.status(200).json(formatWishlist(books))
    } catch (error) {
        return next(error)
    }
}

// Get a wishlist book by wishlist id.
exports.getWish = async function (req, res, next) {
    try {
        const [book] = await db.query(SQL`
        SELECT * FROM wishlist JOIN book
        ON wishlist.book_id = book.book_id WHERE wish_id = ${req.params.wishId}`)
        if (!book) throw new WishlistItemNotFoundError()
        if (book.error) throw new DatabaseError(book.error)

        return res.status(200).json(book)
    } catch (error) {
        return next(error)
    }
}

// Delete a wishlist book
exports.deleteWish = async function (req, res, next) {
    try {
        // Check if the Book exists before deleting
        const book = await db.query(SQL`SELECT * FROM wishlist WHERE wish_id = ${req.params.wishId}`)
        if (book.error) throw new DatabaseError(book.error)
        if (!book.length) throw new BookNotFoundError()
        // If the wishilst book with that id exists, delete it and return a message
        const result = await db.query(SQL`DELETE FROM wishlist WHERE wish_id = ${req.params.wishId}`)
        if (result.error) throw new DatabaseError(result.error)
        return res.status(200).json({
            status: true,
            message: "Wishlist book successfully removed!"
        })
    } catch (error) {
        return next(error)
    }
}
