const router = require('express').Router()
const swapController = require('../../controllers/swapController')

// Get all swaps
router.get('/all', swapController.getAllSwaps)

// Get all swaps matching query.
router.get('/', swapController.getSwaps)

// Get a swap by id.
router.get('/:swapId', swapController.getSwapById)

// Update an existing swap.
router.patch('/:swapId', swapController.updateSwap)

// // Delete an existing swap.
router.delete('/:swapId', swapController.deleteSwap)

module.exports = router
