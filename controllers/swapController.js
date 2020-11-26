const SQL = require('sql-template-strings')
const db = require('../lib/db')

const formatSwaps = require('./util/formatSwaps')
const { MissingAttributeError, UserNotFoundError, SwapNotFoundError, DatabaseError } = require('../errors')

// Search for swaps.
// There is some nastiness below. I would parameterize the table that's being
// searched, but sql tables cannot be parameterized inside a query. All of the
// queries in this function are the same except for the WHERE clause. Added to
// the code debt and created a switch based on 'searchby'. A better solution
// would be nice. Sombody smell this.
exports.getSwaps = async function (req, res, next) {
  const searchTerm = `%${req.query.q}%`
  try {
    if (!req.query.q || !req.query.searchby) {
      throw new MissingAttributeError('Query/searchby required')
    }

    let swaps = undefined
    // Query a different column based on searchby value.
    switch (req.query.searchby.toLowerCase()) {
      case 'title':
        swaps = await db.query(SQL`
          SELECT swap_id, \`condition\`, \`status\`, cost, creation_date, owner.user_id as
          owner_id, owner.name as owner_name, receiver.user_id as receiver_id, receiver.name 
          as receiver_name, book.book_id, book.title, book.author, book.genre, book.description,
          book.year_published, book.publisher, book.image
          FROM swap
          JOIN book ON swap.book_id = book.book_id
          LEFT JOIN user AS receiver ON swap.receiver_id = receiver.user_id
          JOIN user AS owner on swap.owner_id = owner.user_id
          WHERE book.title
          LIKE ${searchTerm};
        `)
        break
      case 'author':
        swaps = await db.query(SQL`
          SELECT swap_id, \`condition\`, \`status\`, cost, creation_date, owner.user_id as
          owner_id, owner.name as owner_name, receiver.user_id as receiver_id, receiver.name 
          as receiver_name, book.book_id, book.title, book.author, book.genre, book.description,
          book.year_published, book.publisher, book.image
          FROM swap
          JOIN book ON swap.book_id = book.book_id
          LEFT JOIN user AS receiver ON swap.receiver_id = receiver.user_id
          JOIN user AS owner on swap.owner_id = owner.user_id
          WHERE book.author
          LIKE ${searchTerm};
        `)
        break
      case 'genre':
        swaps = await db.query(SQL`
          SELECT swap_id, \`condition\`, \`status\`, cost, creation_date, owner.user_id as
          owner_id, owner.name as owner_name, receiver.user_id as receiver_id, receiver.name 
          as receiver_name, book.book_id, book.title, book.author, book.genre, book.description,
          book.year_published, book.publisher, book.image
          FROM swap
          JOIN book ON swap.book_id = book.book_id
          LEFT JOIN user AS receiver ON swap.receiver_id = receiver.user_id
          JOIN user AS owner on swap.owner_id = owner.user_id
          WHERE book.genre
          LIKE ${searchTerm};
        `)
        break
      case 'user':
        swaps = await db.query(SQL`
          SELECT swap_id, \`condition\`, \`status\`, cost, creation_date, owner.user_id as
          owner_id, owner.name as owner_name, receiver.user_id as receiver_id, receiver.name 
          as receiver_name, book.book_id, book.title, book.author, book.genre, book.description,
          book.year_published, book.publisher, book.image
          FROM swap
          JOIN book ON swap.book_id = book.book_id
          LEFT JOIN user AS receiver ON swap.receiver_id = receiver.user_id
          JOIN user AS owner on swap.owner_id = owner.user_id
          WHERE owner.name
          LIKE ${searchTerm};
        `)
        break
      default:
        break
    }
    if (swaps === undefined) throw new MissingAttributeError('Invalid searchby value')
    if (swaps.error) throw new DatabaseError(swaps.error)

    return res.status(200).json(formatSwaps(swaps))
  } catch (error) {
    return next(error)
  }
}

