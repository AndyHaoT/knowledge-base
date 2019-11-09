const db = require('../util/database');

/*
Gets all comments for the post_id
*/
function getComments(post_id) {
    return db.execute("SELECT C.USER_ID, U.IMG_URL, C.CONTENT, C.TIME FROM COMMENT C"
        + " JOIN USERS U ON U.ID = C.USER_ID"
        + " WHERE POST_ID = " + post_id + " ORDER BY TIME DESC");
}

/*
Adds a post
params
    post:
        - post_id: the post id
        - user_id: users id
        - content: the body of the post
        - time: the time that the post was created
*/
function addComment(comment) {
    return db.execute("INSERT INTO POST (POST_ID, USER_ID, CONTENT, TIME) "
        + "VALUES (" + "" + comment.post_id + "," + comment.user_id + ",'" + post.content + "','"
        + post.time + "')");
}

module.exports = {
    getComments: getComments,
    add : addComment,
}
