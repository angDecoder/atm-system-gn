'use strict';
const logging = require('../../../logging');
const constants = require('../../../responses/responseConstants');
const atmDao = require('../dao/atmDao');
const pwdServices = require('../../../services/pwdServices');

const addCard = async(apiReference,opts)=>{
  logging.log(apiReference,{ EVENT : "ADDING CARD ", VALUE : opts  });
  let response = { success : false };
  
  opts.atm_pin = pwdServices.encrypt(opts.atm_pin);
  const addCardResponse = await atmDao.addCard(apiReference,opts);
  logging.log(apiReference,{ EVENT : "ADDING CARD RESPONSE", VALUE : addCardResponse  });

  if( !addCardResponse.success )
    return addCardResponse;

  response.success = true;
  return response;
}

const depositMoney = async(apiReference,opts)=>{
  let response = { success : false };

  let cardDetails = await atmDao.fetchCardDetails(apiReference,opts);
  if( !cardDetails.success ){
    return cardDetails;
  }

  cardDetails = cardDetails.data;
  const match = pwdServices.compare(opts.atm_pin,cardDetails.atm_pin);
  if( !match ){
    response.error = constants.responseMessages.INVALID_CREDENTIALS;
    return response;
  }

  const depositResponse = await atmDao.updateBalance(apiReference,opts);
  if( !depositResponse.success )
    return depositResponse;

  response.success = true;
  response.data = "successfully added amount";
  return response;
}

const withdrawMoney = async(apiReference,opts)=>{

}

module.exports = {
  addCard,
  depositMoney,
  withdrawMoney
}