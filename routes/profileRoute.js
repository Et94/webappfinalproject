const express = require('express');
let app = express();
const profileController = require('../controllers/profileController');
const router = express.Router();
let path = require('path');

router.get('/profile/:id', profileController.getProfile);

module.exports = router;