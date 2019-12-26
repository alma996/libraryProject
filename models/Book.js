const Sequelize = require('sequelize')
const db = require('../database/db.js')
const bcrypt = require("bcryptjs")

module.exports = db.sequelize.define(
  'book',
  {
    book_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    author_id: {
        type: Sequelize.INTEGER,
      },
      genre_id: {
        type: Sequelize.INTEGER,
      },
      publisher_id: {
        type: Sequelize.INTEGER,
      },
    book_name: {
      type: Sequelize.STRING
    }
    },
  {

    timestamps: false,
    freezeTableName: true,
  }
)