let usermod = require("../models/users");
let postmod = require("../models/posts")

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

exports.editView = (req, res, next) => {
    let id = req.session.userid;
    let User = usermod.getUserInfo(id);
    User.then( (data) => {
        res.render('editProfileView', {user: data.rows[0], editCSS: true});
    })
    .catch(error => {
        console.log(error);
    });
}

exports.editProfile = (req, res, next) => {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let image_url = req.body.image_url;
    let about = req.body.about;
    let country = req.body.country;
    let dob = req.body.dob;
    let id = req.session.userid;

    let p0ject = {
        firstname: first_name,
        lastname: last_name,
        imageurl: image_url,
        about: about,
        country: country,
        dob: dob
    }

    usermod.updateUser(id, p0ject);
    res.redirect(301, '/profile');
}

exports.renderHome = (req, res, next) => {
    let {page, offset} = searchOptions(req.query);
    let id = req.session.userid;
    let User = usermod.getUserInfo(id);
    let user_data;
    let topics;
    User.then((data) => {
        // res.render('homeView', {user: data.rows[0], homeCSS: true});
        user_data = data.rows[0];
    })
    .catch(error => {
        console.log(error);
    });
    let Topics = postmod.getPostTopics();
    Topics.then((data) => {
        topics = data.rows;
    });
    let Posts = postmod.selectPostsBySubject('', offset);
    Posts.then((data) => {
        let {posts, numposts: numPosts} = data.rows[0];
        res.render('homeView', {
            user: user_data,
            userId: id,
            topics: topics, 
            homeCSS: true,
            post: posts,
            page: page,
            route: '/profile',
            isFirstPage: page === 0,
            isLastPage: offset + POSTS_PER_PAGE >= numPosts});   
    })
    .catch(error => {
        console.log(error);
    });
}