// Get all swaps owned by one user.
exports.getSwapsByUserId = async function (req, res, next) {
  try {
    // Confirm user exists.
    const user = await db.query(SQL`SELECT * from user WHERE user_id = ${req.params.userId}`)
    if (!user.length) throw new UserNotFoundError()

    const swaps = await db.query(SQL`
      SELECT swap_id, \`condition\`, \`status\`, cost, creation_date, owner.user_id as owner_id,
        owner.name as owner_name, receiver.user_id as receiver_id, receiver.name as receiver_name,
        book.book_id, book.title, book.author, book.genre, book.description, book.year_published,
        book.publisher, book.image
      FROM swap
      JOIN book ON swap.book_id = book.book_id
      LEFT JOIN user AS receiver ON swap.receiver_id = receiver.user_id
      JOIN user AS owner on swap.owner_id = owner.user_id
      WHERE owner.user_id = ${req.params.userId};
    `)
    if (swaps.error) throw new DatabaseError(swaps.error)

    return res.status(200).json(formatSwaps(swaps))
  } catch (error) {
    return next(error)
  }
}

// Get all swaps for a specific book.
exports.getSwapsByBookId = async function (req, res, next) {
  try {
    const swaps = await db.query(SQL`
      SELECT swap_id, \`condition\`, \`status\`, cost, creation_date, owner.user_id as owner_id,
        owner.name as owner_name, receiver.user_id as receiver_id, receiver.name as receiver_name,
        book.book_id, book.title, book.author, book.genre, book.description, book.year_published,
        book.publisher, book.image
      FROM swap
      JOIN book ON swap.book_id = book.book_id
      LEFT JOIN user AS receiver ON swap.receiver_id = receiver.user_id
      JOIN user AS owner on swap.owner_id = owner.user_id
      WHERE book.book_id = ${req.params.bookId};
    `)
    if (swaps.error) throw new DatabaseError(swaps.error)

    return res.status(200).json(formatSwaps(swaps))
  } catch (error) {
    return next(error)
  }
}

// Create a swap.
exports.createSwap = async function (req, res, next) {
  try {
    // Confirm user exists.
    const checkUser = await db.query(SQL`SELECT * from user WHERE user_id = ${req.params.userId}`)
    if (!checkUser.length) throw new UserNotFoundError()

    // Confirm required fields were passed.
    if (!req.body.bookId || !req.body.condition || !req.body.cost) {
      throw new MissingAttributeError()
    }

    const response = await db.query(SQL`
      INSERT INTO swap (owner_id, book_id, \`condition\`, cost) 
      VALUES (${req.params.userId}, ${req.body.bookId}, ${req.body.condition}, ${req.body.cost}) 
    `)
    if (response.error) throw new DatabaseError(response.error)

    // Prepare and return swap info.
    return res.status(201).json({
      status: true,
      id: response.insertId,
    })
  } catch (error) {
    return next(error)
  }
}

// Complete a swap by setting 'completed' property to true.
// This needs to be updated with new 'status' column.
exports.completeSwap = async function (req, res) {
  try {
    const [swap] = await db.query(SQL`SELECT * FROM swap WHERE swap_id = ${req.params.swapId}`)
    if (!swap) {
      return res.status(404).json({ status: false, msg: 'No swap with that swap_id exists' })
    }
    // Don't update the swap if it's already completed.
    if (swap.completed) {
      return res.status(400).json({ error: 'This swap has already been completed' })
    }
    const response = await db.query(SQL`
      UPDATE swap
      SET completed = true
      WHERE swap_id = ${req.params.swapId}
    `)
    if (response.error) {
      return res.status(500).json(response.error)
    }
    return res.status(200).json({ success: `Swap with swap_id ${req.params.swapId} completed` })
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

// Delete a swap
exports.deleteSwap = async function (req, res, next) {
  try {
    // Check if the swap exists before deleting
    const swap = await db.query(SQL`SELECT * FROM swap WHERE swap_id = ${req.params.swapId}`)
    if (swap.error) throw new DatabaseError(swap.error)
    if (!swap.length) throw new SwapNotFoundError()
    // If the swap with that id exists, delete it and return a message. 
    const result = await db.query(SQL`DELETE FROM swap WHERE swap_id = ${req.params.swapId}`)
    if (result.error) throw new DatabaseError(result.error)
    return res.status(200).json({
      status: true,
      message: "Swap successfully deleted!"
    })
  } catch (error) {
    return next(error)
  }
}