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

// Create a wishlist book.
exports.postWish = async function (req, res, next) {
    try {
        // Check for missing attributes
        if (!req.body.title ||
            !req.body.author ||
            !req.body.publisher ||
            !req.body.image) {
            throw new MissingAttributeError()
        }
        // Check if book exists in database
        const bookCheck = await db.query(SQL`
        SELECT * FROM book WHERE 
        title = ${req.body.title} AND 
        author = ${req.body.author} AND
        publisher = ${req.body.publisher}`)
        if (bookCheck.error) throw new DatabaseError()
        // If not found, insert the book into the database
        let newBookId;
        if (!bookCheck.length) {
            const newBook = {
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre ? req.body.genre : null,
                description: req.body.description ? req.body.description : null,
                year_published: req.body.year_published ? req.body.year_published : null,
                publisher: req.body.publisher,
                image: req.body.image
            }
            const addNewBook = await db.query(SQL`
            INSERT INTO book 
            (title, author, genre, description, year_published, publisher, image)
            VALUES (
                ${newBook.title}, 
                ${newBook.author}, 
                ${newBook.genre}, 
                ${newBook.description},
                ${newBook.year_published},
                ${newBook.publisher},
                ${newBook.image})`
            )
            if (addNewBook.error) throw new DatabaseError()
            newBookId = addNewBook.insertId
        } else {
            newBookId = bookCheck[0].book_id
        }
        // Add book to users wishlist
        const addWish = await db.query(SQL`
        INSERT INTO wishlist
        (book_id, user_id, status)
        VALUES ( ${newBookId}, ${req.params.userId}, "active")`)
        if (addWish.error) throw new DatabaseError()

        // Send confirmation message
        return res.status(201).json({
            message: "Book added to wishlist",
            insertId: addWish.insertId
        })
    } catch (error) {
        return next(error)
    }
}


// Delete a wishlist book.
exports.deleteWish = async function (req, res, next) {
    try {
        // Check if the wishlist book exists before deleting
        const book = await db.query(SQL`SELECT * FROM wishlist WHERE wish_id = ${req.params.wishId}`)
        if (book.error) throw new DatabaseError(book.error)
        if (!book.length) throw new WishlistItemNotFoundError()
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
