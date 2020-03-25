var postModel = require('../models/postModel');

exports.replyToPost = (req, res, next) => {
    let reply = {postId, userId, body} = req.body;
    postModel.insertReply(reply)
    .then(data => {
        res.redirect(301, '/');
    })
    .catch(error => {
        console.log(error);
        res.status(502).send("Error inserting reply into Replies table.")
    });
};

exports.searchPosts = (req, res, next) => {
    let string = req.body.searchString;
    postModel.searchPosts(string)
    .then(data => {
        let posts = [];
        let replies = []; 

        for(let i = 0; i < data.rows.length; i++) {
            posts.push({
                postId: data.rows[i].postid,
                userId: data.rows[i].postuserid,
                imageURL: data.rows[i].postimage,
                body: data.rows[i].postbody,
                date: data.rows[i].date,
                numReplies: data.rows[i].numreplies
            })

            replies.push({
                replyId: data.rows[i].replyid,
                userId: data.rows[i].replyuserid,
                imageURL: data.rows[i].replyimage,
                body: data.rows[i].replybody,
            })
        }
        
        res.render('searchResultView', {
            pageTitle: 'People App', 
            heading: 'Welcome to People App',
            searchResultCSS: true,
            post: posts,
            reply: replies
        });
    })
    .catch(error => {
        console.log(error);
    })
};