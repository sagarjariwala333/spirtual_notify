const { Sequelize } = require('sequelize');

class Connection {
  static sequelize = null;

  static createSequelize() {
    this.sequelize = new Sequelize('test', 'postgres', 'NewPassword', {
      host: 'localhost',
      dialect: 'postgres',
    });
  }

  static getSequelize() {
    return this.sequelize;
  }
}

module.exports = Connection;
