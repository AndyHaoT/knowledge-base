const db = require('../util/database');

function getUserIdFromEmail(email) {
    return db.query("SELECT `user_id` FROM `user` WHERE `user_email` = ?", [email]);
}

function getUserId(email, password) {
    return db.query("SELECT `user_id` FROM `user_auth` WHERE `auth_key`=? AND `auth_token`=?", [email, password]);
}

function addUser(email, firstname, lastname, password) {
    return db.query("INSERT INTO `user` (`user_name`, `user_email`, `account_status`) VALUES(?, ?, 'ACTIVE')", [email, email])
        .then(function() {
            db.query("SELECT `user_id` FROM `user` WHERE `user_name` = ?", [email])
                .then(([data, metadata]) => {
                    db.query("INSERT INTO `user_auth` (`user_id`, `auth_type`, `auth_key`, `auth_token`) VALUES(?, 'password', ?, ?)", [data[0].user_id, email, password])
                        .then(function() {
                            return db.query("INSERT INTO `user_biography` (`user_id`, `user_firstname`, `user_lastname`) VALUES(?, ?, ?)", 
                                [data[0].user_id, firstname, lastname])
                        });
                });
        });
}

function updateUser(user_id, imgUrl, bio, country, birthday) {
    return db.query("UPDATE `user_biography` SET `user_avatar_path`=?, `user_country`=?, `user_birthday`=?, `user_bio`=? WHERE `user_id`=?",
        [imgUrl, country, birthday, bio, user_id]);
}

function delUser(email) {
    return db.query("DELETE FROM `user` WHERE `user_email` = ?", [email]);
}

function getUserProfile(user_id) {
    return db.query("SELECT * FROM `user_biography` WHERE `user_id`=?", [user_id]);
}

module.exports = {
    getUserIdFromEmail: getUserIdFromEmail,
    getUserId: getUserId,
    addUser: addUser,
    updateUser: updateUser,
    delUser: delUser,
    getUserProfile: getUserProfile
}