'use strict';

const moment = require('moment');

const fileSwitches = {
    startup : true,
    todo    : true,
    register: true,
    login   : true,
    atm : true,
    user: true
};

const modules = {
    startup : {
        initialize : true
    },
    todo : {
        getList     : true,
        createItem  : true,
        updateItem  : true,
        deleteItem  : true
    },
    register: {
        register    : true
    },
    login: {
        login       : true
    },
    user : {
        login : true,
        register : true,
    },
    atm : {
        addCard : true
    }
}

const log = (apiReference, log) =>{

    if(apiReference && apiReference.module && apiReference.api && fileSwitches && fileSwitches[apiReference.module] == true 
        && modules && modules[apiReference.module] && modules[apiReference.module][apiReference.api] == true){

        try{
            log = JSON.stringify(log);
        }
        catch(exception){
            console.error('>>>>> EXCEPTION <<<<', exception);
        }
        console.log("-->" + moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS') + " :----: " +
        apiReference.module + " :=: " + apiReference.api + " :=: " + log);
    }
}

const logError = (apiReference, log) => {
  if (apiReference
    && apiReference.module
    && apiReference.api) {

    try {
      log = JSON.stringify(log);
    }
    catch (exception) {
    }
    console.error("-->" + moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS') + " :----: " +
      apiReference.module + " :=: " + apiReference.api + " :=: " + log);
  }
};


module.exports = {
    log,
    logError
}