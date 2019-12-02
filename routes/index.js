const express = require('express');
const LoginController = require('../controllers/LoginController');
const EditProfileController = require('../controllers/EditProfileController');
const SearchController = require('../controllers/SearchController');
const PostController = require('../controllers/PostController');
const UserProfileController = require('../controllers/UserProfileController');
const HomePageController = require('../controllers/HomePageController');
const ThreadController = require('../controllers/ThreadController');
const ConversationController = require('../controllers/ConversationController');
const router = express.Router();

router.get('/', LoginController.root_get);

router.get('/login', LoginController.login_get);

router.post('/login', LoginController.login_post);

router.get('/logout', LoginController.logout_get);

router.post('/signup', LoginController.signup_post);

router.post('/profile/update', LoginController.profile_update_post);

router.get('/editProfile', EditProfileController.getProfiletoEdit);

router.post('/updateProfile', EditProfileController.updateProfile);

router.get('/search', SearchController.getSearchResults);

router.get('/searchByTopic', SearchController.getTopicResults);

router.get('/post/:post_id', PostController.getFullPost);

router.post('/post/add', PostController.addPost);

router.post('/post/:post_id/add', PostController.addComment);

router.get('/profile/:user_id', UserProfileController.loadProfile);

router.get('/profile/:user_to_like/like', UserProfileController.likeUser);

router.get('/thread/:receiver_id', ThreadController.newThread);

router.post('/thread/post/:receiver_id', ThreadController.createThread);

router.get('/conversation', ConversationController.getConversations);

router.get('/conversation/:thread_id', ConversationController.getConversation);

router.post('/conversation/:thread_id/post/:receiver_id', ConversationController.writeMessage);

router.get('/home', HomePageController.getHomePage);

router.get('/home/getPosts', HomePageController.getUserPosts);

router.get('/home/:offset', HomePageController.getNextPosts);

module.exports = router;
