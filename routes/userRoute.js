const express = require('express');
const router =express.Router();
const userController = require('../controllers/userController');


router.get('/profile/edit', userController.editView);
router.post('/profile/submit', userController.editProfile);

module.exports = router;