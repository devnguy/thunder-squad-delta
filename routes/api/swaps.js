const router = require('express').Router()
const swapController = require('../../controllers/swapController')

// Get all swaps.
router.get('/', swapController.getSwaps)

// Get all swaps for a specific book.
router.get('/:bookId', swapController.getSwapsByBookId)

// TODO
// // Get a swap by id.
// router.get('/:swapId', userController.getSwap)

// // Edit an existing swap.
// router.patch('/:swapId', userController.editSwap)

// // Delete an existing swap.
router.delete('/:swapId', swapController.deleteSwap)

module.exports = router
