const SQL = require('sql-template-strings')
const db = require('../lib/db')

// Get all swaps from all users.
exports.getSwaps = async function (req, res) {
  try {
    const swaps = await db.query(SQL`
      SELECT swap_id, \`condition\`, \`status\`, cost, creation_date, owner.user_id as owner_id,
        owner.name as owner_name, receiver.user_id as receiver_id, receiver.name as receiver_name,
        book.book_id, book.title, book.author, book.genre, book.description, book.year_published,
        book.publisher
      FROM swap
      JOIN book ON swap.book_id = book.book_id
      JOIN user AS receiver ON swap.receiver_id = receiver.user_id
      JOIN user AS owner on swap.owner_id = owner.user_id;
    `)
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
        genre: swap.genere,
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
      JOIN user AS receiver ON swap.receiver_id = receiver.user_id
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
        genre: swap.genere,
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
      JOIN user AS receiver ON swap.receiver_id = receiver.user_id
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
        genre: swap.genere,
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

// TODO: Create a swap

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
