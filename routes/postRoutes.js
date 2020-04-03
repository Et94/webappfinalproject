const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const is_authenticated = require('../utils/is-auth');

router.get('/posts/searchTopic', is_authenticated, postController.getPostsByTopic);

router.get('/posts/search', is_authenticated, postController.getPostsBySubject);

router.post('/reply', is_authenticated, postController.replyToPost);

router.post('/post', is_authenticated, postController.createPost);

router.get('/posts/all', postController.getAllPosts);

module.exports = router;

module.exports = router;