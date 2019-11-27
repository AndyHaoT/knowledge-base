const searchModel = require('../models/search');
const postModel = require('../models/post');
const commentModel = require('../models/comment')


exports.getSearchResults = function (req, res) {
    let searchKeyword = req.query.searchKey;

    searchModel.getSearchResults(searchKeyword)
        .then(([data, metadata]) => {
            post = data;
            console.log(data);
            res.render('searchResults', {posts: data});
        })
        .catch((error) => {
            console.log(error);
        })

}
