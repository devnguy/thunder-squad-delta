const SQL = require('sql-template-strings')
const db = require('../lib/db')

const { MissingAttributeError, DatabaseError } = require('../errors')

// Get all books.
exports.getBooks = async function (req, res, next) {
  try {
    const books = await db.query(SQL`SELECT * FROM book`)
    if (books.error) throw new DatabaseError(books.error)
    return res.status(200).json(books)
  } catch (error) {
    return next(error)
  }
}

// Create a new book.
exports.createBook = async function (req, res, next) {
  try {
    // Confirm required fields were passed.
    if (!req.body.book.title || !req.body.book.author || !req.body.book.genre) {
      throw new MissingAttributeError()
    }
    const response = await db.query(SQL`
      INSERT INTO book (title, author, genre, description, year_published, publisher, image)
      VALUES (${req.body.book.title}, ${req.body.book.author}, ${req.body.book.genre}, ${req.body.book.description}, ${req.body.book.year_published}, ${req.body.book.publisher}, ${req.body.book.image})
    `)
    if (response.error) throw new DatabaseError(response.error)
    // Get and send the book that was just created.
    const [book] = await db.query(SQL`SELECT * FROM book WHERE book_id = ${response.insertId}`)
    return res.status(201).json(book)
  } catch (error) {
    return next(error)
  }
}

// Get a book by id.
exports.getBook = async function (req, res, next) {
  try {
    const [book] = await db.query(SQL`SELECT * FROM book WHERE book_id = ${req.params.bookId}`)
    if (book.error) throw new DatabaseError(book.error)

    return res.status(200).json(book)
  } catch (error) {
    return next(error)
  }
}

// Edit an existing book. Will need to be updated.
exports.editBook = async function (req, res) {
  try {
    const [book] = await db.query(SQL`SELECT * FROM book WHERE book_id = ${req.params.bookId}`)
    if (!book) {
      return res.status(404).json({
        error: 'No book with this book_id exists',
      })
    }
    // Update the book with the values passed in the request if they exist.
    const response = await db.query(SQL`
      UPDATE book
      SET title = ${req.body.book.title || book.title},
          author = ${req.body.book.author || book.author},
          genre = ${req.body.book.genre || book.genre},
          description = ${req.body.book.description || book.description},
          year_published = ${req.body.book.year_published || book.year_published},
          publisher = ${req.body.book.publisher || book.publisher},
          image = ${req.body.book.image || book.image}
      WHERE book_id = ${req.params.bookId}
    `)
    if (response.error) {
      return res.status(500).json(response.error)
    }
    // Send the updated book.
    const [updatedBook] = await db.query(
      SQL`SELECT * FROM book WHERE book_id = ${req.params.bookId}`
    )
    return res.status(200).json(updatedBook)
  } catch (error) {}
}
