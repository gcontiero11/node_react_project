const Sequelize = require("sequelize");
const banco = require("../bd.js");

const Grid = banco.define("grid", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  line0: {
    type: Sequelize.DataTypes.JSON,
    allowNull: false,
    primaryKey: false,
  },
  line1: {
    type: Sequelize.DataTypes.JSON,
    allowNull: false,
    primaryKey: false,
  },
  line2: {
    type: Sequelize.DataTypes.JSON,
    allowNull: false,
    primaryKey: false,
  },
  line3: {
    type: Sequelize.DataTypes.JSON,
    allowNull: false,
    primaryKey: false,
  },
  line4: {
    type: Sequelize.DataTypes.JSON,
    allowNull: false,
    primaryKey: false,
  },
  line5: {
    type: Sequelize.DataTypes.JSON,
    allowNull: false,
    primaryKey: false,
  },
  line6: {
    type: Sequelize.DataTypes.JSON,
    allowNull: false,
    primaryKey: false,
  },
  line7: {
    type: Sequelize.DataTypes.JSON,
    allowNull: false,
    primaryKey: false,
  },
  line8: {
    type: Sequelize.DataTypes.JSON,
    allowNull: false,
    primaryKey: false,
  },
});

module.exports = Grid;
