const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/books', require('./books'))
router.use('/ownedBooks', require('./ownedBooks'))
router.use('/swaps', require('./swaps'))

module.exports = router
