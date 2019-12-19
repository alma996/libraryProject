const Sequelize = require('sequelize')
const db = require('../database/db.js')
const bcrypt = require("bcryptjs")

module.exports = db.sequelize.define(
  'genre',
  {
    genre_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    genre_name: {
      type: Sequelize.STRING
    },
  },
  {

    timestamps: false,
    freezeTableName: true,
  }
)