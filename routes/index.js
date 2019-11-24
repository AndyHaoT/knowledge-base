const express = require('express');
const LoginController = require('../controllers/LoginController');
const PostController = require('../controllers/PostController');
const UserProfileController = require('../controllers/UserProfileController');
const router = express.Router();

router.get('/', LoginController.root_get);

router.get('/login', LoginController.login_get);

router.post('/login', LoginController.login_post);

router.get('/logout', LoginController.logout_get);

router.get('/post/:post_id', PostController.getFullPost);

router.post('/post/add', PostController.addPost);

router.post('/post/:post_id/add', PostController.addComment);

router.get('/profile/:user_id', UserProfileController.loadProfile);

router.get('/profile/:user_to_like/like', UserProfileController.likeUser);


module.exports = router;