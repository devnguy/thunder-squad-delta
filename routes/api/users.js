const router = require('express').Router()
const userController = require('../../controllers/userController')

// Get all users.
router.get('/users', userController.getUsers)

// Create a new user.
router.post('/users', userController.registerUser)

// Get a user by id.
router.get('/users/:userId', userController.getUser)

// Edit an existing user.
router.patch('/users/:userId', userController.editUser)

// User log in
router.post('/users/login', userController.loginUser)

module.exports = router
