'use strict';

const bodyParser=require('body-parser');

const underscore = require('underscore');
global._ = underscore;

const morgan = require('morgan');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());