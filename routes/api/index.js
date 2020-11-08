const router = require('express').Router()

router.use('/', require('./users'))
router.use('/books', require('./books'))



module.exports = router
