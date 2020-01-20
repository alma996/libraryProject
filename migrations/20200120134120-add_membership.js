'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const membershipData = [{
      "membership_id": "",
      "member_id": "",
      "date_of_payment": "2020-01-20",
      "year": "2020",
      "amount": "50",
    }]

    await queryInterface.bulkInsert('Membership', membershipData)
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Membership', {date_of_payment: "2020-01-20", year: "2020", amount: "50"}, {})
   
  }
};
