const { Meme, Favorite, User } = require('../models/index')
const axios = require('axios')

class MemeController {
    static async readAll(req, res, next) {
        try {
            const memes = await Meme.findAll({
                order: [['id', 'asc']],
                limit: 50
            })
            res.status(200).json(memes)

        } catch (err) {
            next(err)
        }
    }

    static async randomMeme (req, res, next) {
        const id = Math.floor(Math.random()*101)
        try {
            const meme = await Meme.findByPk(id)
            res.status(200).json(meme)
        } catch (err) {
            next(err)
        }
    }

    static async randomJoke(req, res, next) {
        try {
            const joke = await axios({
                url: `https://sv443.net/jokeapi/v2/joke/Any`,
                method: 'GET'
            })
            res.status(200).json(joke.data)
        } catch (err) {
            next(err)
        }
    }

    static async addMeme(req, res, next) {
        try {
            const payload = {
                name: req.body.name,
                url: req.body.url,
                width: req.body.width,
                height: req.body.height
            }
            const newMeme = await Meme.create(payload, {
                returning: true
            })
            res.status(201).json(newMeme)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = MemeController