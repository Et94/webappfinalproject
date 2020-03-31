const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const is_authenticated = require('../utils/is-auth');

router.get('/posts/searchTopic', postController.getPostsByTopic);

router.get('/posts/search', postController.getPostsBySubject);

router.post('/reply', postController.replyToPost);

router.post('/post', is_authenticated, postController.createPost);

router.get('/posts/home', postController.getPostsById);

module.exports = router;