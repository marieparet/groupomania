'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Likes', 'likesCount', {
      type: Sequelize.INTEGER
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Likes', 'likesCount', {
      type: Sequelize.STRING
    })
  }
}
