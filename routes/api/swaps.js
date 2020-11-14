const router = require('express').Router()
const userController = require('../../controllers/swapController')

// Get all swaps.
router.get('/', userController.getSwaps)

// TODO
// // Get a swap by id.
// router.get('/:swapId', userController.getSwap)

// // Edit an existing swap.
// router.patch('/:swapId', userController.editSwap)

// // Delete an existing swap.
// router.patch('/:swapId', userController.deleteSwap)

module.exports = router
