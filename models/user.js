const db = require('../util/database');

function createUserTable() {
    return db.execute("CREATE TABLE IF NOT EXISTS `knowledge_base`.`user` ("
        + "`user_id` INT NOT NULL AUTO_INCREMENT,"
        + "`user_name` VARCHAR(45) NOT NULL,"
        + "`password` VARCHAR(45) NOT NULL,"
        + "PRIMARY KEY (`user_id`),"
        + "UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC))");
}

function getUserId(userName, password) {
    return db.execute("SELECT `user_id` FROM `user` WHERE `user_name` = '" + userName + "' AND password='" + password + "'");
}

function addUser(userName, password) {
    return db.execute("INSERT INTO `user` (`user_name`, `password`) VALUES('" + userName + "', '" + password + "')");
}

function delUser(userName, password) {
    return db.execute("DELETE FROM `user` WHERE `user_name` = '" + userName + "' AND password='" + password + "'");
}

module.exports = {
    createUserTable: createUserTable,
    getUserId: getUserId,
    addUser: addUser,
    delUser: delUser
}