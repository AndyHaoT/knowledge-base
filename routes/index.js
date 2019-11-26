const express = require('express');
const LoginController = require('../controllers/LoginController');
const EditProfileController = require('../controllers/EditProfileController');
const SearchController = require('../controllers/SearchController');
const router = express.Router();

router.get('/', LoginController.root_get);

router.get('/login', LoginController.login_get);

router.post('/login', LoginController.login_post);

router.get('/logout', LoginController.logout_get);

router.get('/editProfile', EditProfileController.getProfiletoEdit);

router.post('/updateProfile', EditProfileController.updateProfile);

router.get('/search', SearchController.getSearchResults);

module.exports = router;
