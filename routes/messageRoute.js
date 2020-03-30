const express = require('express');
const messageController = require('../controllers/messageController');
const router = express.Router();
const is_authenticated = require('../utils/is-auth');

router.get('/messages', is_authenticated, messageController.sendMessage);
router.post('/message/create', messageController.startConvo);

router.get('/conversations', messageController.getMsgList);

module.exports = router;