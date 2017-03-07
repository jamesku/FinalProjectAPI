var Sequelize = require('sequelize')

var attributes = {
  hashtag: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  admin: {
    type: Sequelize.ARRAY(Sequelize.DataTypes.STRING),
    allowNull: false,
    unique: false,
  },
}

var options = {
  freezeTableName: true
}

module.exports.attributes = attributes
module.exports.options = options
