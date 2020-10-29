'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {

    static associate(models) {
      Favorite.belongsTo(models.User, {
        foreignKey: 'UserId',
        targetKey: 'id'
      })
      Favorite.belongsTo(models.Meme, {
        foreignKey: 'MemeId',
        targetKey: 'id'
      })
    }
  };
  Favorite.init({
    UserId: DataTypes.INTEGER,
    MemeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};