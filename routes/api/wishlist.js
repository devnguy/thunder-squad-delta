const router = require('express').Router()
const wishlistController = require('../../controllers/wishlistController')

// Get all wishlist books.
router.get('/', wishlistController.getWishes)

// Get all wishlist books from a user.
router.get('/:userId', wishlistController.getUserWishes)

// Create a new wishlist book.
router.post('/:userId', wishlistController.postWish)

// Get a wishlist book by id.
router.get('/wish/:wishId', wishlistController.getWish)

// Remove a wishlist book.
router.delete('/:wishId', wishlistController.deleteWish)

module.exports = router
