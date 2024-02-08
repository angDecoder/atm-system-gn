'use strict';
const envProperties = require('../properties/envProperties');
const logging = require('../logging');

function startAppServer (apiReference){
    const APP_PORT = envProperties.APP_PORT;

    app.listen(APP_PORT,()=>{
        logging.log(apiReference,`server running on port ${APP_PORT}`);
    });

}


module.exports = {
    startAppServer
};