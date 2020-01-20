'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const loansData = [{
      "loans_id": "",
      "member_id": "1",
      "book_id": "1",
      "loans_date": "2020-01-20",
      "return_status": "Returned",
    }]

    await queryInterface.bulkInsert('Loans', loansData)
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Loans', {loans_date: "2020-01-20", return_status: "Returned"}, {})
   
  }
};
