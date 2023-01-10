const { DataTypes } = require('sequelize');
const { sequelize } = require('../init');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  theme: {
    type: DataTypes.STRING,
  },
}, {});

module.exports = { User };
