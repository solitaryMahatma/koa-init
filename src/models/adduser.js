///

const bcrypt = require('bcryptjs');
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../core/db');
class AddUser extends Model {

}

AddUser.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickName: {
    type: Sequelize.STRING(18),
    allowNull: false
  },
  encoding: {
    type: Sequelize.STRING(18),
    allowNull: false
  },
  trade: {
    type: Sequelize.STRING(18),
    allowNull: false
  },
  job: {
    type: Sequelize.STRING(18),
    allowNull: false
  },
  city: {
    type: Sequelize.STRING(18),
    allowNull: false
  }
}, {
  sequelize,
  paranoid: true,
  tableName: 'adduser'
});

module.exports = { AddUser};