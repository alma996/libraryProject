'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const publisherData = [{
      "publisher_id": "",
      "publisher_name": "Buybook",
    }]

    await queryInterface.bulkInsert('Publisher', publisherData)
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Publisher', {publisher_name: "Buybook"}, {})
   
  }
};
