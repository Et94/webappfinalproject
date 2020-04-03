let postmod = require("../models/posts");
let usermod = require("../models/users");

const POSTS_PER_PAGE = 5

const searchOptions = (query) => {
    let {string, page, paginate} = query;
    string = string == undefined ? '' : string;
    page = page == undefined ? 0 : page;
    if(paginate) {
        page = (paginate == "next") ? ++page : --page;
    }
    let offset = page * POSTS_PER_PAGE;
    return {string, page, offset}
}

exports.createPost = (req, res, next) => {
    let p_subject = req.body.subject;
    let p_question = req.body.question;
    let p_topic = req.body.topic;

    let p0ject = {
        userid: req.session.userid,
        topicname: p_topic,
        subject: p_subject,
        body: p_question
    };

    postmod.createPost(p0ject);
    res.redirect(301, '/profile');
}

exports.replyToPost = (req, res, next) => {
    let reply = {postId, userId, body} = req.body;
    let route = req.body.route;
    postmod.insertReply(reply)
    .then(data => {
        res.redirect(301, route);
    })
    .catch(error => {
        console.log(error);
        res.status(502).send("Error inserting reply into Replies table.")
    });
};

exports.getPostsBySubject = (req, res, next) => {
    let {string, page, offset} = searchOptions(req.query);
    postmod.selectPostsBySubject(string, offset)
    .then(data => {
        let {posts, numposts: numPosts} = data.rows[0];
        res.render('searchResultView', {
            pageTitle: 'People App',
            searchResultCSS: true,
            post: posts,
            page: page,
            string: string,
            userId: req.session.userid,
            route: '/posts/search',
            isFirstPage: page == 0,
            isLastPage: offset + POSTS_PER_PAGE >= numPosts
        });
    })
    .catch(error => {
        console.log(error);
    });
};

exports.getPostsByTopic = (req, res, next) => {
    let {string, page, offset} = searchOptions(req.query);
    if(string === '') {
        res.redirect(301, '/posts/search');
    } else {
        postmod.selectPostsByTopic(string, offset)
        .then(data => {
            let {posts, numposts: numPosts} = data.rows[0];
            res.render('searchResultView', {
                pageTitle: 'People App', 
                searchResultCSS: true,
                post: posts,
                page: page,
                string: string,
                userId: req.session.userid,
                route: '/posts/searchTopic',
                isFirstPage: page == 0,
                isLastPage: offset + POSTS_PER_PAGE >= numPosts
            });
        })
        .catch(error => {
            console.log(error);
        });
    }
};


exports.getAllPosts = (req, res, next) => {
    let userId = req.session.userid;
    let {page, offset} = searchOptions(req.query);
    postmod.selectPostsById(userId, offset)
    .then(data => {
        let {posts, numposts: numPosts} = data.rows[0];
        res.render('allPostsView', { 
            userId: userId,
            searchResultCSS: true,
            post: posts,
            page: page,
            route: '/posts/all',
            isFirstPage: page == 0,
            isLastPage: offset + POSTS_PER_PAGE >= numPosts
        });
    })
    .catch(error => {
        console.log(error);
    });
}
