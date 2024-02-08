'use strict';

const responseConstants = require('./responseConstants');

const sendResponse = (res, data)=>{
    let response = JSON.stringify({
        message: data.message,
        status: data.status,
        data: data.data
    });

    res.status(data.status).send(response);
}

const validationMissingParameterError = (res, data, message)=>{
    let response = {
        message: message || responseConstants.responseMessages.MISSING_PARAMETER,
        status: responseConstants.responseStatus.BAD_REQUEST,
        data: data || {}
    }
    sendResponse(res, response);
}

const success = (res, data, message) =>{
    let response = {
        message : message || responseConstants.responseMessages.SUCCESS,
        status : responseConstants.responseStatus.SUCCESS,
        data: data || {}
    }
    sendResponse(res, response);
}

const failure = (res, data, message) =>{
    let response = {
        message : message || responseConstants.responseMessages.FAILURE,
        status : responseConstants.responseStatus.FAILURE,
        data: data || {}
    }
    sendResponse(res, response);
}

const invalidAuthKey = (res, data, message)=>{
    let response = {
        message: responseConstants.responseMessages.INVALID_AUTH_KEY,
        status: responseConstants.responseStatus.SESSION_EXPIRED,
        data: data || {}
    };
    sendResponse(res, response);
}

const alreadyExists=(res, data)=>{
    let response = {
        message: responseConstants.responseMessages.ALREADY_EXISTS,
        status: responseConstants.responseStatus.CONFLICT,
        data: data || {}
    };
    sendResponse(res, response);
}

module.exports = {
    sendResponse,
    validationMissingParameterError,
    success,
    failure,
    invalidAuthKey,
    alreadyExists
}