const config = require('config');

const mysql = {
    host: config.get("master.host") || process.env.DB_HOST,
    port: config.get("master.port") || process.env.DB_PORT,
    user: config.get("master.user") || process.env.DB_USER,
    password: config.get("master.password") || process.env.DB_PASSWORD,
    database: config.get("master.database") || process.env.DB_DATABASE,
}

const mongodb = {
    master: {
        uri: "mongodb://localhost:27017/todoapp"
    }
}

const selectedDB = "mysql";

module.exports = {
    mysql,
    mongodb,
    selectedDB
}