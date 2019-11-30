const express = require('express');
const LoginController = require('../controllers/LoginController');
const EditProfileController = require('../controllers/EditProfileController');
const SearchController = require('../controllers/SearchController');
const PostController = require('../controllers/PostController');
const UserProfileController = require('../controllers/UserProfileController');
const HomePageController = require('../controllers/HomePageController');
const router = express.Router();

router.get('/', LoginController.root_get);

router.get('/login', LoginController.login_get);

router.post('/login', LoginController.login_post);

router.get('/logout', LoginController.logout_get);

router.get('/editProfile', EditProfileController.getProfiletoEdit);

router.post('/updateProfile', EditProfileController.updateProfile);

router.get('/search', SearchController.getSearchResults);

router.get('/post/:post_id', PostController.getFullPost);

router.post('/post/add', PostController.addPost);

router.post('/post/:post_id/add', PostController.addComment);

router.get('/profile/:user_id', UserProfileController.loadProfile);

router.get('/profile/:user_to_like/like', UserProfileController.likeUser);

router.get('/home', HomePageController.getHomePage);


module.exports = router;
