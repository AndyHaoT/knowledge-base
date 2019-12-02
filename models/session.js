const db = require('../util/database');

function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

function getUser(sessId) {
    return db.query("SELECT `data` FROM `session` WHERE `session_id` = ?", [sessId]);
}

function logUser(sessId, userId) {
    currentTime = new Date();
    currentTime.setMilliseconds(currentTime.getMilliseconds() + 6000000);
    return db.query("INSERT INTO `session` VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE `data`=?", [sessId, currentTime, userId, userId]);
}

function logoutUser(sessId) {
    return db.query("DELETE FROM `session` WHERE `session_id`=?", [sessId]);
}

module.exports = {
    getUser: getUser,
    logUser: logUser,
    logoutUser: logoutUser
}