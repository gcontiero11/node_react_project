const sqlite3 = require('@sequelize/sqlite3')
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    {
      dialect: "sqlite",
      storage: 'database.db'
    }
);

module.exports = sequelize;