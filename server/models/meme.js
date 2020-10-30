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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Name can't be empty`
        },
        notEmpty: {
          args: true,
          msg: `Name can't be empty`
        }
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `url can't be empty`
        },
        notEmpty: {
          args: true,
          msg: `url can't be empty`
        },
        isUrl: {
          args: true,
          msg: 'Please insert a valid url'
        }
      }
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `url can't be empty`
        },
        notEmpty: {
          args: true,
          msg: `url can't be empty`
        },
        isNumeric: {
          args: true,
          msg: 'width must be a number'
        }
      }
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `url can't be empty`
        },
        notEmpty: {
          args: true,
          msg: `url can't be empty`
        },
        isNumeric: {
          args: true,
          msg: 'width must be a number'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Meme',
  });

  Meme.addHook('beforeValidate', (instance, option) => {
    if (!instance.width || !instance.height) {
      instance.width = 350
      instance.height = 350
    }
  })

  return Meme;
};