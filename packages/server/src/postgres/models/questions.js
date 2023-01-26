const { DataTypes } = require('sequelize');
const { sequelize } = require('../init');
const { Owners } = require('./owners');
const { Users } = require('./users');

const Questions = sequelize.define('Questions', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true, 
    unique: true
  },
  acceptedAnswerId: {
    type: DataTypes.UUID,
    field: 'accepted_answer_id',
  },
  ownerId: {
    type: DataTypes.UUID,
    field: 'owner_id',
    references: { model: 'Owners', key: 'id' },
  },
  tags: DataTypes.ARRAY(DataTypes.STRING),
  is_answered: DataTypes.BOOLEAN,
  view_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  answer_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  score: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  last_activity_date: DataTypes.DATE,
  last_edit_date: DataTypes.DATE,
  link: DataTypes.STRING,
  title: DataTypes.STRING,
}, { tableName: 'Questions' });

Owners.hasMany(Questions, {
  foreignKey:'owner_id', 
  targetKey:'id', 
  as:'questions'
});

Questions.belongsTo(Owners, {
  foreignKey:'owner_id', 
  as:'owner',
});


const questionsOption = () => {

  const option = {
    attributes: [
      'id', 
      'tags', 
      'is_answered', 
      'view_count', 
      'answer_count',
      'score',
      'last_activity_date',
      ['createdAt','creation_date'],
      ['updatedAt','last_edit_date'],
      'link',
      'title',
    ],
    include: {
      model: Owners, as: 'owner',
      attributes: [
        ['id', 'account_id'], 
        'reputation', 
        'accept_rate', 
        'link'
      ],
      include: { 
        attributes: [
          ['id', 'user_id'],
          'profile_image', 
          'display_name', 
          'user_type'
        ],
        model: Users, as: 'user',
      },
    }
  }

  return { ...option }
};

module.exports = { Questions, questionsOption };