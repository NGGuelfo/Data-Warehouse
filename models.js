const Sequelize = require('sequelize');

const jwt = require('jsonwebtoken');
const config = require('./config/config');
const firma = config.secret_key;

const sequelize = new Sequelize (config.databaseName, config.username, config.password, {
    host: 'localhost',
    dialect: 'mysql'
});

const Ciudad = sequelize.define('city', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true
    },
    name: Sequelize.STRING
});

const Usuarios = sequelize.define('user', {
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

const Companias = sequelize.define('company', {
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

const Contactos = sequelize.define('contact', {
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

const Paises = sequelize.define('country', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true
    },
    name: Sequelize.STRING
});

const Regiones = sequelize.define('region', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING
});

module.exports = {
    Ciudad,
    Usuarios,
    Companias,
    Contactos,
    Paises,
    Regiones,
    jwt,
    firma
};