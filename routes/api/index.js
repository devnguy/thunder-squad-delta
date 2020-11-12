const router = require('express').Router()

router.use('/', require('./users'))
router.use('/books', require('./books'))
router.use('/ownedBooks', require('./ownedBooks'))

module.exports = router
