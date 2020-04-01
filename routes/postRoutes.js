const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const is_authenticated = require('../utils/is-auth');

router.get('/posts/searchTopic', postController.getPostsByTopic);

router.get('/posts/search', postController.getPostsBySubject);

router.post('/reply', postController.replyToPost);

router.get('/posts/:page', postController.getAllPosts);

module.exports = router;

module.exports = router;