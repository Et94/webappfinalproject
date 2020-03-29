const postModel = require('../models/postModel');
const POSTS_PER_PAGE = 5
const searchOptions = (query) => {
    let {search, page, pagination} = query;
    if(pagination) {
        page = (pagination == "next") ? ++page : --page;
    }
    let offset = page * POSTS_PER_PAGE;
    return {search, page, offset}
}

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

exports.getPostsBySubject = (req, res, next) => {
    let {search, page, offset} = searchOptions(req.query);
    postModel.selectPostsBySubject(search, offset)
    .then(data => {
        let {posts, numposts: numPosts} = data.rows[0];
        res.render('searchResultView', {
            pageTitle: 'People App - Search Posts',
            searchResultCSS: true,
            post: posts,
            page: page,
            searchString: search,
            route: '/posts/search',
            isFirstPage: page == 0,
            isLastPage: offset + POSTS_PER_PAGE > numPosts
        });
    })
    .catch(error => {
        console.log(error);
    });
};

exports.getPostsByTopic = (req, res, next) => {
    let {search, page, offset} = searchOptions(req.query);
    postModel.selectPostsByTopic(search, offset)
    .then(data => {
        let {posts, numposts: numPosts} = data.rows[0];
        res.render('searchResultView', {
            pageTitle: 'People App - Search Posts', 
            searchResultCSS: true,
            post: posts,
            page: page,
            searchString: search,
            route: '/posts/searchTopic',
            isFirstPage: page == 0,
            isLastPage: offset + POSTS_PER_PAGE > numPosts
        });
    })
    .catch(error => {
        console.log(error);
    });
};