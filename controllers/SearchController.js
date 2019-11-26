const searchModel = require('../models/search');

exports.getSearchResults = function (req, res) {
    let searchKeyword = req.query.searchKey;
    searchModel.getSearchResults(searchKeyword)
    .then(([data, metadata]) => {
        res.render('search', {
            data: {
                firstname: data[0].user_firstname,
                lastname: data[0].user_lastname,
                imageURL: data[0].user_avatar_path,
                country: data[0].user_country_code,
                dateOfBirth: data[0].date,
                about: data[0].user_bio
            }
        });
    });

}