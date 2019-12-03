const searchModel = require('../models/search');
const postModel = require('../models/post');
const commentModel = require('../models/comment')
const time = require('../public/js/dateconvert');
const sessionModel = require('../models/session');

exports.getSearchResults = function (req, res) {
    sessionModel.getUser(req.sessionID)
        .then(([data, metadata]) => {
            if (data.length > 0) {
                let searchKeyword = req.query.searchKey;

                searchModel.getSearchResults(searchKeyword)
                    .then(([posts, metadata]) => {

                        for (let i = 0; i < posts.length; i++)
                            posts[i].DATE_CREATED = time.convertTimestamp(posts[i].DATE_CREATED);

                        res.render('searchResults', { posts: posts });
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


exports.getTopicResults = function (req, res) {
    sessionModel.getUser(req.sessionID)
        .then(([data, metadata]) => {
            if (data.length > 0) {
                let topic = req.query.topic;
                searchModel.getSearchResultsbyTopic(topic)
                    .then(([posts, metadata]) => {
                        for (let i = 0; i < posts.length; i++)
                            posts[i].DATE_CREATED = time.convertTimestamp(posts[i].DATE_CREATED);
                        res.render('searchResults', { posts: posts });
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