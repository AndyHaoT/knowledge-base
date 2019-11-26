const postModel = require('../models/post');
const profileModel = require('../models/user_profile');
const commentModel = require('../models/comment');
const time = require('../public/js/dateconvert');

exports.loadProfile = function(req, res) {
    let user_id = req.params.user_id;
    
    //TODO get logged in USER
    session_id = 4;
    profileModel.getProfile(user_id, session_id)
        .then(([data, metadata]) => {
            let profile = data;

            if (user_id == session_id)
                profile[0].HAS_LIKE = 1; //can't like yourself

            console.log(profile);
            postModel.getUserPosts(user_id)
                .then(([data, metadata]) => {                   
                    for (let i = 0; i < data.length; i++)
                        data[i].DATE_CREATED = time.convertTimestamp(data[i].DATE_CREATED);

                    res.render('user_profile', {profile: profile[0], posts: data});
                })
        })
        .catch((error) => {
            console.log(error);
        })
}

exports.likeUser = function(req, res) {
    //TODO get logged in USER
    let obj = {
        user_id: 4,
        user_liked_id: req.params.user_to_like
    };

    profileModel.likeUser(obj)
    .then(() => {
        res.redirect(req.get('referer'));
    })
    .catch((error) => {
        console.log(error)
    })
}

// exports.getComments = function(req, res) {
//     let post_id = req.params.post_id;
// }

