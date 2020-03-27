var postModel = require('../models/postModel');

exports.replyToPost = (req, res, next) => {
    let reply = {postId, userId, body} = req.body;
    postModel.insertReply(reply)
    .then(data => {
        console.log(data);
        res.redirect(301, '/search');
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
        let posts = data.rows[0].posts;
        res.render('searchResultView', {
            pageTitle: 'People App', 
            heading: 'Welcome to People App',
            searchResultCSS: true,
            post: posts
        });
    })
    .catch(error => {
        console.log(error);
    })
};