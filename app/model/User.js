import Sequelize from 'sequelize';

const attributes = {
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  jwt: {
    type: Sequelize.STRING,
  }
};

const options = {
  freezeTableName: true
};

module.exports.attributes = attributes;
module.exports.options = options;
