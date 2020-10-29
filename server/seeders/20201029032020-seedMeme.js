'use strict';
const meme = require('../meme.json')
meme.forEach(el => {
  el.createdAt = new Date()
  el.updatedAt = new Date()
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Memes', meme)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Memes', null, {})

  }
};
