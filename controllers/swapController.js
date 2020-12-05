const SQL = require('sql-template-strings')
const db = require('../lib/db')

const formatSwaps = require('./util/formatSwaps')
const {
  MissingAttributeError,
  UserNotFoundError,
  SwapNotFoundError,
  DatabaseError,
  SwapInProgressError,
  BookNotFoundError,
} = require('../errors')


exports.getAllSwaps = async function (req, res, next) {
  try {
    const swaps = await db.query(SQL
      `SELECT swap_id, \`condition\`, \`status\`, cost, creation_date, date_requested, 
      owner.user_id as owner_id, owner.name as owner_name,
      owner.street as owner_street, owner.city as owner_city, owner.state as owner_state, owner.zip as
      owner_zip, receiver_id,
      book.book_id, book.title, book.author, book.genre, book.description, book.year_published, book.publisher, book.image
      FROM swap
      JOIN book ON swap.book_id = book.book_id
      JOIN user AS owner on swap.owner_id = owner.user_id
      WHERE receiver_id IS NULL
      ORDER BY swap_id DESC;
      `)

    if (swaps.error) throw new DatabaseError(swaps.error)

    return res.status(200).json(formatSwaps(swaps))
  } catch (error) {
    return next(error)
  }
}
// Search for swaps either by query and searchby, or bookid.
exports.getSwaps = async function (req, res, next) {
  try {
    if ((!req.query.q || !req.query.searchby) && !req.query.bookid) {
      throw new MissingAttributeError('Query and searchby, or bookid required')
    }
    if (req.query.q && req.query.searchby) {
      return res
        .status(200)
        .json(formatSwaps(await searchSwapsByTerm(req.query.q, req.query.searchby)))
    }
    if (req.query.bookid) {
      return res.status(200).json(formatSwaps(await searchSwapsByBookId(req.query.bookid)))
    }
  } catch (error) {
    return next(error)
  }
}

/**
 * Queries the database and returns swaps based on search parameters.
 * @param {string} q : Query string
 * @param {string} searchby : One of: 'title', 'author', 'genre', 'user'
 */
