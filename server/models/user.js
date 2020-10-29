'use strict';
const {Model} = require('sequelize');
const {hashPassword} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.belongsToMany(models.Meme, {
        through: models.Favorite
      })
    }
  };
  User.init({
    emmail: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please use email format'
        },
        notEmpty: {
          args: true,
          msg: 'Email is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        },
        notNull: {
          msg: 'Password is required'
        },
        isShort(value) {
          if(value.length < 5) {
            throw new Error('Password minimal 5 characters')
          }
        }
      }
      
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(User) {
        User.password = hashPassword(User.password)
      }
    }
  });
  return User;
};