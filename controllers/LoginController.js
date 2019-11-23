const sessionModel = require('../models/session');
const userModel = require('../models/user');
const postModel = require('../models/post');
const profileModel = require('../models/user_profile')
const time = require('../public/js/dateconvert')

const postController = require('../controllers/PostController')

//MUST MOVE
function convertTimestamp(date) {
    let monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    current_date = new Date(date);
    return current_date.getDate() + " " + monthNames[current_date.getMonth()] + " " + current_date.getFullYear();
}

exports.root_get = function(req, res) {
    // sessionModel.createSessionTable()
    // .then(function() {
    //     sessionModel.getUser(req.sessionID)
    //     .then(([data, metadata]) => {
    //         if (data.length != 0) {
    //             res.render('index');
    //         } else {
    //             res.redirect('/login');
    //         }
    //     });
    // });

    // let user_id = 1;
    // profileModel.getProfile(user_id)
    //     .then(([data, metadata]) => {
    //         let profile = data;
            
    //         postModel.getUserPosts(1)
    //             .then(([data, metadata]) => {
    //                 console.log(profile[0])
                    
    //                 for (let i = 0; i < data.length; i++)
    //                     data[i].DATE_CREATED = convertTimestamp(data[i].DATE_CREATED);
    //                 res.render('user_profile', {profile: profile[0], posts: data});
    //             })
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })




    postModel.getTopics()
        .then(([data, metadata]) => {
            console.log(data);
            res.render('test', {topics: data});
        })
}

exports.login_get = function(req, res) {
    sessionModel.createSessionTable();
    userModel.createUserTable();
    res.render('login', { error_msg: '' });
}

exports.login_post = function(req, res) {
    userModel.getUserId(req.body.username, req.body.password)
    .then(([data, metadata]) => {
        if (data.length != 0) {
            sessionModel.logUser(req.sessionID, data[0].user_id)
            .then(function() {
                res.redirect('/');
            });
        } else {
            res.render('login', { error_msg: 'Login Failed' });
        }
    });
}

exports.logout_get = function(req, res) {
    sessionModel.logoutUser(req.sessionID);
    res.redirect('/login');
}