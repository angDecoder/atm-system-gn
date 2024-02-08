const express = require('express');
const router = express.Router();
const app = express();

global.router = router;
global.app = app;

// app.use('/',(req,res)=>res.json('ok first'));
require('./middlewares')
require('./modules');
require('./startup').initializeServer();

