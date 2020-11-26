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

// Posting a book will create a book entitiy in the database if it exists and
// will call next() to create the swap.
exports.postBook = async function (req, res, next) {
  try {
    // Confirm required fields were passed.
    if (
      !req.body.book ||
      !req.body.book.title ||
      !req.body.book.author ||
      !req.body.condition ||
      !req.body.cost
    ) {
      throw new MissingAttributeError()
    }
    req.body.bookId = await createBook(req.body.book)
    next()
  } catch (error) {
    next(error)
  }
}

/**
 * Helper function that attempts to insert book object into database and returns
 * the id of the inserted book. If the book already exists, it will not be
 * inserted and its id will be returned.
 * @param {object} book
 * @return {int} bookId
 */
async function createBook({
  title,
  author,
  genre = null,
  description = null,
  year_published = null,
  publisher = null,
  image = null,
}) {
  // On successful insert, return the insertId.
  const insertRes = await db.query(SQL`
    INSERT INTO book (title, author, genre, description, year_published, publisher, image)
    VALUES (${title}, ${author}, ${genre}, ${description}, ${year_published}, ${publisher}, ${image})
  `)
  if (insertRes.insertId) return insertRes.insertId

  // If book already exists, get the book_id.
  const [bookIdRes] = await db.query(SQL`
    SELECT book_id 
    FROM book
    WHERE title = ${title} AND author = ${author} and description = ${description} and year_published = ${year_published}
  `)
  return bookIdRes.book_id
}
