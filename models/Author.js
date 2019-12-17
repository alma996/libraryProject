const Sequelize = require('sequelize')
const db = require('../database/db.js')
const bcrypt = require("bcryptjs")

module.exports = db.sequelize.define(
  'author',
  {
    author_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    }
  },
  {

    timestamps: false,
    freezeTableName: true,
  }
)