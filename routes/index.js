const express = require('express');
const LoginController = require('../controllers/LoginController');
const ThreadController = require('../controllers/ThreadController');
const ConversationController = require('../controllers/ConversationController');
const router = express.Router();

// router.get('/', LoginController.root_get);
router.get('/', function (req,res) {
    res.render('conversations', { pageTitle: 'Conversations Page' });
    console.log(req.sessionID)
    // res.render('message', { pageTitle: 'Message Page'});//
  });

router.get('/login', LoginController.login_get);

router.post('/login', LoginController.login_post);

router.get('/logout', LoginController.logout_get);

router.get('/thread/:receiver_id', ThreadController.newThread); // Wait for User-Profile Click "Message" to pass in user id
router.post('/thread/post/:receiver_id', ThreadController.createThread);

router.get('/conversation', ConversationController.getConversations);
router.get('/conversation/:thread_id', ConversationController.getConversation);
router.post('/conversation/:thread_id/post/:receiver_id/message/:message', ConversationController.writeMessage);

module.exports = router;