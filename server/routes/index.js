const router = require('express').Router()
const memeRoute = require('./memeRoute')
const UserController = require('../controllers/userController')
const favoriteRoute = require('./favoriteRoute') 
const authentication = require('../middlewares/authentication')

router.post('/register', UserController.register)

router.post('/login', UserController.login)

router.use(authentication)

router.use('/memes', memeRoute)

router.use('/favorites', favoriteRoute)

module.exports = router