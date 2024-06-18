const banco = require("../bd.js");
const Sequelize = require("sequelize");

const Game = banco.define("game", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  dificuldade: {
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
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  grid_id_fk: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Grid,
      key: "id",
    },
  },
});

Game.belongsTo(User, { foreignKey: 'user_id_fk' });
Game.belongsTo(Grid, { foreignKey: 'grid_id_fk' });

module.exports = Game;
