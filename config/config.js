const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    config: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        databaseName: process.env.DB_NAME,
        host: process.env.DB_HOST,
        db_port: process.env.DB_PORT,
        app_port: process.env.APP_PORT,
        dialect: process.env.DB_DIALECT,
        secret_key: process.env.JWT_KEY
    }
}