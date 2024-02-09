'use strict';
const logging = require('../../../logging');
const responses = require('../../../responses/responses');
const constants = require('../../../responses/responseConstants');
const atmServices = require('../services/atmService');

const addCard = async (req, res) => {
  const apiReference = req.apiReference;
  const reqBody = { ...req.body };

  try {
    const response = await atmServices.addCard(apiReference, reqBody);
    logging.log(apiReference, { serviceResponse: response });


    if (response.success) {
      return responses.success(res, response.data, constants.responseMessages.SUCCESS);
    }
    return responses.failure(res, {}, response.error);
  }
  catch (error) {
    // logging.logError(a);
    return responses.failure(res,{}, error);
  }
}

const withdrawMoney = async(req,res)=>{
  const apiReference = req.apiReference;
  const reqBody = { ...req.body };


  try {
    const response = await atmServices.withdrawMoney(apiReference, reqBody);
    logging.log(apiReference, { serviceResponse: response });


    if (response.success) {
      return responses.success(res, response.data, constants.responseMessages.SUCCESS);
    }
    return responses.failure(res, {}, response.error);
  }
  catch (error) {
    logging.logError(error);
    return responses.failure(res,{}, error);
  }
}

const depositMoney = async(req,res)=>{
  const apiReference = req.apiReference;
  const reqBody = { ...req.body };


  try {
    const response = await atmServices.depositMoney(apiReference, reqBody);
    logging.log(apiReference, { serviceResponse: response });


    if (response.success) {
      return responses.success(res, response.data, constants.responseMessages.SUCCESS);
    }
    return responses.failure(res, {}, response.error);
  }
  catch (error) {
    logging.logError(error);
    return responses.failure(res,{}, error);
  }
}
const getBalance = async(req,res)=>{
  const apiReference = req.apiReference;
  const reqBody = { ...req.body };


  try {
    const response = await atmServices.getBalance(apiReference, reqBody);
    logging.log(apiReference, { serviceResponse: response });


    if (response.success) {
      return responses.success(res, response.data, constants.responseMessages.SUCCESS);
    }
    return responses.failure(res, {}, response.error);
  }
  catch (error) {
    logging.logError(error);
    return responses.failure(res,{}, error);
  }
}


module.exports = {
  addCard,
  depositMoney,
  withdrawMoney,
  getBalance
}