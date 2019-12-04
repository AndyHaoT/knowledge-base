const db = require('../util/database');


/*
Gets all comments for the post_id
*/
function getComments(post_id) {
    let query = "select pc.post_comment_id, pc.post_comment_content, pc.date_created, ub.user_id, ub.user_avatar_path"
    + " from post_comment pc"
    + " join user_biography ub on ub.user_id = pc.user_id"
    + " where pc.post_id = " + post_id
    + " order by pc.date_created";

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
    let query = "insert into post_comment (`post_id`, `user_id`," 
            + " `post_comment_content`)"
            + " values ( ?, ?, ? );";
        
    return db.query(query, [comment.post_id, comment.user_id, comment.post_comment_content]);
}

module.exports = {
    getComments: getComments,
    add : addComment,
}
