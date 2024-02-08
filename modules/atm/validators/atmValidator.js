'use strict';

const joi = require('joi');
const validators = require('../../../validators/joiValidators');
const constants = require('../../../responses/responseConstants');
const apiModule = constants.modules.ATM;

const addCard = async (req, res, next) => {
  req.apiReference = {
    module: apiModule,
    api: "add card"
  }

  console.log('here');
  let schema = joi.object({
    atm_pin: joi.string().required(),
    atm_card: joi.number().strict().max(88888888).min(11111111).required(),
  });

  const reqBody = { ...req.body };
  const request = { ...req };

  let validFields = await validators.validateFields(req.apiReference, request, reqBody, res, schema);
  if (validFields) {
    next();
  }
}

const depositMoney = async(req,res,next)=>{
  req.apiReference = {
    module: apiModule,
    api: "deposit"
  }

  let schema = joi.object({
    atm_pin: joi.string().required(),
    atm_card: joi.number().strict().max(88888888).min(11111111).required(),
    amount : joi.number().strict().min(100).required()
  });

  const reqBody = { ...req.body };
  const request = { ...req };

  let validFields = await validators.validateFields(req.apiReference, request, reqBody, res, schema);
  if (validFields) {
    next();
  }
}

const withdrawMoney = async(req,res,next)=>{
  req.apiReference = {
    module: apiModule,
    api: "withdraw"
  }

  let schema = joi.object({
    atm_id : joi.string().required(),
    atm_pin: joi.string().trim().required(),
    atm_card: joi.number().strict().max(88888888).min(11111111).required(),
    amount : joi.number().strict().min(100).required()
  });

  const reqBody = { ...req.body };
  const request = { ...req };

  let validFields = await validators.validateFields(req.apiReference, request, reqBody, res, schema);
  if (validFields) {
    next();
  }
}

module.exports = {
  addCard,
  depositMoney,
  withdrawMoney
}