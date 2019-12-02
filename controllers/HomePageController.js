const profileModel = require('../models/editProfile');
const sessionModel = require('../models/session');
const postModel = require('../models/post');
const time = require('../public/js/dateconvert');

// async function getSideAndPosts(sess_id) {
//     sessionModel.getUser(sess_id)
//     .then(([data, metadata]) => {
//         user_id = data[0].data;
//         if (data.length > 0)
//         {
//             profileModel.getUserSessionData(user_id)
//             .then(([data, metadata]) => {
//                 postNum = 5
//                 postModel.getPosts(postNum,0,-1)
//                 .then(([posts, metadata]) => {
//                     console.log(posts)
//                     for (let i = 0; i < posts.length; i++)
//                         posts[i].DATE_CREATED = time.convertTimestamp(posts[i].DATE_CREATED);
                    
//                     return {user_id: user_id, posts: posts};
//                 })               
//             })
//         }
//     })
// }


exports.getHomePage = function(req, res) {
    console.log("sessionid ", req.sessionID);
    sessionModel.getUser(req.sessionID)
    .then(([data, metadata]) => {
        user_id = data[0].data;
        if (data.length > 0)
        {
            profileModel.getUserSessionData(user_id)
            .then(([data, metadata]) => {
                postNum = 5;
                postModel.getPosts(postNum,0,-1)
                .then(([posts, metadata]) => {
                    for (let i = 0; i < posts.length; i++)
                        posts[i].DATE_CREATED = time.convertTimestamp(posts[i].DATE_CREATED);

                    postModel.getTopics()
                    .then(([topics, metadata]) => {
                        res.render('home', {sidebar: data[0], posts: posts, topics: topics, getPosts: false, offset: postNum});
                    })
                    
                })               
            })
        }
    })
}

exports.getNextPosts = function(req,res) {
    if (req.params.offset > 0)
    {
        sessionModel.getUser(req.sessionID)
        .then(([data, metadata]) => {
        user_id = data[0].data;
        if (data.length > 0)
        {
            profileModel.getUserSessionData(user_id)
            .then(([data, metadata]) => {
                postNum = 5;
                offset = req.params.offset;
                postModel.getPosts(postNum, offset, -1)
                .then(([posts, metadata]) => {
                    for (let i = 0; i < posts.length; i++)
                        posts[i].DATE_CREATED = time.convertTimestamp(posts[i].DATE_CREATED);

                    postModel.getTopics()
                    .then(([topics, metadata]) => {
                        res.render('home', {sidebar: data[0], posts: posts, topics: topics, getPosts: false, offset: postNum + parseInt(offset)});
                    })        
                })
            })
        }
    })
    }
}


exports.getUserPosts = function(req, res) {
    sessionModel.getUser(req.sessionID)
    .then(([data, metadata]) => {
        user_id = data[0].data;
        if (data.length > 0)
        {
            profileModel.getUserSessionData(user_id)
            .then(([data, metadata]) => {
                postModel.getPosts(-1,0,user_id)
                .then(([posts, metadata]) => {
                    for (let i = 0; i < posts.length; i++)
                        posts[i].DATE_CREATED = time.convertTimestamp(posts[i].DATE_CREATED);

                    res.render('home', {sidebar: data[0], posts: posts, topics: 0, getPosts: true});
                })
            })
        }
    })
}


