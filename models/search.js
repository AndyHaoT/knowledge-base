const db = require('../util/database');


function getSearchResults(keyWord) {
    let query = "SELECT P.POST_ID, P.POST_SUBJECT, P.POST_CONTENT, P.DATE_CREATED, U.USER_AVATAR_PATH, PT.POST_TOPIC_TEXT, COUNT(PC.POST_COMMENT_ID) AS REPLY_COUNT" +
        " FROM POST P" +
        " JOIN USER_BIOGRAPHY U ON U.USER_ID = P.USER_ID" +
        " JOIN POST_TOPIC PT ON PT.POST_TOPIC_CODE = P.POST_TOPIC_CODE" +
        " LEFT JOIN POST_COMMENT PC ON PC.POST_ID = P.POST_ID" +
        " WHERE P.POST_SUBJECT LIKE ?"  +
        " GROUP BY P.POST_ID" +
        " ORDER BY DATE_CREATED DESC";

    return db.query(query, ["%" + keyWord + "%"]);
}

function getSearchResultsbyTopic(keyWord) {
    let query = "SELECT P.POST_ID, P.POST_SUBJECT, P.POST_CONTENT, P.DATE_CREATED, U.USER_AVATAR_PATH, PT.POST_TOPIC_TEXT, COUNT(PC.POST_COMMENT_ID) AS REPLY_COUNT" +
        " FROM POST P" +
        " JOIN USER_BIOGRAPHY U ON U.USER_ID = P.USER_ID" +
        " JOIN POST_TOPIC PT ON PT.POST_TOPIC_CODE = P.POST_TOPIC_CODE" +
        " LEFT JOIN POST_COMMENT PC ON PC.POST_ID = P.POST_ID" +
        " WHERE P.POST_TOPIC_CODE = ?"  +
        " GROUP BY P.POST_ID" +
        " ORDER BY DATE_CREATED DESC";

    return db.query(query, [keyWord]);
}

module.exports = {
    getSearchResults: getSearchResults,
    getSearchResultsbyTopic: getSearchResultsbyTopic
}
