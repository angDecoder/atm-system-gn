'use strict';

const jwtService = require('../services/jwtServices');
const responses = require('../responses/responses');
const logging = require('../logging');
const envProperties = require('../properties/envProperties');

// mainly to check res.locals but in our case no needed because in this cache we will have "bypass_user_auth" field to skip auth operation.
exports.authenticateUser = async (req, res, next) =>{
    let apiReference = req.apiReference;
    let cache = {...res.locals};
    
    if(cache.bypass_user_auth){
        res.locals.auth_details = {
            user_id: req.body.user_id
        };

        next();
    }
    logging.log(apiReference, { EVENT: "Inside authenticateUser"});

    await validations(req, res, next);

}

const validations = async (req, res, next) => {
    const requestHeader = {...req.headers};

    let decodeToken = jwtService.verifyJwt(req.apiReference, requestHeader["access-token"]);

    if(!decodeToken){
        return responses.invalidAuthKey(res);
    }

    req.body.owner = decodeToken.email;

    return next();
}

exports.authenticateMicroService = (req, res, next)=>{
    let requestHeaders = {...req.headers};
    let apiReference = {
        module: "microservice",
        api: "auth"
    }

    logging.log(apiReference, { EVENT: "VERIFYING AUTH_TOKEN", Locals: requestHeaders.micro_auth_token })

    if(requestHeaders.micro_auth_token == envProperties.microserviceAuthToken){
        res.locals.bypass_user_auth = true;

        logging.log(apiReference, { EVENT: "Setting up Bypass for Microservice", Locals: res.locals });
    }

    next();
}