const postModel = require('../models/postModel');
const POSTS_PER_PAGE = 5
const searchOptions = (query) => {
    let {string, page, paginate} = query;
    if(paginate) {
        page = (paginate == "next") ? ++page : --page;
    }
    let offset = page * POSTS_PER_PAGE;
    return {string, page, offset}
}

exports.replyToPost = (req, res, next) => {
    let reply = {postId, userId, body} = req.body;
    postModel.insertReply(reply)
    .then(data => {
        console.log(data);
        // this redirect needs to be fixed. -> render page from wherever reply to post was made.
        res.redirect(301, '/search');
    })
    .catch(error => {
        console.log(error);
        res.status(502).send("Error inserting reply into Replies table.")
    });
};

exports.getPostsBySubject = (req, res, next) => {
    let {string, page, offset} = searchOptions(req.query);
    postModel.selectPostsBySubject(string, offset)
    .then(data => {
        let {posts, numposts: numPosts} = data.rows[0];
        res.render('searchResultView', {
            pageTitle: 'People App - Search Posts',
            searchResultCSS: true,
            post: posts,
            page: page,
            string: string,
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
    let {string, page, offset} = searchOptions(req.query);
    postModel.selectPostsByTopic(string, offset)
    .then(data => {
        let {posts, numposts: numPosts} = data.rows[0];
        res.render('searchResultView', {
            pageTitle: 'People App - Search Posts', 
            searchResultCSS: true,
            post: posts,
            page: page,
            string: string,
            route: '/posts/searchTopic',
            isFirstPage: page == 0,
            isLastPage: offset + POSTS_PER_PAGE > numPosts
        });
    })
    .catch(error => {
        console.log(error);
    });
};