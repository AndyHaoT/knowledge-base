const express = require('express');
const LoginController = require('../controllers/LoginController');
const router = express.Router();

router.get('/', LoginController.root_get);

router.get('/login', LoginController.login_get);

router.post('/login', LoginController.login_post);

router.get('/logout', LoginController.logout_get);

router.post('/signup', LoginController.signup_post);

router.post('/profile/update', LoginController.profile_update_post);

module.exports = router;