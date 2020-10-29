'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Meme extends Model {

    static associate(models) {
      Meme.belongsToMany(models.User, {
        through: models.Favorite
      })
    }
  };
  Meme.init({
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    width: DataTypes.INTEGER,
    height: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Meme',
  });
  return Meme;
};