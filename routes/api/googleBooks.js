const router = require('express').Router()
const googleBookController = require('../../controllers/googleBookController')

// Get all google books that relate to the supplied keyword header.
router.get('/:title/:author', googleBookController.getGoogleBooks)

module.exports = router
