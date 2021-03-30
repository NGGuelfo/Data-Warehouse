const Sequelize = require('sequelize');
const sequelize = require('../data/database');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const firma = config.secret_key;

const City = sequelize.define('city', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true
    },
    name: Sequelize.STRING
});

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    lastname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    admin: {
        type: Sequelize.INTEGER(1),
        allowNull: true
    },
    password: Sequelize.STRING
});

const Company = sequelize.define('company', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true
    },
    name: Sequelize.STRING,
    adress: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    phone: Sequelize.STRING
});

const Contact = sequelize.define('contact', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true
    },
    name: Sequelize.STRING,
    lastname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    position: Sequelize.STRING,
    phone: Sequelize.STRING,
    img: Sequelize.STRING,
    adress: Sequelize.STRING,
    interest: Sequelize.INTEGER
});

const Country = sequelize.define('country', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true
    },
    name: Sequelize.STRING
});

const Region = sequelize.define('region', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING
});

module.exports = {
    City,
    User,
    Company,
    Contact,
    Country,
    Region,
    jwt,
    firma
    };