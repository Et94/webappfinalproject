const express = require('express');
let app = express();
const profileController = require('../controllers/postController');
const router = express.Router();
let path = require('path');

router.get('/posts/:page', profileController.getAllPosts);

module.exports = router;