let express = require('express');
let router = express.Router();
let postController = require('../controllers/postController');

router.post('/reply', postController.postReply);

router.get('/home/post/replies', postController.getRepliesHome)

module.exports = router;