'use strict';
const { Router } = require('express');
const router = Router();
const atmValidators = require('./validators/atmValidator');
const authValidators = require('../../validators/authValidators')

router.post('/card/add', atmValidators.addCard, authValidators.authenticateUser,);

module.exports = router;