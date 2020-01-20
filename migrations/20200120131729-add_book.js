'use strict';

const ID = require('uuid/v4')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const id = ID()
    const bookData = [{
      "book_id": '',
      "author_id": "1",
      "genre_id": "1",
      "publisher_id": "1",
      "book_name": "Tvrđava",
    }]


    await queryInterface.bulkInsert('Book', bookData)
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Book', {book_name: "Tvrđava"}, {})
   
  }
};
