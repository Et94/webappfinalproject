const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const is_authenticated = require('../utils/is-auth');

router.post('/login', loginController.login);

router.post('/signup', loginController.signup);

router.post('/register', loginController.register);

router.post('/logout', loginController.logout);

module.exports = router;