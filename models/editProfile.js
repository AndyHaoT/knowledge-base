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
    let q = "SELECT USER_ID, USER_FIRSTNAME, USER_LASTNAME, USER_BIO, USER_AVATAR_PATH,"    
	+ " (SELECT COUNT(USER_ID) FROM KNOWLEDGE_BASE.USER_LIKE WHERE USER_LIKED_ID = " + user_id + ") AS LIKES,"
	+ " (SELECT COUNT(POST_ID) FROM KNOWLEDGE_BASE.POST WHERE USER_ID = " + user_id + ") AS POSTS,"
	+ " (SELECT COUNT(THREAD_ID) FROM KNOWLEDGE_BASE.USER_MESSAGE WHERE USER_SENDER_ID = " + user_id + " || USER_RECEIVER_ID = " + user_id + ") AS MESSAGES"
    + " FROM KNOWLEDGE_BASE.USER_BIOGRAPHY WHERE USER_ID = " + user_id + ";";

    return db.query(q);
}


module.exports = {
    getProfiletoEdit: getProfiletoEdit,
    updateProfile: updateProfile,
    getUserSessionData: getUserSessionData,
};