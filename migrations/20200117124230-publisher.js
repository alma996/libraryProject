'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Publisher', {

      publisher_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      publisher_name: {
        type: Sequelize.STRING,
        allowNull: false,
      }

    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Publisher')
  }
};
