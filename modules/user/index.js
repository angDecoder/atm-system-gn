const { Router } = require('express');
const router = Router();
const userValidator = require('./validators/userValidator');
const userController = require('./controllers/userController');

router.post('/register',   userValidator.register,     userController.register);
router.post('/login',      userValidator.login,        userController.login);

module.exports = router;