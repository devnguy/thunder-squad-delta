const router = require('express').Router()
const swapController = require('../../controllers/swapController')

// Get all swaps matching query.
router.get('/', swapController.getSwaps)

// Get a swap by id.
router.get('/:swapId', swapController.getSwapById)

// // Edit an existing swap.
// router.patch('/:swapId', userController.editSwap)

// // Delete an existing swap.
router.delete('/:swapId', swapController.deleteSwap)

module.exports = router
