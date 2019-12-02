const searchModel = require('../models/search');
const postModel = require('../models/post');
const commentModel = require('../models/comment')
const time = require('../public/js/dateconvert');


exports.getSearchResults = function (req, res) {
    let searchKeyword = req.query.searchKey;

    searchModel.getSearchResults(searchKeyword)
        .then(([posts, metadata]) => {

            for (let i = 0; i < posts.length; i++)
                posts[i].DATE_CREATED = time.convertTimestamp(posts[i].DATE_CREATED);

            res.render('searchResults', {posts: posts});
        })
        .catch((error) => {
            console.log(error);
        })

}


exports.getTopicResults = function (req, res) {
    console.log('query', req.query);
    let topic = req.query.topic;
    searchModel.getSearchResultsbyTopic(topic)
        .then(([posts, metadata]) => {
            for (let i = 0; i < posts.length; i++)
                posts[i].DATE_CREATED = time.convertTimestamp(posts[i].DATE_CREATED);
            res.render('searchResults', {posts: posts});
        })
        .catch((error) => {
            console.log(error);
        })

}