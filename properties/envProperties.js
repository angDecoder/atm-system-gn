'use strict';
require('dotenv').config();

const APP_PORT = process.env.APP_PORT;
const TOKEN_SECRET =  process.env.TOKEN_SECRET;

module.exports = {
    APP_PORT,
    TOKEN_SECRET
}