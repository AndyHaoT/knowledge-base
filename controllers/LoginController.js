const sessionModel = require('../models/session');
const userModel = require('../models/user');
const strVal = require('../values/string');

exports.root_get = function(req, res) {
    sessionModel.createSessionTable()
    .then(function() {
        sessionModel.getUser(req.sessionID)
        .then(([data, metadata]) => {
            if (data.length != 0) {
                res.render('index');
            } else {
                res.redirect('/login');
            }
        });
    });
}

exports.login_get = function(req, res) {
    // sessionModel.createSessionTable();
    // userModel.createUserTable();
    sessionModel.getUser(req.sessionID)
    .then(([data, metadata]) => {
        if (data.length != 0) {
            res.redirect('/');
        } else {
            res.render('login', {
                error_msg: '',
                slogan: strVal.appSlogan
            });
        }
    });
}

exports.login_post = function(req, res) {
    userModel.getUserId(req.body.email, req.body.password)
    .then(([data, metadata]) => {
        if (data.length != 0) {
            sessionModel.logUser(req.sessionID, data[0].user_id)
            .then(function() {
                res.redirect('/');
            });
        } else {
            res.render('login', { 
                error_msg: strVal.loginFailMsg,
                slogan: strVal.appSlogan
            });
        }
    });
}

exports.logout_get = function(req, res) {
    sessionModel.logoutUser(req.sessionID);
    res.redirect('/login');
}

exports.signup_post = function(req, res) {
    userModel.findUserEmail(req.body.email)
    .then(([data, metadata]) => {
        if (data.length == 0) {
            userModel.addUser(req.body.email, req.body.firstname, req.body.lastname, req.body.password)
            .then(function() {
                res.render('signup', {
                    error_msg: '',
                    signupMsg: strVal.signUpMsg
                })
            })
        } else {
            res.render('login', { 
                error_msg: strVal.userExistMsg,
                slogan: strVal.appSlogan
            });
        }
    });
}