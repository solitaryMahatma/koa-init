///const bcrypt = require('bcryptjs');
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../core/db');

class TestModel extends Model {
  
};

TestModel.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  color: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
  }
}, {
  sequelize,
  paranoid: true,
  tableName: 'test'
});

module.exports = {
  TestModel
};