async function searchSwapsByTerm(q, searchby) {
  const searchTerm = `%${q}%`
  try {
    let swaps = undefined
    // Query a different column based on searchby value.
    switch (searchby.toLowerCase()) {
      case 'title':
        swaps = await db.query(SQL`
          SELECT swap_id, \`condition\`, \`status\`, cost, creation_date, date_requested, 
            owner.user_id as owner_id, owner.name as owner_name, receiver.user_id as receiver_id,
            receiver.name as receiver_name, book.book_id, book.title, book.author, book.genre,
            book.description, book.year_published, book.publisher, book.image, owner.street as
            owner_street, owner.city as owner_city, owner.state as owner_state, owner.zip as
            owner_zip, receiver.street as receiver_street, receiver.city as receiver_city, 
            receiver.state as receiver_state, receiver.zip as receiver_zip
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
          SELECT swap_id, \`condition\`, \`status\`, cost, creation_date, date_requested, 
            owner.user_id as owner_id, owner.name as owner_name, receiver.user_id as receiver_id,
            receiver.name as receiver_name, book.book_id, book.title, book.author, book.genre,
            book.description, book.year_published, book.publisher, book.image, owner.street as
            owner_street, owner.city as owner_city, owner.state as owner_state, owner.zip as
            owner_zip, receiver.street as receiver_street, receiver.city as receiver_city, 
            receiver.state as receiver_state, receiver.zip as receiver_zip
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
          SELECT swap_id, \`condition\`, \`status\`, cost, creation_date, date_requested, 
            owner.user_id as owner_id, owner.name as owner_name, receiver.user_id as receiver_id,
            receiver.name as receiver_name, book.book_id, book.title, book.author, book.genre,
            book.description, book.year_published, book.publisher, book.image, owner.street as
            owner_street, owner.city as owner_city, owner.state as owner_state, owner.zip as
            owner_zip, receiver.street as receiver_street, receiver.city as receiver_city, 
            receiver.state as receiver_state, receiver.zip as receiver_zip
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
          SELECT swap_id, \`condition\`, \`status\`, cost, creation_date, date_requested, 
            owner.user_id as owner_id, owner.name as owner_name, receiver.user_id as receiver_id,
            receiver.name as receiver_name, book.book_id, book.title, book.author, book.genre,
            book.description, book.year_published, book.publisher, book.image, owner.street as
            owner_street, owner.city as owner_city, owner.state as owner_state, owner.zip as
            owner_zip, receiver.street as receiver_street, receiver.city as receiver_city, 
            receiver.state as receiver_state, receiver.zip as receiver_zip
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

    return swaps
  } catch (error) {
    throw error
  }
}

/**
 * Queries the database and returns all swaps matching the given bookId.
 * @param {int} bookId : Id of the book
 */
async function searchSwapsByBookId(bookId) {
  try {
    // Confirm book exists.
    const book = await db.query(SQL`SELECT * from book WHERE book_id = ${bookId}`)
    if (!book.length) throw new BookNotFoundError()

    const swaps = await db.query(SQL`
      SELECT swap_id, \`condition\`, \`status\`, cost, creation_date, date_requested, 
        owner.user_id as owner_id, owner.name as owner_name, receiver.user_id as receiver_id,
        receiver.name as receiver_name, book.book_id, book.title, book.author, book.genre,
        book.description, book.year_published, book.publisher, book.image, owner.street as
        owner_street, owner.city as owner_city, owner.state as owner_state, owner.zip as
        owner_zip, receiver.street as receiver_street, receiver.city as receiver_city, 
        receiver.state as receiver_state, receiver.zip as receiver_zip
      FROM swap
      JOIN book ON swap.book_id = book.book_id
      LEFT JOIN user AS receiver ON swap.receiver_id = receiver.user_id
      JOIN user AS owner on swap.owner_id = owner.user_id
      WHERE book.book_id = ${bookId};
    `)
    if (swaps.error) throw new DatabaseError(swaps.error)
    return swaps
  } catch (error) {
    throw error
  }
}

// Get all swaps owned/requested by one user.
exports.getSwapsByUserId = async function (req, res, next) {
  try {
    // Confirm user exists.
    const user = await db.query(SQL`SELECT * from user WHERE user_id = ${req.params.userId}`)
    if (!user.length) throw new UserNotFoundError()

    const swaps = await db.query(SQL`
      SELECT swap_id, \`condition\`, \`status\`, cost, creation_date, date_requested, 
        owner.user_id as owner_id, owner.name as owner_name, receiver.user_id as receiver_id,
        receiver.name as receiver_name, book.book_id, book.title, book.author, book.genre,
        book.description, book.year_published, book.publisher, book.image, owner.street as
        owner_street, owner.city as owner_city, owner.state as owner_state, owner.zip as
        owner_zip, receiver.street as receiver_street, receiver.city as receiver_city, 
        receiver.state as receiver_state, receiver.zip as receiver_zip
      FROM swap
      JOIN book ON swap.book_id = book.book_id
      LEFT JOIN user AS receiver ON swap.receiver_id = receiver.user_id
      JOIN user AS owner on swap.owner_id = owner.user_id
      WHERE owner.user_id = ${req.params.userId}
      OR receiver.user_id = ${req.params.userId};
    `)
    if (swaps.error) throw new DatabaseError(swaps.error)

    return res.status(200).json({
      owned: formatSwaps(swaps.filter((swap) => swap.owner_id == req.params.userId)),
      requested: formatSwaps(swaps.filter((swap) => swap.receiver_id == req.params.userId)),
    })
  } catch (error) {
    return next(error)
  }
}

// Get one swap by its id.
exports.getSwapById = async function (req, res, next) {
  try {
    const swap = await db.query(SQL`
      SELECT swap_id, \`condition\`, \`status\`, cost, creation_date, date_requested, 
        owner.user_id as owner_id, owner.name as owner_name, receiver.user_id as receiver_id,
        receiver.name as receiver_name, book.book_id, book.title, book.author, book.genre,
        book.description, book.year_published, book.publisher, book.image, owner.street as
        owner_street, owner.city as owner_city, owner.state as owner_state, owner.zip as
        owner_zip, receiver.street as receiver_street, receiver.city as receiver_city, 
        receiver.state as receiver_state, receiver.zip as receiver_zip
      FROM swap
      JOIN book ON swap.book_id = book.book_id
      LEFT JOIN user AS receiver ON swap.receiver_id = receiver.user_id
      JOIN user AS owner on swap.owner_id = owner.user_id
      WHERE swap_id = ${req.params.swapId}
    `)
    if (swap.error) throw new DatabaseError(swap.error)

    return res.status(200).json(formatSwaps(swap)[0])
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
      INSERT INTO swap (owner_id, book_id, \`condition\`, cost, status)
      VALUES (${req.params.userId}, ${req.body.bookId}, ${req.body.condition}, ${req.body.cost}, \'available\')
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

// Update a swap's status and/or receiver.
exports.updateSwap = async function (req, res, next) {
  try {
    if (
      req.body.status !== 'available' &&
      req.body.status !== 'requested' &&
      req.body.status !== 'shipping' &&
      req.body.status !== 'completed' &&
      req.body.status !== 'accepted'
    ) {
      throw new MissingAttributeError('Invalid status value')
    }
    let updateResponse = undefined
    const [swap] = await db.query(SQL`SELECT * FROM swap WHERE swap_id = ${req.params.swapId}`)
    if (!swap) {
      throw new SwapNotFoundError()
    }
    // Don't update the swap if it's already completed.
    if (swap.status === 'completed') {
      throw new SwapInProgressError('Swap already completed')
    }
    switch (req.body.status.toLowerCase()) {
      case 'available':
        updateResponse = await db.query(SQL`
          UPDATE swap
          SET status = ${req.body.status},
              receiver_id = null,
              date_requested = null
          WHERE swap_id = ${req.params.swapId}
        `)
        break
      case 'requested':
        updateResponse = await db.query(SQL`
          UPDATE swap
          SET status = ${req.body.status},
              receiver_id = ${req.body.receiverId},
              date_requested = CURRENT_TIMESTAMP
          WHERE swap_id = ${req.params.swapId}
        `)
        break
      default:
        updateResponse = await db.query(SQL`
          UPDATE swap
          SET status = ${req.body.status}
          WHERE swap_id = ${req.params.swapId}
        `)
        break
    }
    if (updateResponse.error) throw new DatabaseError(updateResponse.error)
    return res.status(200).json({ status: true, msg: updateResponse.message })
  } catch (error) {
    return next(error)
  }
}

// Delete a swap
exports.deleteSwap = async function (req, res, next) {
  try {
    // Check if the swap exists before deleting
    const swap = await db.query(SQL`SELECT * FROM swap WHERE swap_id = ${req.params.swapId}`)
    if (swap.error) throw new DatabaseError(swap.error)
    if (!swap.length) throw new SwapNotFoundError()
    // if the swap with the given ID is valid AND
    // status != complete or status != in progress, delete it
    if (swap[0].status == 'available' || swap[0].status == 'requested') {
      const result = await db.query(SQL`DELETE FROM swap WHERE swap_id = ${req.params.swapId}`)
      if (result.error) throw new DatabaseError(result.error)
      return res.status(200).json({
        status: true,
        message: 'Swap successfully deleted!',
      })
    } else {
      throw new SwapInProgressError()
    }
  } catch (error) {
    return next(error)
  }
}
