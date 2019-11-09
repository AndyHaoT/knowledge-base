const express = require('express');
const LoginController = require('../controllers/LoginController');
const PostController = require('../controllers/PostController');
const router = express.Router();

router.get('/', LoginController.root_get);

router.get('/login', LoginController.login_get);

router.post('/login', LoginController.login_post);

router.get('/logout', LoginController.logout_get);

router.post('/post', PostController.addPost);

module.exports = router;