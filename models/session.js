const db = require('../util/database');

function createSessionTable() {
    return db.execute("CREATE TABLE IF NOT EXISTS `knowledge_base`.`session` ("
        + "`sess_id` VARCHAR(45) NOT NULL,"
        + "`user_id` VARCHAR(45) NOT NULL,"
        + "PRIMARY KEY (`sess_id`))");
}

function getUser(sessId) {
    return db.execute("SELECT `user_id` FROM `session` WHERE `sess_id` = '" + sessId + "'");
}

function logUser(sessId, userId) {
    return db.execute("INSERT INTO `session` VALUES('" + sessId + "', '" + userId + "') ON DUPLICATE KEY UPDATE `user_id`='" + userId + "'");
}

function logoutUser(sessId) {
    return db.execute("DELETE FROM `session` WHERE `sess_id`='" + sessId + "'");
}

module.exports = {
    createSessionTable: createSessionTable,
    getUser: getUser,
    logUser: logUser,
    logoutUser: logoutUser
}