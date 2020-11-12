const SQL = require('sql-template-strings')
const db = require('../lib/db')

// Get all owned books.
exports.getBooks = async function(req, res) {
  try {
    const ownedBooks = await db.query(SQL `SELECT owned_book_id, book.book_id, title, author, genre, \`condition\`, description, year_published, publisher, image, owned_book.user_id FROM owned_book 
    JOIN book ON owned_book.book_id = book.book_id;`)
    if (ownedBooks.error) {
      return res.status(500).json(ownedBooks.error)
    }
    // Add a user for each owned book.
    for (const book of ownedBooks) {
        [book.owner] = await db.query(SQL `SELECT name, email, points, street, city, state, zip FROM owned_book 
        JOIN user ON owned_book.user_id = user.user_id WHERE owned_book.user_id = ${book.user_id}`)
        if (book.owner.error) {
          return res.status(500).json(book.owner.error)
        }
    }
    return res.status(200).json(ownedBooks)
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
}

// Create a new owned book.
exports.createBook = async function(req, res) {
  // Confirm required fields were passed.
  if (!req.body.ownedBook.book_id || !req.body.ownedBook.user_id || !req.body.ownedBook.condition) {
    return res
      .status(400)
      .json({
        error: 'The request object is missing at least one of the required attributes'
      })
  }
  try {
    const response = await db.query(
        SQL `INSERT INTO owned_book (book_id, user_id, \`condition\`) VALUES (${req.body.ownedBook.book_id}, ${req.body.ownedBook.user_id}, ${req.body.ownedBook.condition}) `
        )
    if (response.error) {
      return res.status(500).json(response.error)
    }
    // Get and send the book that was just created.
    const [ownedbook] = await db.query(SQL `SELECT * FROM owned_book WHERE owned_book_id = ${response.insertId}`)
    return res.status(201).json(ownedBook)
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
}

// Get an owned book by id.
exports.getBook = async function(req, res) {
  try {
       // Query should return an array with the user as the first and only
      // element. Destructure the array and store the element in 'book''.
    const [ownedBook] = await db.query(SQL `SELECT owned_book_id, book.book_id, title, author, genre, \`condition\`, description, year_published, publisher, image, owned_book.user_id FROM owned_book 
    JOIN book ON owned_book.book_id = book.book_id WHERE owned_book_id = ${req.params.ownedBookId}`)
    if (ownedBook.error) {
      return res.status(500).json(ownedBook.error)
    }
    if (!ownedBook) {
        return res.status(404).json({ error: 'No user with this book_id exists' })
      }
    // Add a user to the owned book.
    [ownedBook.owner] = await db.query(SQL `SELECT name, email, points, street, city, state, zip FROM owned_book 
    JOIN user ON owned_book.user_id = user.user_id WHERE owned_book.user_id = ${ownedBook.user_id}`)
    if (ownedBook.owner.error) {
        return res.status(500).json(ownedBook.owner.error)
    }
    return res.status(200).json(ownedBook)
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
}

// Edit an existing owned book.
exports.editBook = async function(req, res) {
  try {
    const [ownedBook] = await db.query(SQL `SELECT * FROM owned_book WHERE owned_book_id = ${req.params.ownedBookId}`)
    if (!ownedBook) {
      return res.status(404).json({
        error: 'No owned book with this ownedBookId exists'
      })
    }
    // Update the owned book with the values passed in the request if they exist.
    const response = await db.query(SQL `
      UPDATE owned_book
      SET book_id = ${req.body.ownedBook.book_id || ownedBook.book_id},
          user_id = ${req.body.ownedBook.user_id || ownedBook.user_id},
          \`condition\` = ${req.body.ownedBook.condition || ownedBook.condition}
      WHERE owned_book_id = ${req.params.ownedBookId}
    `)
    if (response.error) {
      return res.status(500).json(response.error)
    }
    // Send the updated book.
    const [updatedBook] = await db.query(
      SQL `SELECT * FROM owned_book WHERE owned_book_id = ${req.params.ownedBookId}`
    )
    return res.status(200).json(updatedBook)
  } catch (error) {}
}
