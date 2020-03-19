const express = require('express');
let app = express();
const userController = require('../controllers/userController');
const router = express.Router();
let path = require('path');

router.get('/profile/:id', userController.getProfile);

module.exports = router;