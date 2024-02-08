'use strict';
const serverLib = require('../services/serverServices');
const database = require('../database');

const apiReferenceModule = 'startup';

async function initializeServer(){
    // server initialisation
    const apiReference = {
        module : apiReferenceModule,
        api : 'initialize',
    }
    const server = serverLib.startAppServer(apiReference);

    // database initialisation
    await database.initialze(apiReference);
    
};

module.exports = {
    initializeServer
};