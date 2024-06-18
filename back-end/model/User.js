const Sequelize = require("sequelize");
const banco = require("../bd.js");

const User = banco.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: false,
  },
  level: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: false,
  },
});
module.exports = User;
