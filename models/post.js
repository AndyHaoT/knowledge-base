const db = require('../util/database');


function getPost(post_id) {
    let query = "SELECT P.POST_ID, P.POST_SUBJECT, P.POST_CONTENT, P.DATE_CREATED, U.USER_AVATAR_PATH, PT.POST_TOPIC_TEXT"
        + " FROM KNOWLEDGE_BASE.POST P"
        + " JOIN KNOWLEDGE_BASE.USER_BIOGRAPHY U ON U.USER_ID = P.USER_ID"
        + " JOIN KNOWLEDGE_BASE.POST_TOPIC PT ON PT.POST_TOPIC_CODE = P.POST_TOPIC_CODE"
        + " WHERE P.POST_ID = " + post_id;

    if (post_id)
        return db.query(query);
    else
        console.log("No post_id");
}

/*
Returns the the most recently created posts
params
    number: The number of posts to return ordered by recent posts
    - If null, will return all posts ordered by recent posts
*/
function getPosts(number) {
    let query = "SELECT P.POST_ID, P.POST_SUBJECT, P.POST_CONTENT, P.DATE_CREATED, U.USER_AVATAR_PATH, PT.POST_TOPIC_TEXT, COUNT(PC.POST_COMMENT_ID) AS REPLY_COUNT"
        + " FROM KNOWLEDGE_BASE.POST P"
        + " JOIN KNOWLEDGE_BASE.USER_BIOGRAPHY U ON U.USER_ID = P.USER_ID"
        + " JOIN KNOWLEDGE_BASE.POST_TOPIC PT ON PT.POST_TOPIC_CODE = P.POST_TOPIC_CODE"
        + " LEFT JOIN KNOWLEDGE_BASE.POST_COMMENT PC ON PC.POST_ID = P.POST_ID"
        + " GROUP BY P.POST_ID"
        + " ORDER BY DATE_CREATED DESC";
    number > 0 ? query += "LIMIT " + number: '';

    if (user_id)
        return db.query(query);
    else
        console.log("No user_id");
}

/*
Gets posts for the logged in user
Params
    user_id: The id of the current user
    number: The number of posts to return ordered by recent posts
    - If null, will return all posts ordered by recent posts 
*/
function getUserPosts(user_id, number) {
    let query = "SELECT P.POST_ID, P.POST_SUBJECT, P.POST_CONTENT, P.DATE_CREATED, U.USER_AVATAR_PATH, PT.POST_TOPIC_TEXT, COUNT(PC.POST_COMMENT_ID) AS REPLY_COUNT"
        + " FROM KNOWLEDGE_BASE.POST P"
        + " JOIN KNOWLEDGE_BASE.USER_BIOGRAPHY U ON U.USER_ID = P.USER_ID"
        + " JOIN KNOWLEDGE_BASE.POST_TOPIC PT ON PT.POST_TOPIC_CODE = P.POST_TOPIC_CODE"
        + " LEFT JOIN KNOWLEDGE_BASE.POST_COMMENT PC ON PC.POST_ID = P.POST_ID"
        + " WHERE P.USER_ID = " + user_id
        + " GROUP BY P.POST_ID"
        + " ORDER BY DATE_CREATED DESC";
    number > 0 ? query += "LIMIT " + number: '';

    if (user_id)
        return db.query(query);
    else
        console.log("No user_id");
}

/*
Adds a post
params
    post:
        - user_id: users id
        - subject: the subject of the post
        - content: the body of the post
        - topic: the selected topic of the post
        - time: the time that the post was created
*/
function addPost(post) {
    return db.query("INSERT INTO KNOWLEDGE_BASE.POST (USER_ID, POST_SUBJECT, POST_CONTENT, POST_TOPIC_CODE) "
        + "VALUES ( " + post.user_id + ",'" + post.subject + "','" + post.content + "'," + post.topic + ");");
}

function getTopics() {
    return db.query("SELECT POST_TOPIC_CODE, POST_TOPIC_TEXT FROM KNOWLEDGE_BASE.POST_TOPIC");
}

module.exports = {
    getPost: getPost,
    getPosts: getPosts,
    getUserPosts: getUserPosts,
    add: addPost,
    getTopics: getTopics,
}
