'use strict';

const joi = require('joi');
const validators = require('../../../validators/joiValidators');
const constants=require('../../../responses/responseConstants');

const register = async(req,res,next)=>{
    req.apiReference = {
        module : constants.modules.USER,
        api : 'register',
    }

    let schema = joi.object({
        email : joi.string().email().required(),
        password : joi.string().required()
    });

    const reqBody = {...req.body};
    const request = {...req};

    let validFields = await validators.validateFields(req.apiReference, request, reqBody, res, schema);
    if(validFields){
        next();
    }
}

const login = async(req,res,next)=>{
    req.apiReference = {
        module : constants.modules.USER,
        api : 'login'
    }

    let schema = joi.object({
        email : joi.string().email().required(),
        password : joi.string().required()
    });

    const reqBody = {...req.body};
    const request = {...req};

    let validFields = await validators.validateFields(req.apiReference, request, reqBody, res, schema);
    if(validFields){
        next();
    }
}

module.exports = {
    register,
    login
}
