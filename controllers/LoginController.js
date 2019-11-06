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
    sessionModel.createSessionTable();
    userModel.createUserTable();
    res.render('login', {
        error_msg: '',
        slogan: strVal.appSlogan
    });
}

exports.login_post = function(req, res) {
    userModel.getUserId(req.body.username, req.body.password)
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