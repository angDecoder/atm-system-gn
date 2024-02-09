'use strict';
const mysqllib = require('./mysqllib');
const logging = require('../logging');
const dbProperties = require('./dbProperties');
const mongolib = require('./mongolib');

const initialze = async(apiReference,)=>{
    // initialze mysql 
    logging.log(apiReference,'STARTING MYSQL CONNECTION @');
    global.mysqlCon = await mysqllib.initialize(apiReference,dbProperties.mysql);


    // initialize mongodb 
    // logging.log(apiReference,{ EVENT : "STARTING MONGODB CONNECTION" })
    // await mongolib.initialize(apiReference,dbProperties.mongodb.master.uri);
}

module.exports = {
    initialze
}