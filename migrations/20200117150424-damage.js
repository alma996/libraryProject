'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Damage', {

      damage_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      loans_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Loans',
            key: 'loans_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
      damage_description: {
          type: Sequelize.STRING,
          allowNull: false,
        }

    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Damage')
  }
};
