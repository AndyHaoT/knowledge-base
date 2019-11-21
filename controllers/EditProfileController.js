const editProfileModel = require('../models/editProfile');

exports.getProfiletoEdit = function(req, res) {
    // let id = req.body.id;
    let id = 123;
    editProfileModel.getProfiletoEdit(id)
    .then(([data, metadata]) => {
        console.log(data);
        res.render('/editprofile');
    });
}

exports.updateProfile = function(req, res) {
    console.log(req.body.imageURL);
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
