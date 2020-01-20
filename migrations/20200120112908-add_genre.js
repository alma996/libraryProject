'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const genreData = [{
      "genre_id": "",
      "genre_name": "Drama",
    }]

    await queryInterface.bulkInsert('Genre', genreData)
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Genre', {genre_name: "Drama"}, {})
   
  }
};
