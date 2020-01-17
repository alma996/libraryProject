'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Genre', {

      genre_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      genre_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Genre')
  }
};
