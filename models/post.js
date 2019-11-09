const db = require('../util/database');

/*
Returns the the most recently created posts
params
    number: The number of posts to return ordered by recent posts
    - If null, will return all posts ordered by recent posts
*/
function getPosts(number = -1) {
    if (number > 0)
    {
        return db.execute("SELECT USER_ID, SUBJECT, CONTENT, TOPIC, TIME FROM POST "
            + "ORDER BY TIME DESC LIMIT " + number);
    }
    return db.execute("SELECT USER_ID, SUBJECT, CONTENT, TOPIC, TIME FROM POST "
        + "ORDER BY TIME DESC");
}

/*
Gets posts for the logged in user
Params
    user_id: The id of the current user
    number: The number of posts to return ordered by recent posts
    - If null, will return all posts ordered by recent posts 
*/
function getUserPosts(user_id, number = -1) {
    if (number > 0)
    {
        return db.execute("SELECT USER_ID, SUBJECT, CONTENT, TOPIC, TIME FROM POST"
            + "WHERE USER_ID = " + user_id + " ORDER BY TIME DESC LIMIT " + number);
    }
    return db.execute("SELECT USER_ID, SUBJECT, CONTENT, TOPIC, TIME FROM POST "
        + "WHERE USER_ID = " + user_id + " ORDER BY TIME DESC");
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
    return db.execute("INSERT INTO POST (USER_ID, SUBJECT, CONTENT, TOPIC, TIME) "
        + "VALUES (" + "" + post.user_id + ",'" + post.subject + "','" + post.content + "','"
        + post.topic + "','" + post.time + "')");
}

module.exports = {
    getPosts: getPosts,
    getUserPosts: getUserPosts,
    add : addPost,
}
