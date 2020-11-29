const SQL = require('sql-template-strings')
const bcrypt = require('bcrypt')
const db = require('../lib/db')

const formatBooks = require('./util/formatUserProfile')
const {
  MissingAttributeError,
  UserNotFoundError,
  DatabaseError,
  InvalidPasswordError,
  InvalidEmailError,
} = require('../errors')

exports.getUsers = async function (req, res, next) {
  try {
    const users = await db.query(SQL`
      SELECT user_id, name, email, points, points_spent, street, city, state, zip FROM user
    `)
    if (users.error) throw new DatabaseError(users.error)
    return res.status(200).json(users)
  } catch (error) {
    return next(error)
  }
}

exports.getUser = async function (req, res, next) {
  try {
    // Query should return an array with the user as the first and only
    // element. Destructure the array and store the element in 'user'.
    const [user] = await db.query(SQL`
      SELECT user_id, name, email, points, points_spent, street, city, state, zip 
      FROM user 
      WHERE user_id = ${req.params.userId}
    `)
    if (user.error) throw new DatabaseError(user.error)
    if (!user.length) throw new UserNotFoundError()

    return res.status(200).json(user)
  } catch (error) {
    return next(error)
  }
}

exports.getUserProfile = async function (req, res, next) {
  try {
    // Query returns information about user, swaps, and wishlist
    // Response must be formatted to remove duplicate information
    const user = await db.query(SQL`
    SELECT b.book_id, b.title, b.author, b.genre, b.description, b.year_published, b.publisher, b.image,
    w.wish_id, w.status, w.user_id,
    s.swap_id, s.owner_id, s.receiver_id, s.cost, s.creation_date, s.condition, s.status, 
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
    if (user.error) throw new DatabaseError(user.error)
    if (!user.length) throw new UserNotFoundError()
    const formattedUser = {
      userInfo: {
        username: user[0].name,
        email: user[0].email,
        pointsSpent: user[0].points_spent,
        pointsInWallet: user[0].points,
        booksGiven: user[0].given_books,
        booksReceived: user[0].received_books,
      },
      library: formatBooks.formatLibrary(user),
      swaps: formatBooks.formatLibrarySwaps(user, req.params.userId),
      wishlist: formatBooks.formatWishlist(user),
    }
    return res.status(200).json(formattedUser)
  } catch (error) {
    return next(error)
  }
}

exports.registerUser = async function (req, res, next) {
  try {
    // Confirm required fields were passed.
    if (!req.body.user || !req.body.user.name || !req.body.user.email || !req.body.user.password) {
      throw new MissingAttributeError()
    }
    // FIXME: Enforce unique username and email constraint
    // Salt and hash the password before storing in db.
    const hash = await bcrypt.hash(req.body.user.password, 10)
    const response = await db.query(SQL`
      INSERT INTO user (name, email, password, street, city, state, zip)
      VALUES (${req.body.user.name}, ${req.body.user.email}, ${hash}, ${req.body.user.street}, 
        ${req.body.user.city}, ${req.body.user.state}, ${req.body.user.zip})
    `)
    if (response.error) throw new DatabaseError(response.error)

    return res.status(201).json({
      status: true,
      id: response.insertId,
    })
  } catch (error) {
    return next(error)
  }
}

exports.loginUser = async function (req, res, next) {
  try {
    if (!req.body.email || !req.body.password) throw new MissingAttributeError()

    const [user] = await db.query(SQL`
      SELECT * FROM user 
      WHERE email = ${req.body.email}
    `)
    // Confirm email was found.
    if (!user) throw new InvalidEmailError()

    // Validate password.
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch) throw new InvalidPasswordError()

    // Prepare and return user info.
    return res.status(200).json({
      status: true,
      id: user.user_id,
    })
  } catch (error) {
    return next(error)
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

exports.resetPassword = async function (req, res, next) {
  try {
    // Confirm required fields were passed.
    if (!req.body.email || !req.body.password) throw new MissingAttributeError()

    // Confirm email is valid.
    const [user] = await db.query(SQL`SELECT * FROM user WHERE email = ${req.body.email}`)
    if (!user) throw new InvalidEmailError()

    // user.user_id is an int, req.params.userId is a string.
    if (user.user_id != req.params.userId) throw new UserNotFoundError()

    // Hash and update the user's password only.
    const hash = await bcrypt.hash(req.body.password, 10)
    const response = await db.query(SQL`
      UPDATE user
      SET password = ${hash}
      WHERE user_id = ${req.params.userId}
    `)
    if (response.error) throw new DatabaseError(response.error)

    // Send the success status.
    return res.status(200).json({ status: true })
  } catch (error) {
    return next(error)
  }
}

// Delete a user
exports.deleteUser = async function (req, res, next) {
  try {
    // Check if the User exists before deleting
    const user = await db.query(SQL`SELECT * FROM user WHERE user_id = ${req.params.userId}`)
    if (user.error) throw new DatabaseError(user.error)
    if (!user.length) throw new UserNotFoundError()
    // If the User with that id exists, delete it and return a message
    const result = await db.query(SQL`DELETE FROM user WHERE user_id = ${req.params.userId}`)
    if (result.error) throw new DatabaseError(result.error)
    return res.status(200).json({
      status: true,
      message: 'User successfully deleted!',
    })
  } catch (error) {
    return next(error)
  }
}
