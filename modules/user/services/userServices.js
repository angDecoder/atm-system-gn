'use strict';
const logging = require('../../../logging');
const userDao = require('../dao/userDao');
const pwdServices = require('../../../services/pwdServices');
const constants = require('../../../responses/responseConstants');
const jwtServices = require('../../../services/jwtServices');

const register = async(apiReference,values)=>{

    let response = { success : false };
    values.password = pwdServices.encrypt(values.password);

    const registerResponse = await userDao.register(apiReference,values);
    logging.log(apiReference,{ EVENT : 'REGISTER RESPONSE FETCHED', REGISTER_RESPONSE : registerResponse });

    if( !registerResponse.success ){
        response.error = registerResponse.error;
        return response; 
    }

    response.success = true;
    return response;
}

const login = async(apiReference,values)=>{

    let response = { success : false };
    let loginResponse = await userDao.login(apiReference,values);
    if( !loginResponse.success ){
        response.error = loginResponse.error;
        return response;
    }

    loginResponse = loginResponse.data;

    const match = pwdServices.compare(values.password,loginResponse.password);
    if( !match ){
        response.error = constants.responseMessages.INVALID_CREDENTIALS;
        return response;
    }

    const accessToken = jwtServices.createJWT(apiReference,{ email : values.email });
    response.success = true;
    response.data = {
        email : values.email,
        accessToken
    }
    return response;
}

module.exports = {
    register,
    login
};