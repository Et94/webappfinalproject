let express = require('express');
let router = express.Router();
let postController = require('../controllers/postController');

router.get('/posts/search', postController.searchPosts);

router.post('/reply', postController.replyToPost);

module.exports = router;