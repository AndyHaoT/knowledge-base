const db = require('../util/database');


function getSearchResults(keyWord) {
    let query = "select p.post_id, p.post_subject, p.post_content, p.date_created, u.user_id, u.user_avatar_path, pt.post_topic_text, count(pc.post_comment_id) as reply_count" +
        " from post p" +
        " join user_biography u on u.user_id = p.user_id" +
        " join post_topic pt on pt.post_topic_code = p.post_topic_code" +
        " left join post_comment pc on pc.post_id = p.post_id" +
        " where p.post_subject like ?"  +
        " group by p.post_id" +
        " order by date_created desc";

    return db.query(query, ["%" + keyWord + "%"]);
}

function getSearchResultsbyTopic(keyWord) {
    let query = "select p.post_id, p.post_subject, p.post_content, p.date_created, u.user_id, u.user_avatar_path, pt.post_topic_text, count(pc.post_comment_id) as reply_count" +
        " from post p" +
        " join user_biography u on u.user_id = p.user_id" +
        " join post_topic pt on pt.post_topic_code = p.post_topic_code" +
        " left join post_comment pc on pc.post_id = p.post_id" +
        " where p.post_topic_code = ?"  +
        " group by p.post_id" +
        " order by date_created desc";

    return db.query(query, [keyWord]);
}

module.exports = {
    getSearchResults: getSearchResults,
    getSearchResultsbyTopic: getSearchResultsbyTopic
}
