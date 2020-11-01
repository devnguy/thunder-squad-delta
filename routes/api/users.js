const router = require('express').Router()

// Temporary sample user until database it implemented.
const sampleUser = {
  name: 'Michael Scott',
  email: 'mscott@dm.com',
  points: 100,
  givenBooks: ['Threat Level Midnight', 'Somehow I manage'],
  requestedBooks: ['To Kill a Mockingbird', 'The Hobbit'],
  password: 'paper', // not in erd
}

// GET a user by id.
router.get('/user', (req, res) => {
  // sampleUser is a placeholder. user should be set to the return value of a
  // function that gets a user by id from the dataabse.
  const user = sampleUser
  if (!user) return res.sendStatus(404)
  return res.json(user)
})

router.patch('/users', (req, res) => {
  const { name, email, password } = req.body.user || sampleUser
  const newUser = {
    name,
    email,
    points: 100, // Assuming new users start with 100 points.
    givenBooks: [],
    requestedBooks: [],
    password, // Not in ERD
  }
  if (!newUser.name || !newUser.email || !newUser.password) {
    return res
      .status(400)
      .json({ error: 'The request object is missing at least one of the required attributes' })
  }
  // Call function to add user to database here.
  // Return the user data from database after addition.
  return res.json(newUser)
})

// Add user to database.
router.post('/users', (req, res) => {
  const { name, email, password } = req.body.user || sampleUser
  const newUser = {
    name,
    email,
    points: 100, // Assuming new users start with 100 points.
    givenBooks: [],
    requestedBooks: [],
    password, // Not in ERD
  }
  if (!newUser.name || !newUser.email || !newUser.password) {
    return res
      .status(400)
      .json({ error: 'The request object is missing at least one of the required attributes' })
  }
  // Call function to add user to database here.
  // Return the user data from database after addition.
  return res.json(newUser)
})

// Edit existing user.

module.exports = router
