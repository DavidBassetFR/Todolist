const sequelize = require('./../database');
const {DataTypes, Model} = require('sequelize');

class List extends Model {}

List.init({
  name: {
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
}
}, {
  defaultScope: {
    include: {
      association: 'cards',
      include : 'tags'
    },
    order : [['position'], ['cards', 'position', 'asc']],
  },
  sequelize,
  tableName: 'list'
});

module.exports = List;
