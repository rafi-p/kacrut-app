const { Meme, Favorite, User } = require('../models/index')

class FavoriteController {
    static async readFavorite(req, res, next) {
        try {
            const UserId = req.loggedIn.id
            const favorites = await Favorite.findAll({
                where: {
                    UserId: UserId
                },
                include: Meme
            })
            res.status(200).json(favorites)
        } catch (err) {
            next(err)
        }
    }

    static async addFavorite (req, res, next) {
        try {
            const memeId = +req.params.id
            const UserId = req.loggedIn.id
            const payload = {
                memeId,
                UserId
            }
            const newFav = await Favorite.create(payload, {
                returning: true
            })
            res.status(200).json(newFav)
        } catch (err) {
            next(err)
        }
    }

    static async delete (req, res, next) {
        try {
            const id = +req.params.id
            const destroyed = await Favorite.destroy({
                where: {
                    id: id
                }
            })
            if (destroyed !== 1) {
                throw {msg: `Delete Failed`, status: 404}
            } else {
                res.status(200).json({msg: 'Deleted successfully'})
            }
        } catch (err) {
            
        }
    }
}

module.exports = FavoriteController