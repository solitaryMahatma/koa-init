const bcrypt = require('bcryptjs');
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../core/db');

class CmsUser extends Model {

}

CmsUser.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  nickName: {
    type: Sequelize.STRING(18),
    allowNull: true
  },
  avatar: {
    type: Sequelize.STRING(500),
    comment: '头像url的地址'
  },
  admin: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    comment: '0代表非管理员，1代表管理员'
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true
  },
  
  password: {
    type: Sequelize.STRING,
    set (pwd) {
      const salt = bcrypt.genSaltSync(10);
      const password = bcrypt.hashSync(pwd, salt);
      this.setDataValue('password', password);
    }
  }
}, {
  sequelize,
  paranoid: true,
  tableName: 'cmsUser',
  getterMethods: {
    isAdmin () {
      return this.getDataValue('admin') === 0;
    }
  }
});

module.exports = { CmsUser };