'use strict';

const logging = require('../../../logging');
const mysqlib = require('../../../database/mysqllib');
const executeQuery = mysqlib.executeQuery;
const constants = require('../../../responses/responseConstants');


const addCard = async(apiReference,opts)=>{
  let response = { success : false };
  logging.log(apiReference,{ EVENT : "ADDING CARD DETAILS",VALUES : opts });

  const queryString = `update customer
                      set atm_card = ?
                      ,atm_pin = ?
                      where email = ? 
                      and atm_card is null`;
  const val = [opts.atm_card,opts.atm_pin,opts.email];
  const addCardResponse = await executeQuery(
    apiReference,
    "ADDING CARD DETAILS",
    queryString,
    val
  );

  logging.log(apiReference,{ EVENT : "ADDING CARD RESPONSE", VALUE : addCardResponse });

  if( addCardResponse.ERROR ){
    response.error = addCardResponse.ERROR;
    return response;
  }

  response.success = true;
  return response;
}

const fetchCardDetails = async(apiReference,opts)=>{
  let response = { success : false };
  logging.log(apiReference,{ EVENT : "FETCHING CARD DETAILS", VALUE : opts });
  
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

  logging.log(apiReference,{ EVENT : "FETCHING CARD RESPONSE", VALUE : fetchCardResponse });

  if( fetchCardResponse.ERROR ){
    response.error = fetchCardResponse.ERROR;
    return response;
  }

  if( fetchCardResponse[0].length===0 ){
    response.error = constants.responseMessages.USER_NOT_FOUND;
    return response;
  }

  response.success = true;
  response.data = fetchCardResponse[0][0];
  return response;
}

const updateBalance = async(apiReference,opts)=>{
  let response = { success : false };
  logging.log(apiReference,{ EVENT : "UPDATING BALANCE", VALUE : opts });
  
  const queryString = `update customer
                      set balance = balance + ?
                      where atm_card = ?`;
  const val = [opts.amount,opts.atm_card];
  
  const balanceResponse = await executeQuery(
    apiReference,
    "UPDATING BALANCE",
    queryString,
    val
    );
  logging.log(apiReference,{ EVENT : "UPDATING BALANCE RESPONSE", VALUE : balanceResponse });

  if( balanceResponse.ERROR ){
    response.error = balanceResponse.ERROR;
    return response;
  }

  response.success = true;
  return response;
}

module.exports = {
  addCard,
  fetchCardDetails,
  updateBalance
}