const mysql = {
    master : {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'atm-system'   
    }
}

const mongodb = {
    master : {
        uri : "mongodb://localhost:27017/todoapp"
    }
}

const selectedDB = "mysql";

module.exports = {
    mysql,
    mongodb,
    selectedDB
}