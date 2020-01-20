'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const memberData = [{
      "member_id": "",
      "first_name": "Alma",
      "last_name": "Sadiković",
      "birth_date": "2020-01-20",
      "address": "Ćazima Alića 35",
      "email": "alma96@gmail.com",
      "phone_number": "062444444",
    }]

    await queryInterface.bulkInsert('Member', memberData)
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Member', {first_name: "Alma", last_name: "Sadiković", birth_date: "2020-01-20",address: "Ćazima Alića 35", email: "alma96@gmail.com", phone_number: "062444444"}, {})
   
  }
};
