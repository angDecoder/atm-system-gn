'use strict';

const logging = require('../../../logging');
const mysqlib = require('../../../database/mysqllib');
const executeQuery = mysqlib.executeQuery;
const constants = require('../../../responses/responseConstants');


const addCard = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "ADDING CARD DETAILS", VALUES: opts });

  const queryString = `update customer
                      set atm_card = ?
                      ,atm_pin = ?
                      where email = ? 
                      and atm_card is null`;
  const val = [opts.atm_card, opts.atm_pin, opts.email];
  const addCardResponse = await executeQuery(
    apiReference,
    "ADDING CARD DETAILS",
    queryString,
    val
  );

  logging.log(apiReference, { EVENT: "ADDING CARD RESPONSE", VALUE: addCardResponse });

  if (addCardResponse.ERROR) {
    response.error = addCardResponse.ERROR;
    return response;
  }

  response.success = true;
  return response;
}

const fetchCardDetails = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "FETCHING CARD DETAILS", VALUE: opts });

  const queryString = `select atm_pin,balance
                        from customer
                        where atm_card = ?`;
  const val = [opts.atm_card];

  const fetchCardResponse = await executeQuery(
    apiReference,
    "FETCHING CARD DETAILS",
    queryString,
    val
  );

  logging.log(apiReference, { EVENT: "FETCHING CARD RESPONSE", VALUE: fetchCardResponse });

  if (fetchCardResponse.ERROR) {
    response.error = fetchCardResponse.ERROR;
    return response;
  }

  if (fetchCardResponse[0].length === 0) {
    response.error = constants.responseMessages.USER_NOT_FOUND;
    return response;
  }

  response.success = true;
  response.data = fetchCardResponse[0][0];
  return response;
}

const updateBalance = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "UPDATING BALANCE", VALUE: opts });

  const queryString = `update customer
                      set balance = balance + ?
                      where atm_card = ?`;
  const val = [opts.amount, opts.atm_card];

  const balanceResponse = await executeQuery(
    apiReference,
    "UPDATING BALANCE",
    queryString,
    val
  );
  logging.log(apiReference, { EVENT: "UPDATING BALANCE RESPONSE", VALUE: balanceResponse });

  if (balanceResponse.ERROR) {
    response.error = balanceResponse.ERROR;
    return response;
  }

  response.success = true;
  return response;
}

const fetchAtmDetails = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "FETCHING ATM DETAILS", VALUE: opts });

  const queryString = `select * from atm
                      where id = ?`;
  const val = [opts.atm_id];

  let atmResponse = await executeQuery(
    apiReference,
    "FETCH ATM DETAILS",
    queryString,
    val
  );

  logging.log(apiReference, { EVENT: "ATM DETAILS RESPONSE", VALUE: atmResponse });

  if (atmResponse.ERROR) {
    response.error = atmResponse.ERROR;
    return response;
  }

  atmResponse = atmResponse[0][0];
  response.success = true;
  response.data = {
    200: atmResponse.bal_200,
    100: atmResponse.bal_100,
    500: atmResponse.bal_500,
    2000: atmResponse.bal_2000,
  }

  return response;
}

const dispenseMoney = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "DISPENSE MONEY", VALUE: opts });

  const queryString = `update atm
                        set bal_2000 = bal_2000 - ?,
                        bal_500 = bal_500 - ?,
                        bal_200 = bal_200 - ?,
                        bal_100 = bal_100 - ?`;
  const val = [opts[2000],opts[500],opts[200],opts[100]];

  const dispenseResponse = await executeQuery(
    apiReference,
    "DISPENSE MONEY",
    queryString,
    val
  );
  logging.log(apiReference, { EVENT: "DISPENSE MONEY RESPONSE", VALUE: dispenseResponse });

  if( dispenseResponse.ERROR ){
    response.error = dispenseResponse.ERROR;
    return response;
  }

  response.success = true;
  return response;
}

module.exports = {
  addCard,
  fetchCardDetails,
  updateBalance,
  fetchAtmDetails,
  dispenseMoney
}