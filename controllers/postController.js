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
    let {subject, page, pagination} = req.query;
    if(pagination) {
        page = (pagination == "next") ? ++page : --page;
    }
    postModel.searchPosts(subject, page*5)
    .then(data => {
        let posts = data.rows[0].posts;
        res.render('searchResultView', {
            pageTitle: 'People App', 
            heading: 'Welcome to People App',
            searchResultCSS: true,
            post: posts,
            page: page,
            searchString: subject,
            isFirstPage: page==0
        });
    })
    .catch(error => {
        console.log(error);
    })
};