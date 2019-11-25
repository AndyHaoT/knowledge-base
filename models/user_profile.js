const db = require('../util/database');

/*
Returns profile information for the profile page for the currently logged in user
*/
function getUserProfile(user_id, session_user_id) {
    if (user_id)
    {
        return db.query(
            "SELECT UB.USER_ID, UB.USER_FIRSTNAME, UB.USER_LASTNAME, UB.USER_AVATAR_PATH,"
            + " UB.USER_BIO, UB.USER_COUNTRY_CODE,"
            + " (SELECT COUNT(USER_LIKED_ID)"
            + " FROM KNOWLEDGE_BASE.USER_LIKE"
            + " WHERE USER_LIKED_ID = UB.USER_ID) AS LIKE_COUNT,"
            + " COUNT(P.POST_ID) AS POST_COUNT,"
            + " L.USER_ID AS HAS_LIKE"
            + " FROM knowledge_base.USER_BIOGRAPHY UB "
            + " LEFT JOIN knowledge_base.POST P on P.USER_ID = UB.USER_ID"
            + " LEFT JOIN knowledge_base.USER_LIKE L on UB.USER_ID = L.USER_LIKED_ID AND L.USER_ID = " + session_user_id //FOR IS LIKED
            + " WHERE UB.USER_ID = " + user_id
            + " GROUP BY UB.USER_ID "
        );
    }
    else 
    {
        console.log("No User ID")
    }
}


function likeUser(obj) {
    return db.query(
        "INSERT INTO KNOWLEDGE_BASE.USER_LIKE (USER_ID, USER_LIKED_ID) VALUES ( " 
        + obj.user_id + ", " + obj.user_liked_id + ")"
    );
}

module.exports = {
    getProfile: getUserProfile,
    likeUser: likeUser
}
