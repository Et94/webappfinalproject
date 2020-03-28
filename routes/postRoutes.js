const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const is_authenticated = require('../utils/is-auth');

router.get('/posts/search', postController.searchPosts);

router.post('/reply', postController.replyToPost);

module.exports = router;