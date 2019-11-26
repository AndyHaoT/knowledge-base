const searchModel = require('../models/search');
const postModel = require('../models/post');
const commentModel = require('../models/comment')


exports.getSearchResults = function (req, res) {
    let searchKeyword = req.query.searchKey;

    searchModel.getSearchResults(searchKeyword)
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