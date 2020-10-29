const router = require('express').Router()
const MemeController = require('../controllers/memeController')

router.get('/', MemeController.readAll)
router.get('/random', MemeController.randomMeme)
router.get('/randomJoke', MemeController.randomJoke)
router.post('/', MemeController.addMeme)

module.exports = router