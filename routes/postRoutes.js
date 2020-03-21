let express = require('express');
let router = express.Router();
let postController = require('../controllers/postController');

router.post('/home/reply', postController.postReply)

module.exports = router;