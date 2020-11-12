const router = require('express').Router()
const ownedBookController = require('../../controllers/ownedBookController')

// Get all books.
router.get('/', ownedBookController.getBooks)

// Create a new book.
router.post('/', ownedBookController.createBook)

// Get a book by id.
 router.get('/:ownedBookId', ownedBookController.getBook)

// Edit an existing book.
 router.patch('/:ownedBookId', ownedBookController.editBook)

module.exports = router
