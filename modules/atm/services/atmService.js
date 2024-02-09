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

const getMinNotes = (atmDetails,amount)=>{
  let response = { success : false };
  let arr = [2000,500,200,100];
  let totalMoney = arr.reduce((prev,curr)=>{
    return prev + atmDetails[curr]*curr;
  },0);

  if( totalMoney<amount ){
    response.error = constants.responseMessages.ATM_INSUFFICIENT_BALANCE;
    return response;
  }

  if( amount%100!==0 ){
    response.error = constants.responseMessages.ATM_NOTES_UNAVALABLE;
    return response;
  }

  let newArr = arr.map(num=>num/100);
  let newAmt = amount/100;
  let initObj = {
    20 : 0, 
    5 : 0,
    2 : 0,
    1 : 0,
    notes : 100000000
  };
  
  let dp = Array(newAmt+1);
  for( let i=0; i<=newAmt; i++ )
    dp[i] = {...initObj};

  dp[0].notes = 0;

  for( let i=0; i<newArr.length; i++ ){
    let currElem = newArr[i], origElem = arr[i];
    let count = Math.floor( newAmt/currElem );
    count = Math.min(count,atmDetails[origElem]);

    for( let j=0; j<count; j++ ){
      for( let k=newAmt; k>=0; k-- ){
        if( dp[k].notes!=-1 && k+currElem<=newAmt && dp[k].notes+1<dp[k+currElem].notes ){
          dp[k+currElem] = {...dp[k]};
          dp[k+currElem][currElem]++;
          dp[k+currElem].notes++;
        }
      }

      if( dp[newAmt].notes!==100000000 )
        break;
    }
  }

  if( dp[newAmt].notes===100000000 ){
    response.error = constants.responseMessages.ATM_NOTES_UNAVALABLE;
    return response;
  }

  dp = dp[newAmt];
  response.success = true;
  response.data = {
    2000 : dp[20],
    500 : dp[5],
    200 : dp[2],
    100 : dp[1]
  }

  return response;
}

const withdrawMoney = async(apiReference,opts)=>{
  let response = { success : false };

  let cardDetails = await atmDao.fetchCardDetails(apiReference,opts);
  if( !cardDetails.success ){
    return cardDetails;
  }
  logging.log(apiReference,{ EVENT : "CARD DETAILS RESPONSE", VALUE : cardDetails });

  cardDetails = cardDetails.data;
  const match = pwdServices.compare(opts.atm_pin,cardDetails.atm_pin);
  if( !match ){
    response.error = constants.responseMessages.INVALID_CREDENTIALS;
    return response;
  }


  if( opts.amount>cardDetails.balance ){
    response.error = constants.responseMessages.INSUFFICIENT_BALANCE;
    return response;
  }

  let atmDetails = await atmDao.fetchAtmDetails(apiReference,opts);
  if( !atmDetails.success ){
    response.error = atmDetails.error;
    return response;
  }
  atmDetails = atmDetails.data;
  const dispenser = getMinNotes(atmDetails,opts.amount);
  if( !dispenser.success )
    return dispenser;

  const dispensResponse = await atmDao.dispenseMoney(apiReference,dispenser.data);
  if( !dispensResponse.success ){
    response.error = dispensResponse.error;
    return response;
  }

  const withdrawResponse = await atmDao.updateBalance(apiReference,{...opts, amount : -1 * opts.amount });
  if( !withdrawResponse.success ){
    response.error = withdrawResponse.error;
    return response;
  }

  response.success = true;
  response.data = {
    notes : dispenser.data,
  }
  return response;
}

const getBalance = async(apiReference,opts)=>{
  
  let response = { success : false };
  logging.log(apiReference,{ EVENT : "FETCHING BALANCE", VALUE : opts });

  let cardDetails = await atmDao.fetchCardDetails(apiReference,opts);
  if( !cardDetails.success ){
    return cardDetails;
  }
  logging.log(apiReference,{ EVENT : "CARD DETAILS RESPONSE", VALUE : cardDetails });

  cardDetails = cardDetails.data;
  const match = pwdServices.compare(opts.atm_pin,cardDetails.atm_pin);
  if( !match ){
    response.error = constants.responseMessages.INVALID_CREDENTIALS;
    return response;
  }

  response.success = true;
  response.data = {
    balance : cardDetails.balance
  }

  return response;
}

module.exports = {
  addCard,
  depositMoney,
  withdrawMoney,
  getBalance
}