const { Meme, Favorite, User, Sequelize } = require("../models/index");
const axios = require("axios");

class MemeController {
  static async readAll(req, res, next) {
    try {
      const memes = await Meme.findAll({
        order: [["id", "asc"]],
      });
      res.status(200).json(memes);
    } catch (err) {
      next(err);
    }
  }

  static async randomJoke(req, res, next) {
    try {
      const joke = await axios({
        url: `https://sv443.net/jokeapi/v2/joke/Any`,
        method: "GET",
      });
      res.status(200).json(joke.data);
    } catch (err) {
      next(err);
    }
  }

  static async addMeme(req, res, next) {
    try {
      const payload = {
        name: req.body.name,
        url: req.body.url,
        width: +req.body.width,
        height: +req.body.height,
      };
      const newMeme = await Meme.create(payload, {
        returning: true,
      });
      res.status(201).json(newMeme);
    } catch (err) {
      next(err);
    }
  }

  static async searchGIF(req, res, next) {
    try {
      const q = req.body.question;
      const result = await axios({
        method: "GET",
        url: `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY}&q=${q}&limit=20&offset=0&rating=g&lang=en`,
      });
      res.status(200).json(result.data.data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MemeController;
