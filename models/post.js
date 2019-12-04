const db = require('../util/database');


function getPost(post_id) {
    let query = "select p.post_id, p.post_subject, p.post_content, p.date_created, u.user_id, u.user_avatar_path, pt.post_topic_text"
        + " from post p"
        + " join user_biography u on u.user_id = p.user_id"
        + " join post_topic pt on pt.post_topic_code = p.post_topic_code"
        + " where p.post_id = " + post_id;

    return db.query(query);
}

/*
Returns the the most recently created posts
params
    number: The number of posts to return ordered by recent posts
    - If null, will return all posts ordered by recent posts

    offset: will query the next 'number' of rows from the offset
*/
function getPosts(number, offset, user_id) {
    let query = "select p.post_id, p.post_subject, p.post_content, p.date_created, u.user_id, u.user_avatar_path, pt.post_topic_text, count(pc.post_comment_id) as reply_count"
        + " from post p"
        + " join user_biography u on u.user_id = p.user_id"
        + " join post_topic pt on pt.post_topic_code = p.post_topic_code"
        + " left join post_comment pc on pc.post_id = p.post_id";

    user_id > 0 ? query += " where u.user_id = " + user_id : ''

    query += " group by p.post_id" + " order by date_created desc";

    number > 0 && offset >= 0 ? query += " limit " + offset + "," + number : '';

    return db.query(query);
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
    return db.query("insert into post (user_id, post_subject, post_content, post_topic_code) "
        + "values ( ?, ?, ?, ? );", [post.user_id, post.subject, post.content, post.topic]);
}

function getTopics() {
    return db.query("select post_topic_code, post_topic_text from post_topic");
}

module.exports = {
    getPost: getPost,
    getPosts: getPosts,
    add: addPost,
    getTopics: getTopics,
}
