'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Book', {

      book_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      author_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Author',
            key: 'author_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
        genre_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Genre',
            key: 'genre_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
        publisher_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Publisher',
            key: 'publisher_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
      book_name: {
        type: Sequelize.STRING
      }

    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Book')
  }
};
