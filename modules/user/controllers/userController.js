'use strict';
const logging = require('../../../logging');
const responses = require('../../../responses/responses');
const constants = require('../../../responses/responseConstants');
const userServices = require('../services/userServices');

const register = async (req, res) => {
  const apiReference = req.apiReference;
  const reqBody = { ...req.body };


  try {
    const response = await userServices.register(apiReference, reqBody);
    logging.log(apiReference, { serviceResponse: response });


    if (response.success) {
      return responses.success(res, response.data, constants.responseMessages.REGISTER_SUCCESS);
    }
    return responses.failure(res, {}, response.error);
  }
  catch (error) {
    logging.logError(error);
    return responses.failure(res, error);
  }
}

const login = async (req, res) => {
  const apiReference = req.apiReference;
  const reqBody = { ...req.body };

  try {
    const response = await userServices.login(apiReference, reqBody);
    logging.log(apiReference, { finalResponse: response });

    if (response.success) {
      return responses.success(res, response.data);
    }

    return responses.failure(res, response.data || {}, response.error);
  }
  catch (error) {
    return responses.failure(res, error);
  }
}

module.exports = {
  register,
  login
}