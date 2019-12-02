const editProfileModel = require('../models/editProfile');
const sessionModel = require('../models/session');

// Must pass the user ID somehow when calling this function
exports.getProfiletoEdit = function (req, res) {
    sessionModel.getUser(req.sessionID)
    .then(([data, metadata]) => {
        user_id = data[0].data;
        editProfileModel.getProfiletoEdit(user_id)
        .then(([data, metadata]) => {
            res.render('editprofile', {
                data: {
                    firstname: data[0].user_firstname,
                    lastname: data[0].user_lastname,
                    imageURL: data[0].user_avatar_path,
                    country: data[0].user_country,
                    dateOfBirth: data[0].date,
                    about: data[0].user_bio
                }
            });
        });
    });
}

// Must pass the user ID somehow when calling this function
exports.updateProfile = function (req, res) {
    
    sessionModel.getUser(req.sessionID)
    .then(([data, metadata]) => {
        user_id = data[0].data;
        let send_data = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            imageUrl: req.body.imageURL,
            country: req.body.country,
            dateOfBirth: req.body.dateOfBirth,
            about: req.body.about
        };
    
        editProfileModel.updateProfile(user_id, send_data)
        .then(([data, metadata]) => {
            res.redirect('/home');
        });
    });

    
    
}