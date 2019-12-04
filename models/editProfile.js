const db = require('../util/database');

function getProfiletoEdit(id) {
    return db.query("SELECT *, DATE_FORMAT(user_birthday, '%Y-%m-%d') AS date FROM user_biography WHERE user_id = ?", [id]);
}

function updateProfile(id, data) {
    return db.query("UPDATE user_biography SET user_avatar_path = ?," +
    "user_firstname = ?, user_lastname = ?, user_country = ?," +
    "user_birthday = ?, user_bio = ?" +
    "WHERE user_id = ?", [data.imageUrl, data.firstname, data.lastname, data.country, data.dateOfBirth, data.about, id]);
}

function getUserSessionData(user_id) {
    let q = "select user_id, user_firstname, user_lastname, user_bio, user_avatar_path,"    
	+ " (select count(user_id) from user_like where user_liked_id = " + user_id + ") as likes,"
	+ " (select count(post_id) from post where user_id = " + user_id + ") as posts,"
	+ " (select count(thread_id) from user_message where user_sender_id = " + user_id + " || user_receiver_id = " + user_id + ") as messages"
    + " from user_biography where user_id = " + user_id + ";";

    return db.query(q);
}


module.exports = {
    getProfiletoEdit: getProfiletoEdit,
    updateProfile: updateProfile,
    getUserSessionData: getUserSessionData,
};