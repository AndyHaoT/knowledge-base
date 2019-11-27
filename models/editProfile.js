const db = require('../util/database');

function getProfiletoEdit(id) {
    return db.query("SELECT *, DATE_FORMAT(user_birthday, '%Y-%m-%d') AS date FROM user_biography WHERE user_id = ?", [id]);
}


// function updateProfile(id, data) {
//     console.log("data model: " + data.dateOfBirth);
    
//     db.query("UPDATE `user_biography`" +
//     "SET `user_avatar_path` = '" + data.imageUrl + "'," +
//     "`user_firstname` = '" + data.firstname + "'," +
//     "`user_lastname` = '" + data.lastname + "'," +
//     "`user_country_code` = '" + data.country + "'," +
//     "`user_birthday` = '" + data.dateOfBirth + "'," +
//     "`user_bio` = '" + data.about + "'" +
//     "WHERE `user_id` = " + id);
// }

function updateProfile(id, data) {
    
    db.query("UPDATE user_biography SET user_avatar_path = ?," +
    "user_firstname = ?, user_lastname = ?, user_country_code = ?," +
    "user_birthday = ?, user_bio = ?" +
    "WHERE user_id = ?", [data.imageUrl, data.firstname, data.lastname, data.country, data.dateOfBirth, data.about, id]);
}


module.exports = {
    getProfiletoEdit: getProfiletoEdit,
    updateProfile: updateProfile,
};