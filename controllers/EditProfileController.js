const editProfileModel = require('../models/editProfile');

// Must pass the user ID somehow when calling this function
exports.getProfiletoEdit = function (req, res) {
    let id = req.body.id;
    editProfileModel.getProfiletoEdit(123)
        .then(([data, metadata]) => {
            res.render('editprofile', {
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

// Must pass the user ID somehow when calling this function
exports.updateProfile = function (req, res) {
    console.log(req.body.imageURL);
    let id = req.body.id;
    let data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        imageUrl: req.body.imageURL,
        country: req.body.country,
        dateOfBirth: req.body.dateOfBirth,
        about: req.body.about
    };

    editProfileModel.updateProfile(123, data);
}