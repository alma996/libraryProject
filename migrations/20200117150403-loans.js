'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Loans', {

      loans_id: {
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
        book_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Book',
            key: 'book_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
      loans_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      return_status: {
          type: Sequelize.STRING,
          allowNull: false,
        }

    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Loans')
  }
};
