const Sequelize = require('sequelize')
const db = require('../database/db.js')
const bcrypt = require("bcryptjs")

module.exports = db.sequelize.define(
  'damage',
  {
    damage_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    loans_id: {
        type: Sequelize.INTEGER,
      },
    damage_description: {
        type: Sequelize.STRING
      }
    },
  {

    timestamps: false,
    freezeTableName: true,
  }
)