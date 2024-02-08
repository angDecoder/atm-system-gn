'use strict';
const { Router } = require('express');
const router = Router();
const atmValidators = require('./validators/atmValidator');
const authValidators = require('../../validators/authValidators')
const atmControllers = require('./controllers/atmController');

router.post('/card/add', atmValidators.addCard,authValidators.authenticateUser, atmControllers.addCard);
router.post('/withdraw',atmValidators.withdrawMoney,atmControllers.withdrawMoney);
router.post('/deposit',atmValidators.depositMoney,atmControllers.depositMoney);

module.exports = router;