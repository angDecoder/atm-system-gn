'use strict';

const logging = require('../../../logging');
const mysqlib = require('../../../database/mysqllib');
const executeQuery = mysqlib.executeQuery;
const constants = require('../../../responses/responseConstants');

const register = async (apiReference, opts) => {

    let response = { success : false };

    logging.log(apiReference, { EVENT: "REGISTERING USER", VALUES: opts });

    const queryString = `INSERT INTO customer(EMAIL,PASSWORD) VALUES(?,?)`;
    const val = [opts.email, opts.password];
    const registerResponse = await executeQuery(
        apiReference,
        "registering user",
        queryString,
        val
    );
    logging.log(apiReference, { EVENT: "USER REGISTERED", VALUE: registerResponse });

    if (registerResponse.ERROR) {
        if (queryResponse.ERROR) {
            if (queryResponse.ERROR === "ER_DUP_ENTRY") {
                response.error = constants.responseMessages.DUPLICATE_ENTRY;
                return response;
            }
            response.error = queryResponse.ERROR;
            return response;
        }
    }
    response.success = true;
    return response;
}

const login = async (apiReference, opts) => {

    let response = { success : false };
    logging.log(apiReference, { EVENT: "LOGGING IN USER", VALUES: opts });

    const queryString = `select email,password
                        from customer
                        where email = ?`;
    const val = [opts.email];

    let loginResponse = await executeQuery(
        apiReference,
        "logging in user",
        queryString,
        val
    );

    if( loginResponse.ERROR ){
        response.error = loginResponse.ERROR;
        return response;
    }

    if( loginResponse[0].length===0 ){
        response.error = constants.responseMessages.USER_NOT_FOUND;
        return response;
    }

    response.success = true;
    response.data = loginResponse[0][0];

    return response;

}


module.exports = {
    register,
    login
};