const bcrypt = require('bcryptjs');
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../core/db');

class UserModel extends Model {
  static async signUp (userInfo) {
    const user = await this.findOne({ where: { phoneNumber: userInfo.phoneNumber } });
    if (user) {
      throw new global.Ex.AuthFail({
        errMsg: '手机号已存在',
        errCode: 20100
      });
    }
    await this.create(userInfo);
  }

  static async signIn (accoutPwd) {
    const user = await this.findOne({ where: { phoneNumber: accoutPwd.phoneNumber } });
    if (!user) {
      throw new global.Ex.AuthFail({
        errMsg: '手机号不存在啊',
        errCode: 20000
      });
    };
    const corrPwd = bcrypt.compareSync(accoutPwd.password, user.password);
    if (!corrPwd) {
      throw new global.Ex.AuthFail({
        errMsg: '密码不正确',
        errCode: 202000
      });
    }
  }
};

UserModel.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: Sequelize.BIGINT,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    set (val) { // setter getter    https://demopark.github.io/sequelize-docs-Zh-CN/models-definition.html
      const salt = bcrypt.genSaltSync(10);
      const password = bcrypt.hashSync(val, salt);
      this.setDataValue('password', password);
    }
  }
}, {
  sequelize,
  paranoid: true,
  tableName: 'user'
});

module.exports = {
  UserModel
};
