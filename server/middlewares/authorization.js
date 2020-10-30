const { Favorite } = require("../models");

async function authorization(req, res, next) {
  const id = +req.params.id;
  try {
    const dataFavorite = await Favorite.findOne({
      where: {
        MemeId: id,
      },
    });
    if (!dataFavorite) {
      throw { name: "Post not found" };
    } else if (dataFavorite.UserId == req.loggedInUser.id) {
      next();
    } else {
      throw { name: "Not authorized" };
    }
  } catch (error) {
    next(error);
  }
}

module.exports = authorization;
