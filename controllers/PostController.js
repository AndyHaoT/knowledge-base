const postModel = require('../models/post');
const commentModel = require('../models/comment')
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
    //need to add logic to get current user
    post_id = req.params.post_id;
    user_id = 1;
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


exports.addPost = function(req,res) {

    //logic for user id
    let post = {
        user_id: 2,
        subject: req.body.subject,
        content: req.body.content,
        topic: req.body.topic,
    }
    console.log(post)

    postModel.add(post)
    .then(function() {
        res.redirect(req.get('referer')); //redirect back to home page
    });
}
