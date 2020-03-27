let express = require('express');
let router = express.Router();
let postController = require('../controllers/postController');

router.post('/posts/search', postController.searchPosts);

router.post('/reply', postController.replyToPost);

module.exports = router;