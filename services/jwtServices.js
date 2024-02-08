'use strict';
const jwt = require('jsonwebtoken');
const logging = require("../logging");
const envProperties = require('../properties/envProperties');

const key = envProperties.TOKEN_SECRET;

const createJWT = (apiReference, opts, expiryTime)=>{
    logging.log(apiReference, {
        EVENT: "!! CREATING JWT !! ",
        OPTS:  opts
    });
    return jwt.sign(opts, key, {expiresIn: expiryTime || "2 days"});
}

const verifyJwt = (apiReference, tokenValue)=>{
    logging.log(apiReference, {EVENT: "!! Verifying JWT !! ",TOKEN:  tokenValue});
    let decoded;
    try{
        decoded = jwt.verify(tokenValue, key);
    } catch(error) {
        logging.logError("Invalid token!!", tokenValue, error);
    }
    logging.log(apiReference, { EVENT: "!! DECODED JWT !! ", OPTS:  decoded });
    return decoded;
}

module.exports = {
    createJWT,
    verifyJwt
}