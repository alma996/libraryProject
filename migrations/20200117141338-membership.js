'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Membership', {

      membership_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      member_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Member',
            key: 'member_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        
        },
      date_of_payment: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      year: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Membership')
  }
};