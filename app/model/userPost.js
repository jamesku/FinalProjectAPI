var Sequelize = require('sequelize')

var attributes = {
  PostId: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^[a-z0-9\_\-]+$/i,
    }
  },
  url: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.STRING,
  },
}

var options = {
  freezeTableName: true
}

module.exports.attributes = attributes
module.exports.options = options
