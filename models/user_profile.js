const db = require('../util/connection');

/*
Returns profile information for the profile page for the currently logged in user
*/
function getUserProfile(user_id) {
    if (user_id)
    {
        return db.execute(
            "SELECT UB.USER_ID, UB.USER_FIRSTNAME, UB.USER_LASTNAME, UB.USER_AVATAR_PATH,"
            + " UB.USER_BIO, UB.USER_COUNTRY_CODE,"
            + " (SELECT COUNT(USER_LIKED_ID)"
            + " FROM KNOWLEDGE_BASE.USER_LIKE"
            + " WHERE USER_LIKED_ID = UB.USER_ID) AS LIKE_COUNT,"
            + " COUNT(P.POST_ID) AS POST_COUNT"
            + " FROM knowledge_base.USER_BIOGRAPHY UB "
            + " LEFT JOIN knowledge_base.POST P on P.USER_ID = UB.USER_ID"
            + " WHERE UB.USER_ID = " + user_id
            + " GROUP BY UB.USER_ID "
        );
    }
    else 
    {
        console.log("No User ID")
    }
}

module.exports = {
    getProfile: getUserProfile,
}
