const { DataTypes } = require('sequelize');
const { sequelize } = require('../init');

const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true, 
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  theme: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING, 
    allowNull: true
  },
  email: DataTypes.STRING,
  profile_image: {
    type: DataTypes.STRING,
    defaultValue: '/avatar/'
  },
  display_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  user_type: { 
    type: DataTypes.STRING,
    defaultValue: 'registered'
  }
}, { tableName: 'Users'});

module.exports = { Users };
