const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const is_authenticated = require('../utils/is-auth');

router.post('/post', is_authenticated, postController.createPost);

module.exports = router;