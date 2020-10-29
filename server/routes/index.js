const router = require('express').Router()
const memeRoute = require('./memeRoute')
const favoriteRoute = require('./favoriteRoute') 

router.use('/memes', memeRoute)
router.use('/favorites', favoriteRoute)

module.exports = router