const { Meme, Favorite, User } = require('../models/index')

class MemeController {
    static async readAll(req, res, next) {
        try {
            const memes = await Meme.findAll({
                order: [['createdAt', 'desc']]
            })
            res.status(200).json(memes)

        } catch (err) {
            next(err)
        }
    }

    static random (req, res, next) {
        
    }
}

module.exports = MemeController