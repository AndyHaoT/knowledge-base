const postModel = require('../models/post');
const commentModel = require('../models/comment');
const sessionModel = require('../models/session')
const time = require('../public/js/dateconvert');

/*
How to make this error safe?
*/
exports.getFullPost = function(req,res) {
    post_id = req.params.post_id;

    postModel.getPost(post_id)
        .then(([data, metadata]) => {
            post = data;

            post[0].DATE_CREATED = time.convertTimestamp(post[0].DATE_CREATED);

            commentModel.getComments(post_id)
                .then(([data, metadata]) => {

                    res.render('full_post', {post: post, comments: data});
                })
        })
        .catch((error) => {
            console.log(error);
        })
}

exports.addComment = function(req,res) {
    sessionModel.getUser(req.sessionID)
    .then(([data, metadata]) => {
        if (data.length > 0)
        {
            post_id = req.params.post_id;
            user_id = data[0].data;
            comment = {
                post_id: post_id,
                user_id: user_id,
                post_comment_content: req.body.content
            }
            console.log(comment)
        
            commentModel.add(comment)
                .then(([data, metadata]) => {
                    console.log(data)
                    res.redirect(req.get('referer'));
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    })
}


exports.addPost = function(req,res) {
    sessionModel.getUser(req.sessionID)
    .then(([data, metadata]) => {
        if (data.length > 0)
        {
            console.log(data[0].data)
            let post = {
                user_id: data[0].data,
                subject: req.body.subject,
                content: req.body.content,
                topic: req.body.topic,
            }
            postModel.add(post)
            .then(function() {
                res.redirect(req.get('referer')); //redirect back to home page
            });
        }
    })

}
