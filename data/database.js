const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.databaseName, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
});

module.exports = sequelize;