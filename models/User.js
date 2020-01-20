const Sequelize = require('sequelize')
const db = require('../database/db.js')
const bcrypt = require("bcryptjs")

module.exports = db.sequelize.define(
  'user',
  {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.VIRTUAL
    },
    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },
  {

    /*hooks : {
      beforeCreate : (user , options) => {
          {
              user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, 10) : "";

          }
          
        }},
*/
    timestamps: false
  }
)