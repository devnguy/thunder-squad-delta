const router = require('express').Router()
const bookController = require('../../controllers/bookController')

// Get all books.
router.get('/', bookController.getBooks)

// Create a new book.
router.post('/', bookController.postBook)

// Get a book by id.
router.get('/:bookId', bookController.getBook)

// Edit an existing book.
// router.patch('/:bookId', bookController.editBook)

module.exports = router
