const banco = require("./bd.js");
const Sequelize = require("sequelize");

const Game = banco.define("game", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: false,
  },
});
module.exports = Game;
