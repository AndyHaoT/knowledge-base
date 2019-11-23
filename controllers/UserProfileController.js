const postModel = require('../models/post');
const profileModel = require('../models/user_profile');
const commentModel = require('../models/comment');
const time = require('../public/js/dateconvert');

exports.loadProfile = function(req, res) {
    let user_id = req.params.user_id;
    
    profileModel.getProfile(user_id)
        .then(([data, metadata]) => {
            let profile = data;
            
            postModel.getUserPosts(user_id)
                .then(([data, metadata]) => {
                    //console.log(profile[0])
                    
                    for (let i = 0; i < data.length; i++)
                        data[i].DATE_CREATED = time.convertTimestamp(data[i].DATE_CREATED);

                    res.render('user_profile', {profile: profile[0], posts: data});
                })
        })
        .catch((error) => {
            console.log(error);
        })
}

// exports.getComments = function(req, res) {
//     let post_id = req.params.post_id;
// }

