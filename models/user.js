const db = require('../util/database');

function createUserTable() {
    return db.execute("CREATE TABLE IF NOT EXISTS `knowledge_base`.`user` ("
        + "`id` INT NOT NULL AUTO_INCREMENT,"
        + "`email` VARCHAR(45) NOT NULL,"
        + "`firstname` VARCHAR(45) NOT NULL,"
        + "`lastname` VARCHAR(45) NOT NULL,"
        + "`password` VARCHAR(45) NOT NULL,"
        + "`bio` VARCHAR(45) NULL,"
        + "`country` VARCHAR(45) NULL,"
        + "`dob` VARCHAR(45) NULL,"
        + "`likes` INT NOT NULL DEFAULT 0,"
        + "PRIMARY KEY (`id`),"
        + "UNIQUE INDEX `id_UNIQUE` (`id` ASC),"
        + "UNIQUE INDEX `email_UNIQUE` (`email` ASC));");
}

function findUserEmail(email) {
    return db.execute("SELECT `id` FROM `user` WHERE `email` = '" + email + "'");
}

function getUserId(email, password) {
    return db.execute("SELECT `id` FROM `user` WHERE `email` = '" + email + "' AND password='" + password + "'");
}

function addUser(email, firstname, lastname, password, bio='', country='', dob='') {
    return db.execute("INSERT INTO `user` (`email`, `firstname`, `lastname`, `password`, `bio`, `country`, `dob`) VALUES('" 
    + email + "', '" + firstname + "', '" + lastname + "', '" + password + "', '" + bio + "', '" + country + "', '" + dob + "')");
}

function delUser(email) {
    return db.execute("DELETE FROM `user` WHERE `email` = '" + email + "'");
}

module.exports = {
    createUserTable: createUserTable,
    findUserEmail: findUserEmail,
    getUserId: getUserId,
    addUser: addUser,
    delUser: delUser
}