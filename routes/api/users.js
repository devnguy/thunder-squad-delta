const router = require('express').Router()
const userController = require('../../controllers/userController')
const bookController = require('../../controllers/bookController')
const swapController = require('../../controllers/swapController')

// Get all users.
router.get('/', userController.getUsers)

// Create a new user.
router.post('/', userController.registerUser)

// Get a user by id.
router.get('/:userId', userController.getUser)

// Get user profile page information by id.
router.get('/:userId/profile', userController.getUserProfile)

// Edit an existing user.
router.patch('/:userId', userController.editUser)

// Edit an existing user's password.
router.post('/:userId/reset', userController.resetPassword)

// User log in
router.post('/login', userController.loginUser)

// Get swaps owned/requested by one user.
router.get('/:userId/swaps', swapController.getSwapsByUserId)

// Create a swap for user.
router.post('/:userId/swaps', bookController.postBook, swapController.createSwap)

// Complete a swap for a swap owner.
router.patch('/:userId/swaps/:swapId', swapController.completeSwap)

// Delete an existing User
router.delete('/:userId', userController.deleteUser)

// TODO: PUT /:userId/swaps/:swapId add a receiver for a swap
// TODO: DELETE /:userId/swaps/:swapId remove a receiver of a swap
// TODO: GET /:userId/swaps/pending get all swaps where the user is the recipient

module.exports = router
