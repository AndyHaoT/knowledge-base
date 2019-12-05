const db = require('../util/database.js')

function getPhoto(user_id) {
    // let sql = "select distinct umt.thread_id,thread_subject,umt.date_updated from user_message_thread umt inner join user_message um on umt.thread_id = um.thread_id where um.user_receiver_id = " +user_id+ " or um.user_sender_id = " +user_id
    let sql = "select concat(ub.user_firstname,' ', ub.user_lastname) as user_name,ub.user_avatar_path from user u left join user_biography ub on u.user_id = ub.user_id where u.user_id=" + user_id
    return db.query(sql);
}

function getUserEmail(user_id) {
    let sql = "select user_email from user where user_id = ?"
    return db.query(sql, user_id)
}

function createMessage(data) {
    let sql1 = "Insert into user_message_thread (thread_subject) values (?);";
    return db.query(sql1, data.subject).then(([rows, meta]) => {
        let sql2 = "insert into user_message (thread_id, user_sender_id, user_receiver_id, message_content) values  ( ?, ?, ?, ? );";
        return db.query(sql2, [rows.insertId, data.sender_id, data.receiver_id, data.message]).then(([rows, meta]) => {
            let sql3 = "select thread_id from user_message where message_id= " + rows.insertId;
            return db.query(sql3)
        });
    });
}

function writeMessage(data) {
    let sql2 = "insert into user_message (thread_id, user_sender_id, user_receiver_id, message_content) values  ( ?, ?, ?, ?);";
    return db.query(sql2, [data.thread_id, data.sender_id, data.receiver_id, data.message]).then(([rows,meta]) => {
        let sql3 = "select um.user_sender_id, um.user_receiver_id, concat(ub.user_firstname,' ', ub.user_lastname) as user_name, date_format(um.date_updated, '%b %d') as date, date_format(um.date_updated,'%h:%i %p') as time, um.message_content,ub.user_avatar_path from user_message um ";
        sql3 += "inner join user u on u.user_id = um.user_sender_id ";
        sql3 += "left join user_biography ub on u.user_id = ub.user_id ";
        sql3 += "where um.message_id = " + rows.insertId;
        return db.query(sql3);
    });
}

function getThreads(user_id){
    // let sql = "select distinct umt.thread_id,thread_subject,umt.date_updated from user_message_thread umt inner join user_message um on umt.thread_id = um.thread_id where um.user_receiver_id = " +user_id+ " or um.user_sender_id = " +user_id
    let sql = "select distinct tbl.*, concat(ub.user_firstname,' ', ub.user_lastname) as user_name,ub.user_avatar_path from "
    sql += "((select umt.thread_id,thread_subject,date_format(umt.date_updated,'%b %d') as date,um.user_sender_id as user_id,umt.date_updated from user_message_thread umt inner join user_message um on umt.thread_id = um.thread_id where um.user_receiver_id = " + user_id
    sql += ") UNION (select umt.thread_id,thread_subject,date_format(umt.date_updated,'%b %d') as date,um.user_receiver_id as user_id,umt.date_updated from user_message_thread umt inner join user_message um on umt.thread_id = um.thread_id where um.user_sender_id = " + user_id
    sql += ")) as tbl INNER JOIN user u on u.user_id = tbl.user_id left join user_biography ub on u.user_id = ub.user_id ORDER BY date_updated DESC";
    return db.query(sql);
}

function getMessages(thread_id){
    // let sql = "select user_sender_id,umt.date_updated from user_message_thread umt inner join user_message um on umt.thread_id = um.thread_id where um.user_receiver_id = " +user_id+ " or um.user_sender_id = " +user_id;
    let sql = "select umt.thread_id, um.user_sender_id, um.user_receiver_id, concat(ub.user_firstname,' ', ub.user_lastname) as user_name, date_format(um.date_updated,'%b %d') as date, date_format(um.date_updated,'%h:%i %p') as time, um.date_updated, um.message_content,ub.user_avatar_path from user_message_thread umt "
    sql += "inner join user_message um on umt.thread_id = um.thread_id "
    sql += "inner join user u on u.user_id = um.user_sender_id "
    sql += "left join user_biography ub on u.user_id = ub.user_id "
    sql += "where umt.thread_id = " + thread_id
    sql += " order by date_updated"
    return db.query(sql);
}

module.exports = {
    getPhoto,
    createMessage,
    getThreads,
    writeMessage,
    getMessages,
    getUserEmail
}