let postmod = require("../models/posts");
let usermod = require("../models/users");

const POSTS_PER_PAGE = 5

const searchOptions = (query) => {
    let {string, page, paginate} = query;
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

    postmod.post(p0ject);
    res.redirect(301, '/profile');
}


exports.getAllPosts = (req, res, next) => {
	let page = req.params.page;
	let u_id = req.params.id;
	let Post = postmod.getallP();
	let profile_user;
	Post.then( (post) => {
		posts = post.rows.slice((page-1)*POSTS_PER_PAGE, page*POSTS_PER_PAGE);
		res.render('allPostsView', {post: posts, ProfileCSS: true});
	}).catch((err) => {
		console.log(err);
	});
}

exports.replyToPost = (req, res, next) => {
    let reply = {postId, userId, body} = req.body;
    postmod.insertReply(reply)
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
    postmod.selectPostsBySubject(string, offset)
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
    postmod.selectPostsByTopic(string, offset)
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

exports.getPostsByDate = (req, res, next) => {
    let id = req.session.userid;
    let User = usermod.getUserInfo(id);
    let user_data;
    let topics;
    User.then((data) => {
        // res.render('homeView', {user: data.rows[0], homeCSS: true});
        user_data = data.rows[0];
    });
    let Topics = postmod.getPostTopics();
    Topics.then((data) => {
        topics = data.rows;
    });
    let {string, page, offset} = searchOptions(req.query);
    postmod.selectAllPosts(offset)
    .then(data => {
        let {posts, numposts: numPosts} = data.rows[0];
        res.render('homeView', {
            user: user_data,
            topics: topics, 
            homeCSS: true,
            post: posts,
            page: page,
            string: string,
            route: '/posts/home',
            isFirstPage: page == 0,
            isLastPage: offset + POSTS_PER_PAGE > numPosts
        });
    })
    .catch(error => {
        console.log(error);
    });
};

exports.getAllPostsInitial = (req, res, next) => {
    let id = req.session.userid;
    let User = usermod.getUserInfo(id);
    let Posts = postmod.selectPostsById(id);
    Posts.then(data => {
        let {posts, numposts: numPosts} = data.rows[0];
        res.render('allPostsView', { 
            searchResultCSS: true,
            post: posts,
            page: 0,
            string: id.toString(),
            route: '/posts/all',
            isFirstPage: true,
            isLastPage: 5 > numPosts
        });
    })
    .catch(error => {
        console.log(error);
    });
}

exports.getAllPosts = (req, res, next) => {
    let {string, page, offset} = searchOptions(req.query);
    postmod.selectPostByIdPaginate(string, offset)
    .then(data => {
        let {posts, numposts: numPosts} = data.rows[0];
        res.render('allPostsView', { 
            searchResultCSS: true,
            post: posts,
            page: page,
            string: string,
            route: '/posts/all',
            isFirstPage: page == 0,
            isLastPage: offset + POSTS_PER_PAGE > numPosts
        });
    })
    .catch(error => {
        console.log(error);
    });
}
