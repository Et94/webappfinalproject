const express = require('express');
const profileController = require('../controllers/profileController');
const router = express.Router();
const is_authenticated = require('../utils/is-auth');

router.get('/profile/:id', is_authenticated, profileController.getProfile);

router.post('/like', is_authenticated, profileController.like);

module.exports = router;