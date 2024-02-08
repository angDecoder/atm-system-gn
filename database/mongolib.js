const mongoose = require('mongoose');
const logging = require('../logging');

const initialize = async(apiReference,config)=>{
    try {
        const mongo = await mongoose.connect(config);
        logging.log(apiReference,{ EVENT : "CONNECTED TO MONGODB"});
    } catch (error) {
        logging.logError(apiReference,{ EVENT : "ERROR CONNECTINGO TO MONBODB", ERROR : error });
    }
}

module.exports = {
    initialize
} ;