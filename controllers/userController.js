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
      user.givenBooks = await db.query(SQL `SELECT title, author, genre, description, year_published, publisher, image
      FROM book
      INNER JOIN owned_book ON book.book_id = owned_book.book_id
      INNER JOIN swap ON owned_book.owned_book_id = swap.owned_book_id
      WHERE swap.receiver_id IS NOT NULL AND owned_book.user_id = ${user.user_id}`)
      if (user.givenBooks.error) {
        return res.status(500).json(user.givenBooks.error)
      }
      user.receivedBooks = await db.query(SQL `SELECT title, author, genre, description, year_published, publisher, image
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
    // Query should return an array with the user as the first and only
    // element. Destructure the array and store the element in 'user'.
    const [user] = await db.query(SQL`SELECT * FROM user WHERE user_id = ${req.params.userId}`)
    if (user.error) {
      return res.status(500).json(user.error)
    }
    if (!user) {
      return res.status(404).json({ error: 'No user with this user_id exists' })
    }
    user.givenBooks = await db.query(SQL `SELECT title, author, genre, description, year_published, publisher, image
      FROM book
      INNER JOIN owned_book ON book.book_id = owned_book.book_id
      INNER JOIN swap ON owned_book.owned_book_id = swap.owned_book_id
      WHERE swap.receiver_id IS NOT NULL AND owned_book.user_id = ${req.params.userId}`)
    if (user.givenBooks.error) {
      return res.status(500).json(user.givenBooks.error)
    }
    user.receivedBooks = await db.query(SQL `SELECT title, author, genre, description, year_published, publisher, image
        FROM book
        INNER JOIN owned_book ON book.book_id = owned_book.book_id
        INNER JOIN swap ON owned_book.owned_book_id = swap.owned_book_id
        WHERE swap.receiver_id = ${req.params.userId}`)
    if (user.receivedBooks.error) {
      return res.status(500).json(user.recievedBooks.error)
    }
    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
}

exports.registerUser = async function (req, res) {
  // Confirm required fields were passed.
  if (!req.body.user.name || !req.body.user.email || !req.body.user.password) {
    return res
      .status(400)
      .json({ error: 'The request object is missing at least one of the required attributes' })
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
    // Get the user that was just created.
    const [user] = await db.query(SQL`SELECT * FROM user WHERE user_id = ${response.insertId}`)
    // Prepare and return user info.
    return res.status(201).json({
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        points: user.points,
      },
    })
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
}

exports.loginUser = async function (req, res) {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ error: 'The request object is missing at least one of the required attributes' })
  }
  try {
    const [user] = await db.query(SQL`
      SELECT * FROM user 
      WHERE email = ${req.body.email}
    `)
    // Confirm email was found.
    if (!user) return res.status(400).json({ error: 'No user with that email exists' })

    // Validate password.
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' })

    // Prepare and return user info.
    return res.status(201).json({
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        points: user.points,
      },
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

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