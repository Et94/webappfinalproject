const express = require('express');
const messageController = require('../controllers/messageController');
const router = express.Router();

router.post('/message/create', messageController.startConvo);
router.get('/conversations', messageController.getConvoList);
// router.post('/conversations/messages', messageController.getMsgList);

module.exports = router;