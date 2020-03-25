const express = require('express');
const messageController = require('../controllers/messageController');
const router = express.Router();

router.post('/message/create', messageController.startConvo);
router.get('/messages', messageController.getConvoList);

module.exports = router;