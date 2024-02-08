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

  let schema = joi.object({
    atm_pin: joi.number().strict().required(),
    atm_card: joi.number().strict().required(),
  });

  const reqBody = { ...req.body };
  const request = { ...req };

  let validFields = await validators.validateFields(req.apiReference, request, reqBody, res, schema);
  if (validFields) {
    next();
  }
}


module.exports = {
  addCard
}