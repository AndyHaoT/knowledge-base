const db = require('../util/database');

/*
Returns profile information for the profile page for the currently logged in user
*/
function getUserProfile(user_id, session_user_id) {
    if (user_id)
    {
        return db.query(
            "select ub.user_id, ub.user_firstname, ub.user_lastname, ub.user_avatar_path,"
            + " ub.user_bio, ub.user_country,"
            + " (select count(user_liked_id)"
            + " from user_like"
            + " where user_liked_id = ub.user_id) as like_count,"
            + " count(p.post_id) as post_count,"
            + " l.user_id as has_like"
            + " from user_biography ub "
            + " left join post p on p.user_id = ub.user_id"
            + " left join user_like l on ub.user_id = l.user_liked_id and l.user_id = " + session_user_id //for is liked
            + " where ub.user_id = " + user_id
            + " group by ub.user_id "
        );
    }
    else 
    {
        console.log("No User ID")
    }
}


function likeUser(obj) {
    return db.query(
        "insert into user_like (user_id, user_liked_id) values ( " 
        + obj.user_id + ", " + obj.user_liked_id + ")"
    );
}

module.exports = {
    getProfile: getUserProfile,
    likeUser: likeUser
}
