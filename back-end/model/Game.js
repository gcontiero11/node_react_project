const banco = require("../bd.js");
const Sequelize = require("sequelize");
const User = require("./User.js");
const Grid = require("./Grid.js");

const Game = banco.define("game", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  difficult: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: false,
  },
  hasEnded:{
    type: Sequelize.BOOLEAN,
    allowNull: false,
    primaryKey: false
  },
  user_id_fk: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: User,
      key: "id",
    }
  },
  grid: {
    type: Sequelize.DataTypes.JSON,
    allowNull: false,
  },
});

Game.belongsTo(User, { foreignKey: 'user_id_fk' });

module.exports = Game;
