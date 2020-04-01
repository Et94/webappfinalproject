const express = require('express');
const router =express.Router();
const userController = require('../controllers/userController');
const is_authenticated = require('../utils/is-auth');


router.get('/profile/edit', is_authenticated, userController.editView);
router.get('/profile', is_authenticated, userController.renderHome);
router.post('/profile/submit', is_authenticated, userController.editProfile);

module.exports = router;