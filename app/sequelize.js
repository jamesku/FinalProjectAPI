var Sequelize = require('sequelize'),
    sequelize = new Sequelize('postgres://james:james@localhost:5432/mw')

module.exports = sequelize
