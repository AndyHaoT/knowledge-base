const postModel = require('../models/post');

/*
Pass to another controller
*/
exports.getPosts = function(req, res) {
    let num_to_get = -1;
    if (req.body.to_get)
        num_to_get = req.body.to_get;

    postModel.getPosts(num_to_get)
        .then(([data, metadata]) => {
            return data;
        })
        .catch(console.log(error));
}

/*
Returns posts for a user
To be used by other controllers
*/
exports.getUserPosts = function(req,res) {
    let user_id = req.body.user_id;
    let num_to_get = -1;
    if (req.body.to_get)
        num_to_get = req.body.to_get;

    postModel.getUserPosts(user_id, num_to_get)
        .then(([data, metadata]) => {
            return data;
        })
        .catch(console.log(error));
}

exports.addPost = function(req,res) {
    let post = {
        user_id: req.body.user_id,
        subject: req.body.subject,
        content: req.body.content,
        topic: req.body.topic,
        time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    }

    postModel.add(post)
    .then(function() {
        res.redirect('home', { error_msg: '' }); //redirect back to home page
    });
}
