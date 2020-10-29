const router = require('express').Router()
const MemeController = require('../controllers/memeController')
const authorization = require('../middlewares/authorization')

// router.use(authorization)

router.get('/', MemeController.readAll)
router.get('/randomJoke', MemeController.randomJoke)
router.post('/', MemeController.addMeme)

module.exports = router