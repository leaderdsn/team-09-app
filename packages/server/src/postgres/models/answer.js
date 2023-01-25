const { DataTypes } = require('sequelize');
const { sequelize } = require('../init');
const { Owners } = require('./owners');
const { Users } = require('./users');
const { Questions } = require('./questions');

const Answer = sequelize.define('Answer', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true, 
  },
  ownerId: {
    type: DataTypes.UUID,
    field: 'owner_id',
    references: { model: 'Owners', key: 'id' },
  },
  questionId: {
    type: DataTypes.UUID,
    field: 'question_id',
    references: { model: 'Questions', key: 'id' },
  },
  score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  text: DataTypes.STRING,
}, { tableName: "Answer" });

Owners.hasMany(Answer, {
  foreignKey:'owner_id', 
  targetKey:'id', 
  as:'answer'
});

Answer.belongsTo(Owners, {
  foreignKey:'owner_id', 
  as:'owners'
})

Questions.hasMany(Answer, {
  foreignKey:'question_id', 
  targetKey:'id',
  as:'answer'
});

Answer.belongsTo(Questions, {
  foreignKey:'question_id', 
  as:'questions'
})

const getAnswerOption = () => {

  const option = {
    attributes: [
      'id', 
      'question_id',
      'score', 
      'text',
      ['createdAt','creation_date'],
    ],
    include: {
      model: Owners, as: 'owners',
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
        model: Users, as: 'users',
      },
    }
  }

  return { ...option }
};


module.exports = { Answer, getAnswerOption };