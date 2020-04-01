const express = require('express');
const messageController = require('../controllers/messageController');
const router = express.Router();
const is_authenticated = require('../utils/is-auth');

router.get('/messages', is_authenticated, messageController.sendMessageView);
router.post('/message/create', messageController.startConvo);

router.get('/conversations', is_authenticated, messageController.getConversations);
router.post('/conversations/send', messageController.sendMessage);

module.exports = router;