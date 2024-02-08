'use strict';
const logging = require('../../../logging');
const userDao = require('../dao/userDao');
const pwdServices = require('../../../services/pwdServices');
const constants = require('../../../responses/responseConstants');
const jwtServices = require('../../../services/jwtServices');

const register = async(apiReference,opts)=>{

    let response = { success : false };
    opts.password = pwdServices.encrypt(opts.password);

    const registerResponse = await userDao.register(apiReference,opts);
    logging.log(apiReference,{ EVENT : 'REGISTER RESPONSE FETCHED', REGISTER_RESPONSE : registerResponse });

    if( !registerResponse.success ){
        response.error = registerResponse.error;
        return response; 
    }

    response.success = true;
    return response;
}

const login = async(apiReference,opts)=>{

    let response = { success : false };
    let loginResponse = await userDao.login(apiReference,opts);
    if( !loginResponse.success ){
        response.error = loginResponse.error;
        return response;
    }

    loginResponse = loginResponse.data;

    const match = pwdServices.compare(opts.password,loginResponse.password);
    if( !match ){
        response.error = constants.responseMessages.INVALID_CREDENTIALS;
        return response;
    }

    const accessToken = jwtServices.createJWT(apiReference,{ email : opts.email });
    response.success = true;
    response.data = {
        email : opts.email,
        accessToken
    }
    return response;
}

module.exports = {
    register,
    login
};