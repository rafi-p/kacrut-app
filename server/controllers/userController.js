const { User, Meme, Favorite } = require("../models/index");
const { comparePass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");

class UserController {
  static async register(req, res, next) {
    try {
      const dataUser = {
        email: req.body.email,
        password: req.body.password,
      };
      const newUser = await User.create(dataUser, {
        returning: true,
      });
      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw { name: "Invalid Input" };
      } else if (!comparePass(password, user.password)) {
        throw { name: "Invalid Input" };
      } else {
        const access_token = signToken({
          id: user.id,
          email: user.email,
        });
        res.status(200).json({ access_token });
      }
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    //verify token
    //dapetin token dari client
    const google_token = req.body.access_token;
    const client = new OAuth2Client(process.env.CLIENT_ID);
    try {
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.CLIENT_ID,
      });
      const payload = ticket.getPayload();

      const user = await User.findOne({ where: { email: payload.email } });
      let newUser;
      if (user) {
        newUser = user;
      } else {
        let userObj = {
          email: payload.email,
          password: "RandomAja",
        };
        newUser = await User.create(userObj);
      }

      const access_token = signToken({
        id: newUser.id,
        email: newUser.email,
      });
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
