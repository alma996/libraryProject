'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const bookData = [{
      "book_id": "",
      "author_id": "",
      "genre_id": "",
      "publisher_id": "",
      "book_name": "Tvrđava",
    }]



    await queryInterface.bulkInsert('Book', bookData)
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Book', {book_name: "Tvrđava"}, {})
   
  }
};
