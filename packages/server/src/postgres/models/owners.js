const { DataTypes } = require('sequelize');
const { sequelize } = require('../init');
const { Users } = require('./users');

const Owners = sequelize.define('Owners', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true, 
    unique: true
  },
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    field: 'user_id',
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  reputation: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  accept_rate: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  link: {
    type:DataTypes.STRING,
    defaultValue: `users/`
  },
}, { tableName: "Owners" });

Users.hasOne(Owners, {foreignKey: 'user_id', as: 'owner', onDelete: 'CASCADE'})
Owners.belongsTo(Users, {foreignKey: 'user_id', as: 'user'});


module.exports = { Owners };