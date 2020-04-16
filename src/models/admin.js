const bcrypt = require('bcryptjs');
const { Sequelize, Model, Op } = require('sequelize');
const { sequelize } = require('../core/db');

class User extends Model { }

class Group extends Model { }

class Auth extends Model {
  static async addAuth (obj) {
    await this.create(obj);
  }

  static async getAuth (obj) {
    const auth = await this.findOne({
      where: {
        ...obj,
        deletedAt: null
      }
    });
    return auth;
  }

  static async getAuthModules () {
    const modules = await this.findAll({
      attributes: ['auth', 'module'],
      where: {
        module: {
          [Op.not]: ''
        },
        deletedAt: null
      }
    }).map(el => el.get({ plain: true }));
    return modules;
  }
}

// 用户模型
User.init({
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
  groupId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  password: {
    type: Sequelize.STRING,
    set (pwd) {
      const salt = bcrypt.genSaltSync(20);
      const password = bcrypt.hashSync(pwd, salt);
      this.setDataValue('password', password);
    }
  }
}, {
  sequelize,
  paranoid: true,
  tableName: 'user',
  getterMethods: {
    isAdmin () {
      return this.getDataValue('admin') === 0;
    }
  }
});

// 分组模型
Group.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  desc: Sequelize.STRING
}, {
  sequelize,
  tableName: 'group'
});

// 权限模型
Auth.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  groupId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  auth: Sequelize.STRING,
  module: Sequelize.STRING
}, {
  sequelize,
  tableName: 'auth'
});

module.exports = { User, Group, Auth };