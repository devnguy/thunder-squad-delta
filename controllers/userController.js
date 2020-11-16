const SQL = require('sql-template-strings')
const bcrypt = require('bcrypt')
const db = require('../lib/db')

exports.getUsers = async function (req, res) {
  try {
    const users = await db.query(SQL`SELECT * FROM user`)
    if (users.error) {
      return res.status(500).json(users.error)
    }
    for (const user of users) {
      user.givenBooks = await db.query(SQL`SELECT title, author, genre, description, year_published, publisher, image
      FROM book
      INNER JOIN owned_book ON book.book_id = owned_book.book_id
      INNER JOIN swap ON owned_book.owned_book_id = swap.owned_book_id
      WHERE swap.receiver_id IS NOT NULL AND owned_book.user_id = ${user.user_id}`)
      if (user.givenBooks.error) {
        return res.status(500).json(user.givenBooks.error)
      }
      user.receivedBooks = await db.query(SQL`SELECT title, author, genre, description, year_published, publisher, image
        FROM book
        INNER JOIN owned_book ON book.book_id = owned_book.book_id
        INNER JOIN swap ON owned_book.owned_book_id = swap.owned_book_id
        WHERE swap.receiver_id = ${user.user_id}`)
      if (user.receivedBooks.error) {
        return res.status(500).json(user.recievedBooks.error)
      }
    }
    return res.status(200).json(users)
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
}

exports.getUser = async function (req, res) {
  try {
    // Query returns information about user, swaps, and wishlist
    // Response must be formatted to remove duplicate information
    const user = await db.query(SQL`
    SELECT b.book_id, b.title, b. author, b.genre, b.description, b.year_published, b.publisher, b.image,
    w.wish_id, w.status, w.user_id,
    s.swap_id, s.receiver_id, s.status, 
    u.user_id, u.name, u.email, u.points, u.street, u.city, u.state, u.zip, u.points_spent,
    (SELECT COUNT(swap.book_id) FROM swap
      WHERE owner_id = ${req.params.userId} AND swap.status = 'complete') AS given_books,
    (SELECT COUNT(swap.book_id) FROM swap
      WHERE receiver_id = ${req.params.userId} AND swap.status = 'complete') AS received_books
    FROM book AS b
    LEFT JOIN wishlist AS w ON w.book_id = b.book_id
    LEFT JOIN swap AS s ON s.book_id = b.book_id
    JOIN user AS u ON s.owner_id = u.user_id OR w.user_id = u.user_id
    WHERE w.user_id = ${req.params.userId} OR s.owner_id = ${req.params.userId} OR s.receiver_id = ${req.params.userId} OR u.user_id = ${req.params.userId};
    `)
    if (user.error) {
      return res.status(500).json(user.error)
    }
    if (!user) {
      return res.status(404).json({ error: 'No user with this user_id exists' })
    }
    let formattedUser = {
      userInfo: {},
      library: [],
      wishlist: []
    }
    // Format user if it has at least one element (search was successful)
    if (user.length > 0) {
      formattedUser.userInfo.pointsSpent = user[0].points_spent
      formattedUser.userInfo.pointsInWallet = user[0].points
      formattedUser.userInfo.booksGiven = user[0].given_books
      formattedUser.userInfo.booksReceived = user[0].received_books
      // Iterate through each book returned in the user query and add it to the library or wishlist
      user.forEach((book) => {
        if (book.wish_id != null) {
          formattedUser.wishlist.push(
            {
              book_id: book.book_id,
              title: book.title,
              author: book.author,
              genre: book.genre,
              description: book.description,
              year_published: book.year_published,
              publisher: book.publisher,
              image: book.image
            }
          )
        }
        else if (book.swap_id != null && book.receiver_id == null) {
          formattedUser.library.push(
            {
              book_id: book.book_id,
              title: book.title,
              author: book.author,
              genre: book.genre,
              description: book.description,
              year_published: book.year_published,
              publisher: book.publisher,
              image: book.image
            }
          )
        }
      })
    }
    return res.status(200).json(formattedUser)
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
}

exports.registerUser = async function (req, res) {
  // Confirm required fields were passed.
  if (!req.body.user.name || !req.body.user.email || !req.body.user.password) {
    return res.status(400).json({
      status: false,
      id: null,
      msg: 'The request object is missing at least one of the required attributes',
    })
  }
  // FIXME: Enforce unique username and email constraint
  // Salt and hash the password before storing in db.
  try {
    const hash = await bcrypt.hash(req.body.user.password, 10)
    const response = await db.query(SQL`
      INSERT INTO user (name, email, street, city, state, zip, password)
      VALUES (${req.body.user.name}, ${req.body.user.email}, ${req.body.user.street}, ${req.body.user.city}, ${req.body.user.state}, ${req.body.user.zip}, ${hash}) 
    `)
    if (response.error) {
      return res.status(500).json(response.error)
    }
    // Prepare and return user info.
    return res.status(201).json({
      status: true,
      id: response.insertId,
    })
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
}

exports.loginUser = async function (req, res) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      status: false,
      id: null,
      msg: 'The request object is missing at least one of the required attributes',
    })
  }
  try {
    const [user] = await db.query(SQL`
      SELECT * FROM user 
      WHERE email = ${req.body.email}
    `)
    // Confirm email was found.
    if (!user)
      return res
        .status(400)
        .json({ status: false, id: null, msg: 'No user with that email exists' })

    // Validate password.
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch) return res.status(401).json({ status: false, id: null, msg: 'Invalid password' })

    // Prepare and return user info.
    return res.status(200).json({
      status: true,
      id: user.user_id,
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

// Response may need to be updated to match other responses.
exports.editUser = async function (req, res) {
  try {
    const [user] = await db.query(SQL`SELECT * FROM user WHERE user_id = ${req.params.userId}`)
    if (!user) return res.status(404).json({ error: 'No user with this user_id exists' })
    // Update the user with the values passed in the request if they exist.
    // FIXME: Add error handling to prevent user's points from reaching < 0
    const response = await db.query(SQL`
      UPDATE user
      SET name = ${req.body.user.name || user.name},
          email = ${req.body.user.email || user.email},
          street = ${req.body.user.street || user.street},
          city = ${req.body.user.city || user.city},
          state = ${req.body.user.state || user.state},
          zip = ${req.body.user.zip || user.zip},
          points = ${req.body.user.points ? (user.points += req.body.user.points) : user.points}
      WHERE user_id = ${req.params.userId}
    `)
    if (response.error) {
      return res.status(500).json(response.error)
    }
    // Send the updated user.
    const [updatedUser] = await db.query(
      SQL`SELECT * FROM user WHERE user_id = ${req.params.userId}`
    )
    return res.status(200).json(updatedUser)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

exports.resetPassword = async function (req, res) {
  // Confirm required fields were passed.
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      status: false,
      msg: 'The request object is missing at least one of the required attributes',
    })
  }
  try {
    // Confirm email is valid.
    const [user] = await db.query(SQL`SELECT * FROM user WHERE email = ${req.body.email}`)
    if (!user) {
      return res.status(404).json({ status: false, msg: 'No user with that email exists' })
    }
    // user.user_id is an int, req.params.userId is a string.
    if (user.user_id != req.params.userId) {
      return res.status(404).json({ status: false, msg: 'No user with that user_id exists' })
    }

    // Hash and update the user's password only.
    const hash = await bcrypt.hash(req.body.password, 10)
    const response = await db.query(SQL`
      UPDATE user
      SET password = ${hash}
      WHERE user_id = ${req.params.userId}
    `)
    if (response.error) {
      return res.status(500).json(response.error)
    }
    // Send the success status.
    return res.status(200).json({ status: true })
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}
