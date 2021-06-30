const sequelize = require('./../database');
const {DataTypes, Model} = require('sequelize');

class Card extends Model {}

Card.init({
  title: {
    type: DataTypes.TEXT,
    defaultValue: '',
    allowNull: false
  },
  position: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
        isInt: true,
        min: 0
    }
  },
  color: {
    type: DataTypes.TEXT,
    defaultValue: '#FFF',
    allowNull: false
  }

}, {
    order : ['position', 'ASC'],
  sequelize,
  tableName: 'card'
});

module.exports = Card;
