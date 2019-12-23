const Sequelize = require('sequelize')
const db = require('../database/db.js')
const bcrypt = require("bcryptjs")

module.exports = db.sequelize.define(
  'publisher',
  {
    publisher_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    publisher_name: {
      type: Sequelize.STRING
    }
  },
  {

    timestamps: false,
    freezeTableName: true,
  }
)