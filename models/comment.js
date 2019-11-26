const db = require('../util/database');


/*
Gets all comments for the post_id
*/
function getComments(post_id) {
    let query = "SELECT PC.POST_COMMENT_ID, PC.POST_COMMENT_CONTENT, PC.DATE_CREATED, UB.USER_ID, UB.USER_AVATAR_PATH"
    + " FROM KNOWLEDGE_BASE.POST_COMMENT PC"
    + " JOIN KNOWLEDGE_BASE.USER_BIOGRAPHY UB ON UB.USER_ID = PC.USER_ID"
    + " WHERE PC.POST_ID = " + post_id
    + " ORDER BY PC.DATE_CREATED";

    return db.query(query);
}

/*
Adds a comment
params
    post:
        - post_id: the post id
        - user_id: users id
        - content: the body of the post
        - time: the time that the post was created
*/
function addComment(comment) {
    let query = "INSERT INTO KNOWLEDGE_BASE.POST_COMMENT (`post_id`, `user_id`," 
            + " `post_comment_content`)"
            + " VALUES ( " + comment.post_id + "," + comment.user_id + ",'" + comment.post_comment_content + "');";
        
    return db.query(query);
}

module.exports = {
    getComments: getComments,
    add : addComment,
}
