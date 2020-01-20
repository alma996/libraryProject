'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const authorData = [{
      "author_id": "",
      "first_name": "Meša",
      "last_name": "Selimović"
    }]

    await queryInterface.bulkInsert('Author', authorData)
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Author', {first_name: "Meša", last_name: "Selimović"}, {})
   
  }
};
