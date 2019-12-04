const postModel = require('../models/post');
const profileModel = require('../models/user_profile');
const commentModel = require('../models/comment');
const time = require('../public/js/dateconvert');
const sessionModel = require('../models/session');

exports.loadProfile = function (req, res) {
    sessionModel.getUser(req.sessionID)
        .then(([data, metadata]) => {
            if (data.length > 0) {
                let user_id = req.params.user_id;
                logged_in_user_id = data[0].data;
                profileModel.getProfile(user_id, logged_in_user_id)
                    .then(([data, metadata]) => {
                        let profile = data;

                        if (user_id == logged_in_user_id)
                            profile[0].has_like = 1; //can't like yourself

                        postModel.getPosts(0, 0, user_id)
                            .then(([data, metadata]) => {
                                for (let i = 0; i < data.length; i++)
                                    data[i].date_created = time.convertTimestamp(data[i].date_created);

                                res.render('user_profile', { profile: profile[0], posts: data });
                            })
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            else {
                res.redirect('/login');
            }
        });
}

exports.likeUser = function (req, res) {
    sessionModel.getUser(req.sessionID)
        .then(([data, metadata]) => {
            if (data.length > 0) {
                let obj = {
                    user_id: data[0].data,
                    user_liked_id: req.params.user_to_like
                };

                profileModel.likeUser(obj)
                    .then(() => {
                        res.redirect(req.get('referer'));
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }
            else {
                res.redirect('/login');
            }
        });
}

// exports.getComments = function(req, res) {
//     let post_id = req.params.post_id;
// }

