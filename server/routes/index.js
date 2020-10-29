const router = require('express').Router()
const memeRoute = require('./memeRoute')

router.use('/memes', memeRoute)

module.exports = router