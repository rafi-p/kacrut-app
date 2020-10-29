const router = require('express').Router()
const MemeController = require('../controllers/memeController')

router.get('/', MemeController.readAll)
router.get('/random', MemeController.random)

module.exports = router