const router = require('express').Router()
const FavoriteController = require('../controllers/favoriteController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', FavoriteController.readFavorite)

router.use('/:id', authorization)
router.post('/:id', FavoriteController.addFavorite)
router.delete('/:id', FavoriteController.delete)

module.exports = router