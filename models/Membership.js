const Sequelize = require('sequelize')
const db = require('../database/db.js')
const bcrypt = require("bcryptjs")

module.exports = db.sequelize.define(
  'membership',
  {
    membership_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    member_id: {
        type: Sequelize.INTEGER,
      },
    date_of_payment: {
      type: Sequelize.DATE
    },
    year: {
      type: Sequelize.STRING
    },
    amount: {
        type: Sequelize.INTEGER
      },
    },
  {

    timestamps: false,
    freezeTableName: true,
  }
)