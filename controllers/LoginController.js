const sessionModel = require('../models/session');
const userModel = require('../models/user');
const strVal = require('../values/string');
const profileModel = require('../models/editProfile');

exports.root_get = function (req, res) {
    sessionModel.getUser(req.sessionID)
        .then(([data, metadata]) => {
            if (data.length != 0) {
                res.redirect('/home');
            } else {
                res.redirect('/login');
            }
        });
}

exports.login_get = function (req, res) {
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

exports.login_post = function (req, res) {
    userModel.getUserId(req.body.email, req.body.password)
        .then(([data, metadata]) => {
            if (data.length != 0) {
                sessionModel.logUser(req.sessionID, data[0].user_id)
                    .then(() => {
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

exports.logout_get = function (req, res) {
    sessionModel.logoutUser(req.sessionID)
        .then(([data, metadata]) => {
            res.redirect('/login');
        });
}

exports.signup_post = function (req, res) {
    userModel.getUserIdFromEmail(req.body.email)
        .then(([data, metadata]) => {
            if (data.length == 0) {
                userModel.addUser(req.body.email, req.body.firstname, req.body.lastname, req.body.password)
                    .then(() => {
                        userModel.getUserIdFromEmail(req.body.email)
                            .then(([userData, userMetadata]) => {
                                sessionModel.logUser(req.sessionID, userData[0].user_id)
                                    .then(() => {
                                        res.render('signup', {
                                            error_msg: '',
                                            signupMsg: strVal.signUpMsg
                                        });
                                    });
                            });
                    });
            } else {
                res.render('login', {
                    error_msg: strVal.userExistMsg,
                    slogan: strVal.appSlogan
                });
            }
        });
}

exports.profile_update_post = function (req, res) {
    sessionModel.getUser(req.sessionID)
        .then(([data, metadata]) => {
            if (data.length != 0) {
                userModel.updateUser(data[0].data, req.body.imgUrl, req.body.bio, req.body.country, req.body.dob)
                    .then(() => {
                        res.redirect('/');
                    })
            } else {
                res.redirect('/login');
            }
        });
}