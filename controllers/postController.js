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
    let postsPerPage = 5;
    let offset = page * postsPerPage;
    postModel.searchPosts(subject, offset)
    .then(data => {
        let {posts, numposts: numPosts} = data.rows[0];
        res.render('searchResultView', {
            pageTitle: 'People App', 
            heading: 'Welcome to People App',
            searchResultCSS: true,
            post: posts,
            page: page,
            searchString: subject,
            isFirstPage: page == 0,
            isLastPage: offset + postsPerPage > numPosts
        });
    })
    .catch(error => {
        console.log(error);
    })
};