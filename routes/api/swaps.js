const router = require('express').Router()
const userController = require('../../controllers/swapController')

// Get all swaps.
router.get('/', userController.getSwaps)

// May need to move this to user route.
// Get all swaps owned by a user.
// router.get('/users', userController.getUserSwaps)

// May need to move this to user route
// Create a new swap.
// router.post('/', userController.createSwap)

// // Get a swap by id.
// router.get('/:swapId', userController.getSwap)

// // Edit an existing swap.
// router.patch('/:swapId', userController.editSwap)

// // Delete an existing swap.
// router.patch('/:swapId', userController.deleteSwap)

module.exports = router
