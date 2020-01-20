'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const damageData = [{
      "damage_id": "",
      "loans_id": "1",
      "damage_description": "Damaged first page of the book",
    }]

    await queryInterface.bulkInsert('Damage', damageData)
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Damage', {damage_description: "Damaged first page of the book"}, {})
   
  }
};
