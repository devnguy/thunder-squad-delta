const SQL = require('sql-template-strings')
const db = require('../lib/db')

// Search for swaps.
// There is some nastiness below. I would parameterize the table that's being
// searched, but sql tables cannot be parameterized inside a query. All of the
// queries in this function are the same except for the WHERE clause. Added to
// the code debt and created a switch based on 'searchby'. A better solution
// would be nice. Sombody smell this.
exports.getSwaps = async function (req, res) {
  if (!req.query.q || !req.query.searchby) {
    return res.status(400).json({ error: 'query required' })
  }
  const searchTerm = `%${req.query.q}%`
  try {
    let swaps = undefined
    //
    switch (req.query.searchby.toLowerCase()) {
      case 'title':
        swaps = await db.query(SQL`
          SELECT swap_id, \`condition\`, \`status\`, cost, creation_date, owner.user_id as
          owner_id, owner.name as owner_name, receiver.user_id as receiver_id, receiver.name 
          as receiver_name, book.book_id, book.title, book.author, book.genre, book.description,
          book.year_published, book.publisher
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
          book.year_published, book.publisher
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
          book.year_published, book.publisher
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
          book.year_published, book.publisher
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
    if (swaps.error) {
      return res.status(500).json(swaps.error)
    }
    const formattedSwaps = swaps.map((swap) => ({
      id: swap.swap_id,
      condition: swap.condition,
      status: swap.status,
      cost: swap.cost,
      creation_date: swap.creation_date,
      owner: {
        id: swap.owner_id,
        name: swap.owner_name,
      },
      receiver: swap.receiver_id ? { id: swap.receiver_id, name: swap.receiver_name } : null,
      book: {
        id: swap.book_id,
        title: swap.title,
        author: swap.author,
        genre: swap.genre,
        description: swap.description,
        year_published: swap.year_published,
        publisher: swap.publisher,
      },
    }))
    return res.status(200).json(formattedSwaps)
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
}

// Get all swaps owned by one user.
exports.getSwapsByUserId = async function (req, res) {
  try {
    const swaps = await db.query(SQL`
      SELECT swap_id, \`condition\`, \`status\`, cost, creation_date, owner.user_id as owner_id,
        owner.name as owner_name, receiver.user_id as receiver_id, receiver.name as receiver_name,
        book.book_id, book.title, book.author, book.genre, book.description, book.year_published,
        book.publisher
      FROM swap
      JOIN book ON swap.book_id = book.book_id
      LEFT JOIN user AS receiver ON swap.receiver_id = receiver.user_id
      JOIN user AS owner on swap.owner_id = owner.user_id
      WHERE owner.user_id = ${req.params.userId};
    `)
    if (!swaps) return res.status(404).json({ error: 'No user with this user_id exists' })
    if (swaps.error) return res.status(500).json(swaps.error)

    const formattedSwaps = swaps.map((swap) => ({
      id: swap.swap_id,
      condition: swap.condition,
      status: swap.status,
      cost: swap.cost,
      creation_date: swap.creation_date,
      owner: {
        id: swap.owner_id,
        name: swap.owner_name,
      },
      receiver: swap.receiver_id ? { id: swap.receiver_id, name: swap.receiver_name } : null,
      book: {
        id: swap.book_id,
        title: swap.title,
        author: swap.author,
        genre: swap.genre,
        description: swap.description,
        year_published: swap.year_published,
        publisher: swap.publisher,
      },
    }))
    return res.status(200).json(formattedSwaps)
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
}

// Get all swaps for a specific book.
exports.getSwapsByBookId = async function (req, res) {
  try {
    const swaps = await db.query(SQL`
      SELECT swap_id, \`condition\`, \`status\`, cost, creation_date, owner.user_id as owner_id,
        owner.name as owner_name, receiver.user_id as receiver_id, receiver.name as receiver_name,
        book.book_id, book.title, book.author, book.genre, book.description, book.year_published,
        book.publisher
      FROM swap
      JOIN book ON swap.book_id = book.book_id
      LEFT JOIN user AS receiver ON swap.receiver_id = receiver.user_id
      JOIN user AS owner on swap.owner_id = owner.user_id
      WHERE book.book_id = ${req.params.bookId};
    `)
    if (!swaps) return res.status(404).json({ error: 'No book with this book_id exists' })
    if (swaps.error) return res.status(500).json(swaps.error)

    const formattedSwaps = swaps.map((swap) => ({
      id: swap.swap_id,
      condition: swap.condition,
      status: swap.status,
      cost: swap.cost,
      creation_date: swap.creation_date,
      owner: {
        id: swap.owner_id,
        name: swap.owner_name,
      },
      receiver: swap.receiver_id ? { id: swap.receiver_id, name: swap.receiver_name } : null,
      book: {
        id: swap.book_id,
        title: swap.title,
        author: swap.author,
        genre: swap.genre,
        description: swap.description,
        year_published: swap.year_published,
        publisher: swap.publisher,
      },
    }))
    return res.status(200).json(formattedSwaps)
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
}

// Create a swap.
exports.createSwap = async function (req, res) {
  // Confirm required fields were passed.
  if (!req.body.bookId || !req.body.condition || !req.body.cost) {
    return res.status(400).json({
      status: false,
      id: null,
      msg: 'The request is object missing at least one of the required attributes',
    })
  }
  try {
    // Confirm user exists.
    const checkUser = await db.query(SQL`SELECT * from user WHERE user_id = ${req.params.userId}`)
    if (!checkUser.length) {
      return res.status(400).json({ error: 'No user with that user_id exists' })
    }
    const response = await db.query(SQL`
      INSERT INTO swap (owner_id, book_id, \`condition\`, cost)
      VALUES ($${req.body.bookId}, ${req.body.condition}, ${req.body.cost}) 
    `)
    if (response.error) return res.status(500).json(response.error)
    // Prepare and return swap info.
    return res.status(201).json({
      status: true,
      id: response.insertId,
    })
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
}

// Complete a swap by setting 'completed' property to true.
exports.completeSwap = async function (req, res) {
  try {
    const [swap] = await db.query(SQL`SELECT * FROM swap WHERE swap_id = ${req.params.swapId}`)
    if (!swap) return res.status(404).json({ error: 'no swap with this swap_id exists' })
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
