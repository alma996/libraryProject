const Sequelize = require('sequelize')
const db = require('../database/db.js')
const bcrypt = require("bcryptjs")

module.exports = db.sequelize.define(
  'loans',
  {
    loans_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    member_id: {
        type: Sequelize.INTEGER,
      },
      book_id: {
        type: Sequelize.INTEGER,
      },
    loans_date: {
      type: Sequelize.DATE
    },
    return_status: {
        type: Sequelize.STRING
      }
    },
  {

    timestamps: false,
    freezeTableName: true,
  }
)